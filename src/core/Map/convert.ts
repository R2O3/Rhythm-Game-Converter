import { FileManager } from '$core/Managers/FileManager';
import { mapParseManager } from '$core/Map/MapParseManager';
import { mapLibraries, type GenericManiaChart } from '$core/Map/libs';
import { SUPPORTED_MANIA_CHART_FORMATS } from '$lib/stores';
import { Progress } from '$lib/components/Progress/ProgressOverlay';
import { convertError, yieldToMain } from '$lib/helpers';


export async function convertMaps(targetFormat: string) {
    const keys = mapParseManager.getKeys();
    
    if (keys.length === 0) {
        convertError("No maps parsed. Please import a map first.");
        return;
    }

    await FileManager.clearDir("/MapExport");
    const convertStart = Date.now();
    let convertedCount = 0;

    Progress.show('Converting Maps...', 0);

    for (const key of keys) {
        const currentProgress = (convertedCount / keys.length) * 100;
        Progress.update(`Converting ${key}...`, currentProgress);
        
        await yieldToMain();

        const importPath = `/MapImport/${key}`;
        const exportPath = `/MapExport/${key}`;

        await FileManager.copyDirectory(importPath, exportPath);

        const charts = mapParseManager.getEntries(key);
        for (const entry of charts) {
            const fileName = await FileManager.getFileName(entry.originalPath);
            try { 
                await FileManager.fs.promises.unlink(`${exportPath}/${fileName}`); 
            } catch (e) {  }

            const convertedData = await runConverter(entry.data, targetFormat, entry.originalPath);
            if (convertedData) {
                const newName = `${FileManager.removeFileExtension(fileName)}.${targetFormat}`;
                await FileManager.fs.promises.writeFile(`${exportPath}/${newName}`, convertedData);
            }
        }
        
        convertedCount++;
    }

    const convertTime = Date.now() - convertStart;
    
    Progress.update('Generating File Tree...', 100);
    await yieldToMain();
    
    const fileTree = await FileManager.generateFileTree("/MapExport");
    
    Progress.update('Done', 100);
    await new Promise(r => setTimeout(r, 200));
    Progress.hide();

    return { convertTime, fileTree };
}

async function runConverter(chart: GenericManiaChart, type: string, path: string) {
    if (!SUPPORTED_MANIA_CHART_FORMATS.includes(type)) return;
    
    const { rgcChart } = mapLibraries.getSpecific(); 

    let converter;
    switch (type) {
        case 'sm': converter = rgcChart?.writeToSmGeneric; break;
        case 'osu': converter = rgcChart?.writeToOsuGeneric; break;
        case 'qua': converter = rgcChart?.writeToQuaGeneric; break;
        case 'fsc': converter = rgcChart?.writeToFscGeneric; break;
        default: return;
    }

    if (!converter) return;

    try { 
        return converter(chart); 
    } catch (e) { 
        convertError(`Failed to convert ${path}:`, e); 
    }
}