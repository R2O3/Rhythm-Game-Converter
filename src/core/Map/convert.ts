import { FileManager, type FileTreeNode } from '$core/Managers/FileManager';
import { mapLibraries, type Chart } from '$core/Map/libs';
import { convertError, debugLog, formatTime } from '$lib/helpers';
import { SUPPORTED_MANIA_CHART_FORMATS } from '$lib/stores';

const { rgcChart } = mapLibraries.getSpecific();

async function convertChart(chart: Chart, convertType: string): Promise<string | undefined> {
    if (!SUPPORTED_MANIA_CHART_FORMATS.includes(convertType)) {
        convertError(`Converter for "${convertType}" not available`);
        return;
    }

    const methodName = `write_to_${convertType}`;
    const converter = (rgcChart as any)?.[methodName] as ((chart: Chart) => string) | undefined;

    if (!converter) {
        convertError(`Converter for "${convertType}" not available`);
        return;
    }

    try {
        return converter(chart);
    } catch (e) {
        convertError(`Conversion for ${convertType} failed: `, e);
        return;
    }
}

async function convertCharts() {
    await FileManager.clearDir("/MapExport");
    targetFormat = dropdown_menu?.value;

    let MapConverTime = 0;
    
    if (!targetFormat) {
        targetFormat = "osu";
        console.error("target format is null! defaulting to osu..")
    }

    progressBar.show(`Copying..`, 0);

    const maps = mapIndexer.getMapNames(); 
    const mapCount = maps.length;
    let mapsConverting = 1;
    let convertStart = Date.now();
    for (const map of maps) {
        const importPath = `/MapImport/${map}`;
        const exportPath = `/MapExport/${map}`;

        
        await FileManager.copyDirectory(importPath, exportPath);

        const charts = mapIndexer.getEntries(map)
                
        progressBar.update(`Converting Maps.. (${mapsConverting}/${mapCount})`, ((mapsConverting - 1)/mapCount) + 50 * 50);
        for (const chart of charts) {
            const chartFileName = await FileManager.getFileName(chart.originalPath);
            const chartPath = `${exportPath}/${chartFileName}`;

            try {
                await FileManager.fs.promises.rm(chartPath);
            } catch (err) {
                // there was no file to remove so we skip it
            }

            const convertedChart = await convertChart(chart.chart, targetFormat);
            if (convertedChart) {
                const newFileName = `${exportPath}/${FileManager.removeFileExtension(chartFileName)}.${targetFormat}`;
                await FileManager.fs.promises.writeFile(newFileName, convertedChart);
            }
        }
        mapsConverting++;
    }

    MapConverTime = Date.now() - convertStart;
    
    document.dispatchEvent(new CustomEvent('convert:done'));
    progressBar.update("Done Converting!..", 100);
    await sleep(100);
    progressBar.hide();
    const convertInfoElement = document.getElementById("convert-time");
    if (convertInfoElement) {
        convertInfoElement.textContent = formatTime(MapConverTime);
        convertInfoElement.classList.remove("empty-info-state");
    }
    
    debugLog("Map export dir: ", FileManager.fs.readdirSync("/MapExport"))

    Result.onSaveAs = (fileTreeEntry: FileTreeNode): void => {
    
    switch (fileTreeEntry.type) {
        case 'folder':
            const event = window.event as MouseEvent | TouchEvent;
            const target = event.target as HTMLElement;
            const saveAsBtn = target.closest('.save-as-btn') as HTMLElement;
            if (saveAsBtn) {
                showDropdownMenu(saveAsBtn, (selectedType: SaveAsType) => {
                savingAsType = selectedType;
                saveAs(fileTreeEntry, savingAsType);
                });
            }
            break;
        case 'file':
            saveAs(fileTreeEntry, 'file');
            break;
    }};
    
    if (maps.length === 1) {
        Result.renderFileTree(await FileManager.generateFileTree(`/MapExport/${maps[0]}`));
    } else {
        Result.renderFileTree(await FileManager.generateFileTree("/MapExport"));
    }
    
}