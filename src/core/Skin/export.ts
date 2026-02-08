import { FileManager, type FileTreeNode } from '$core/Managers/FileManager';
import { FsEntryType, SaveAs } from '$core/structures/Files';

export async function saveEntry(node: FileTreeNode, exportType: SaveAs, targetFormat: string) {
    const isDirectory = node.type === FsEntryType.directory;

    if (!isDirectory || exportType === SaveAs.file) {
        await FileManager.download(node.path);
        return;
    }

    const blob = await FileManager.zip(node.path, node.name);

    if (exportType === SaveAs.zip) {
        await FileManager.downloadFromBlob(blob, `${node.name}.zip`);
    } 
    else if (exportType === SaveAs.specific) {
        const ext = targetFormat;
        await FileManager.downloadFromBlob(blob, `${node.name}.${ext}`);
    }
}

export async function exportAllSkins(exportType: SaveAs, targetFormat: string) {
    const directories = await FileManager.getDirectoryNames("/SkinExport");
    
    if (exportType === SaveAs.zip) {
        const baseName = directories.length === 1 
            ? directories[0]
            : "converted_skins";
        
        const blob = await FileManager.zip("/SkinExport", "rgc-export", false);
        await FileManager.downloadFromBlob(blob, `${baseName}.zip`);
    } 
    else if (exportType === SaveAs.specific) {
        const ext = targetFormat;
        
        for (const directory of directories) {
            const blob = await FileManager.zip(`/SkinExport/${directory}`, "", false);
            await FileManager.downloadFromBlob(blob, `${directory}.${ext}`);
        }
    }
}