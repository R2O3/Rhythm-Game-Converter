import { FileManager, type FileTreeNode } from '$core/Managers/FileManager';
import { FsEntryType, SaveAs } from '$core/structures/Files';
import { getMapsetExtension } from '$lib/stores';

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
        const ext = getMapsetExtension(targetFormat);
        await FileManager.downloadFromBlob(blob, `${node.name}.${ext}`);
    }
}

export async function exportAllMaps() {
    const blob = await FileManager.zip("/MapExport", "rgc-export", true);
    await FileManager.downloadFromBlob(blob, "converted_maps.zip");
}