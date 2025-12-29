async function saveAs(fileTreeEntry: FileTreeNode, saveAsType: SaveAsType): Promise<void> {
    progressBar.show('Exporting..', 0);
    switch (saveAsType) {
        case 'file':
            fileManager.download(fileTreeEntry.path);
            break;
        case 'map':
            fileManager.downloadFromBlob( await fileManager.zip(fileTreeEntry.path), `${fileTreeEntry.name}.${getMapFormat(targetFormat as string)}`);
            break;
        case 'zip':
            fileManager.downloadFromBlob( await fileManager.zip(fileTreeEntry.path, fileTreeEntry.name, true), `${fileTreeEntry.name}.zip`);
            break;
    }
  progressBar.update('Exporting.. done', 100)
  progressBar.hide();
}

async function saveAllMaps(saveAsType: SaveAsType): Promise<void> {
    progressBar.show('Exporting..', 0);
    const maps = mapIndexer.getMapNames();
    let mapCount = maps.length;
    let exportingMaps = 1;
  switch (saveAsType) {
    case 'map':
        for (const map of maps) {
            progressBar.update(`Exporting.. (${exportingMaps}/${mapCount})`, (exportingMaps/mapCount) * 100);
            fileManager.downloadFromBlob( await fileManager.zip(`/MapExport/${map}`), `${map}.${getMapFormat(targetFormat as string)}`);
            exportingMaps++
        }
        break;
    case 'zip':
        fileManager.downloadFromBlob( await fileManager.zip("/MapExport", "rgc-export", true), `rgc-export.zip`);
        break;
  }
  progressBar.update('Exporting.. done', 100);
  progressBar.hide();
}