import { FileManager } from '$core/Managers/FileManager';
import { mapParseManager } from '$core/Map/MapParseManager';
import { mapLibraries } from '$core/Map/libs';
import { Progress } from '$lib/components/Progress/ProgressOverlay';
import { debugLog, parseError, yieldToMain } from '$lib/helpers';

export async function processImportedFiles(files: File[]) {
    await FileManager.clearDir("/MapImport");
    mapParseManager.clear();

    const extractStart = Date.now();
    let extractedCount = 0;
    Progress.show('Extracting...', 0);

    for (const file of files) {
        const ext = FileManager.getFileExtension(file.name);
        
        Progress.update(`Extracting ${file.name}...`, (extractedCount / files.length) * 50);
        await yieldToMain();

        if (['zip', 'rar', 'tar', '7z', 'qp', 'fms', 'osz'].includes(ext)) {
            const isMapPackage = ['qp', 'fms', 'osz'].includes(ext);
            const targetPath = isMapPackage 
                ? `/MapImport/${FileManager.removeFileExtension(file.name)}` 
                : `/MapImport/`;
            
            await FileManager.fs.promises.mkdir(targetPath, { recursive: true });
            await FileManager.extractTo(file, targetPath);
        } else {
            const uuid = crypto.randomUUID().slice(0, 8);
            const directory = `/MapImport/untitled-${uuid}`;
            await FileManager.fs.promises.mkdir(directory, { recursive: true });
            const buffer = await file.arrayBuffer();
            await FileManager.fs.promises.writeFile(`${directory}/${file.name}`, new Uint8Array(buffer));
        }
        extractedCount++;
    }

    const parseStart = Date.now();
    const mapDirectorys = await FileManager.getDirectoryNames("/MapImport");
    let mapsetsProcessed = 0;

    for (const mapDirectory of mapDirectorys) {
        const folderPath = `/MapImport/${mapDirectory}`;
        const filesInMap = await FileManager.getFileNamesInDirectory(folderPath);
        
        for (const file of filesInMap) {
            await parseSingleChart(`${folderPath}/${file}`, mapDirectory);
        }

        mapsetsProcessed++;
        
        Progress.update('Parsing Mapsets...', 50 + (mapsetsProcessed / mapDirectorys.length) * 50);
        await yieldToMain();
    }

    Progress.update('Done', 100);
    debugLog(`[Parse] Processed ${mapsetsProcessed} directories. Found ${mapParseManager.getKeys().length} valid maps.`);
    
    await new Promise(r => setTimeout(r, 200));
    Progress.hide();

    return {
        extractTime: Date.now() - extractStart,
        parseTime: Date.now() - parseStart
    };
}

async function parseSingleChart(path: string, key: string) {
    const { rgcChart } = mapLibraries.getSpecific(); 
    const ext = FileManager.getFileExtension(path);
    
    let parser;
    switch (ext) {
        case 'sm': parser = rgcChart?.parse_from_sm; break;
        case 'osu': parser = rgcChart?.parse_from_osu; break;
        case 'qua': parser = rgcChart?.parse_from_qua; break;
        case 'fsc': parser = rgcChart?.parse_from_fsc; break;
        default: return;
    }

    if (!parser) return;

    try {
        const rawData = await FileManager.fs.promises.readFile(path);
        const stringData = new TextDecoder().decode(rawData as Uint8Array);
        const parsedData = parser(stringData);
        if (parsedData) {
            mapParseManager.addEntry(key, path, parsedData);
        }
    } catch (e) {
        parseError(`Failed to parse ${path}:`, e);
    }
}