import { FileManager } from '$core/Managers/FileManager';
import { skinParseManager } from '$core/Skin/SkinParseManager';
import { skinLibraries } from '$core/Skin/libs';
import { Progress } from '$lib/components/Progress/ProgressOverlay';
import { debugLog, parseError, yieldToMain } from '$lib/helpers';
import { SUPPORTED_MANIA_SKIN_FORMATS } from '$lib/stores';

export async function processImportedFiles(files: File[]) {
    await FileManager.clearDir("/SkinImport");
    skinParseManager.clear();

    const extractStart = Date.now();
    let extractedCount = 0;
    Progress.show('Extracting...', 0);

    const skinType = files.length > 0 ? FileManager.getFileExtension(files[0].name) : null;

    for (const file of files) {
        const ext = FileManager.getFileExtension(file.name);
        
        Progress.update(`Extracting ${file.name} (this may take a while)...`, (extractedCount / files.length) * 50);
        await yieldToMain();

        if (SUPPORTED_MANIA_SKIN_FORMATS.includes(ext)) {
            const targetPath = `/SkinImport/${FileManager.removeFileExtension(file.name)}`;
            
            await FileManager.fs.promises.mkdir(targetPath, { recursive: true });
            await FileManager.extractTo(file, targetPath);
        } else {
            const uuid = crypto.randomUUID().slice(0, 8);
            const directory = `/SkinImport/untitled-${uuid}`;
            await FileManager.fs.promises.mkdir(directory, { recursive: true });
            const buffer = await file.arrayBuffer();
            await FileManager.fs.promises.writeFile(`${directory}/${file.name}`, new Uint8Array(buffer));
        }
        extractedCount++;
    }

    const importStart = Date.now();
    const SkinDirectorys = await FileManager.getDirectoryNames("/SkinImport");
    
    if (SkinDirectorys.length > 1) {
        Progress.hide();
        throw new Error(`Only one skin can be imported at a time. Found ${SkinDirectorys.length} skin directories.`);
    }
    
    if (SkinDirectorys.length === 0) {
        Progress.hide();
        throw new Error('No valid skin files found.');
    }

    if (!skinType) {
        Progress.hide();
        throw new Error('Could not determine skin type.');
    }

    let SkinsProcessed = 0;

    for (const SkinDirectory of SkinDirectorys) {
        const folderPath = `/SkinImport/${SkinDirectory}`;
        
        const filesMap = await buildFilesMap(folderPath);
        
        await loadSkinDirectory(filesMap, folderPath, SkinDirectory, skinType);

        SkinsProcessed++;
        
        Progress.update('Loading Skin (this may take a while)...', 50 + (SkinsProcessed / SkinDirectorys.length) * 50);
        await yieldToMain();
    }

    Progress.update('Done', 100);
    debugLog(`[Skin Load] Processed ${SkinsProcessed} directory. Found ${skinParseManager.getKeys().length} valid Skins.`);
    
    await new Promise(r => setTimeout(r, 200));
    Progress.hide();

    return {
        extractTime: Date.now() - extractStart,
        loadTime: Date.now() - importStart
    };
}

async function buildFilesMap(folderPath: string): Promise<Map<string, Uint8Array>> {
    const filesMap = new Map<string, Uint8Array>();
    
    async function readRecursive(dirPath: string, relativePath: string = '') {
        const entries = await FileManager.fs.promises.readdir(dirPath, { withFileTypes: true });
        
        const reads = entries.map(async (entry) => {
            const fullPath = `${dirPath}/${entry.name}`;
            const relPath = relativePath ? `${relativePath}/${entry.name}` : entry.name;
            
            if (entry.isDirectory()) {
                await readRecursive(fullPath, relPath);
            } else {
                const data = await FileManager.fs.promises.readFile(fullPath);
                filesMap.set(relPath, data as Uint8Array);
            }
        });
        
        await Promise.all(reads);
    }
    
    await readRecursive(folderPath);
    return filesMap;
}

async function loadSkinDirectory(filesMap: Map<string, Uint8Array>, folderPath: string, key: string, type: string) {
    const { rgskin } = skinLibraries.getSpecific();
    
    if (!rgskin) return;

    try {
        let loadedData;
        
        switch (type) {
            case 'osk':
                if (rgskin.osuSkinFromFiles) {
                    loadedData = rgskin.osuSkinFromFiles(filesMap);
                }
                break;
                
            case 'fsk':
                if (rgskin.fluXisSkinFromFiles) {
                    loadedData = rgskin.fluXisSkinFromFiles(filesMap);
                }
                break;
        }
        
        if (loadedData) {
            skinParseManager.addEntry(key, folderPath, loadedData);
        }
    } catch (e) {
        parseError(`Failed to load skin in ${folderPath}:`, e);
    }
}