import { fs } from '@zenfs/core';
import { debugLog } from '$lib/helpers';
import { Zip, ZipDeflate, unzip } from 'fflate';
import { FsEntryType } from '$core/structures/Files';

export interface FileTreeNode {
    name: string;
    type: FsEntryType.directory | FsEntryType.file;
    path: string;
    children?: FileTreeNode[];
}

const FsStructure = {
    "MapImport": {},
    "MapExport": {},
    "MapCompressed": {},
};

export class FileManager {
    public static get fs() {
        return fs;
    }

    static async initFs(): Promise<void> {
        try {
            for (const [dirName, contents] of Object.entries(FsStructure)) {
                if (!await fs.promises.exists(`/${dirName}`)) {
                    await fs.promises.mkdir(`/${dirName}`, { recursive: true });
                }
                if (typeof contents === 'object' && contents !== null) {
                    await FileManager.createSubdirectories(`/${dirName}`, contents);
                }
            }
            console.log("Fs initialization complete!");
        } catch (err) {
            console.error("Error initializing Fs:", err);
        }
    }

    static async createSubdirectories(parentPath: string, structure: object): Promise<void> {
        for (const [name, content] of Object.entries(structure)) {
            const fullPath = `${parentPath}/${name}`;
            if (typeof content === 'object' && content !== null) {
                await fs.promises.mkdir(fullPath, { recursive: true });
                await FileManager.createSubdirectories(fullPath, content);
            } else {
                await fs.promises.writeFile(fullPath, content || '');
            }
        }
    }

    static async generateFileTree(rootPath: string): Promise<FileTreeNode[]> {
        const result: FileTreeNode[] = [];
        try {
            if (!await fs.promises.exists(rootPath)) return [];
            const entries = await fs.promises.readdir(rootPath, { withFileTypes: true });

            for (const entry of entries) {
                const fullPath = `${rootPath}/${entry.name}`;
                if (entry.isDirectory()) {
                    result.push({
                        name: entry.name,
                        type: FsEntryType.directory,
                        path: fullPath,
                        children: await FileManager.generateFileTree(fullPath)
                    });
                } else {
                    result.push({ name: entry.name, type: FsEntryType.file, path: fullPath });
                }
            }
        } catch (error) {
            console.error(`Error reading directory ${rootPath}:`, error);
        }
        return result;
    }

    static async copyDirectory(src: string, dest: string): Promise<void> {
        await fs.promises.mkdir(dest, { recursive: true });
        const entries = await fs.promises.readdir(src, { withFileTypes: true });
        for (const entry of entries) {
            const srcPath = `${src}/${entry.name}`;
            const destPath = `${dest}/${entry.name}`;
            if (entry.isDirectory()) {
                await FileManager.copyDirectory(srcPath, destPath);
            } else {
                await fs.promises.copyFile(srcPath, destPath);
            }
        }
    }

    static async clearDir(path: string): Promise<void> {
        if (await fs.promises.exists(path)) {
            await fs.promises.rm(path, { recursive: true, force: true });
        }
        await fs.promises.mkdir(path, { recursive: true });
    }

    static removeFileExtension(filename: string): string {
        const lastDot = filename.lastIndexOf('.');
        if (lastDot <= 0) return filename;
        return filename.substring(0, lastDot);
    }

    static getFileExtension(filename: string): string {
        const lastDot = filename.lastIndexOf('.');
        if (lastDot <= 0) return '';
        return filename.slice(lastDot + 1).toLowerCase();
    }

    static async getDirectoryNames(path: string): Promise<string[]> {
        try {
            const entries = await fs.promises.readdir(path, { withFileTypes: true });
            return entries.filter(e => e.isDirectory()).map(e => e.name);
        } catch (e) { return []; }
    }

    static async getFileNamesInDirectory(path: string): Promise<string[]> {
        try {
            const entries = await fs.promises.readdir(path, { withFileTypes: true });
            return entries.filter(e => e.isFile()).map(e => e.name);
        } catch (e) { return []; }
    }

    static async getFileName(filePath: string): Promise<string> {
        return filePath.split('/').pop() || filePath;
    }

    static async download(path: string, customFilename?: string): Promise<void> {
        try {
            const fileData = await fs.promises.readFile(path);
            const filename = customFilename || await FileManager.getFileName(path);

            const mimeType = "application/octet-stream";
            const blob = new Blob([new Uint8Array(fileData)], { type: mimeType });

            await FileManager.downloadFromBlob(blob, filename);
        } catch (error) {
            console.error("Download failed:", error);
        }
    }

    static async downloadFromBlob(blob: Blob, filename: string): Promise<void> {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    }

    static async zip(directoryPath: string, filename: string = "archive", createTopLevelDir = false): Promise<Blob> {
        return new Promise((resolve, reject) => {
            const chunks: any[] = [];
            const zip = new Zip((err, dat, final) => {
                if (err) reject(err);
                else {
                    chunks.push(dat);
                    if (final) resolve(new Blob(chunks, { type: 'application/zip' }));
                }
            });

            const processDirectory = async (currentPath: string, relativePath: string = "") => {
                const entries = await fs.promises.readdir(currentPath, { withFileTypes: true });
                for (const entry of entries) {
                    const fullPath = `${currentPath}/${entry.name}`;
                    const entryRel = relativePath ? `${relativePath}/${entry.name}` : entry.name;
                    const zipPath = createTopLevelDir ? `${filename}/${entryRel}` : entryRel;

                    if (entry.isFile()) {
                        const content = await fs.promises.readFile(fullPath);
                        const f = new ZipDeflate(zipPath, { level: 1 });
                        zip.add(f);
                        f.push(new Uint8Array(content as Uint8Array), true);
                    } else if (entry.isDirectory()) {
                        await processDirectory(fullPath, entryRel);
                    }
                }
            };

            processDirectory(directoryPath).then(() => zip.end()).catch(reject);
        });
    }

    static async extractTo(file: File, extractPath: string): Promise<void> {
        await fs.promises.mkdir(extractPath, { recursive: true });
        const buffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(buffer);

        return new Promise((resolve, reject) => {
            unzip(uint8Array, async (err, unzippedFiles) => {
                if (err) return reject(err);

                try {
                    const createdDirs = new Set<string>();
                    createdDirs.add(extractPath);

                    const ensureDir = async (dir: string) => {
                        if (createdDirs.has(dir)) return;
                        const parent = dir.substring(0, dir.lastIndexOf('/'));
                        if (parent && !createdDirs.has(parent)) await ensureDir(parent);
                        
                        try {
                            await fs.promises.mkdir(dir, { recursive: true });
                        } catch (e) { }
                        createdDirs.add(dir);
                    };

                    for (const [rawPath, fileData] of Object.entries(unzippedFiles)) {
                        const normalizedPath = rawPath.replace(/\\/g, '/');
                        const fullPath = `${extractPath}/${normalizedPath}`;
                        
                        if (fileData.length === 0 && normalizedPath.endsWith('/')) {
                            await ensureDir(fullPath.slice(0, -1));
                            continue;
                        }

                        const dirPath = fullPath.substring(0, fullPath.lastIndexOf('/'));
                        await ensureDir(dirPath);

                        await fs.promises.writeFile(fullPath, fileData);
                        debugLog(`[FileManager] Extracted file: ${fullPath}`);
                    }
                    
                    debugLog(`[FileManager] Successfully extracted ${Object.keys(unzippedFiles).length} items to ${extractPath}`);
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    }
}