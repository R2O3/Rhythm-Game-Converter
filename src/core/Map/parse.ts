async function parseChart(path: string, mapName: string) {
    const extension = fileManager.getFileExtension(path);

    let parser: ((data: string) => any) | undefined;

    switch (extension) {
        case 'sm':
            parser = rgcChart?.parse_from_sm;
            break;
        case 'osu':
            parser = rgcChart?.parse_from_osu;
            break;
        case 'qua':
            parser = rgcChart?.parse_from_qua;
            break;
        case 'fsc':
            parser = rgcChart?.parse_from_fsc;
            break;
        default:
            return;
    }

    let parsedData = null;

    try {
        const rawData = (await fileManager.fs.promises.readFile(path)).toString();
        parsedData = parser?.(rawData);
    } catch (e) {
        parseError(`${path}:`, getErrorMessage(e));
    }

    if (parsedData) {
        mapIndexer.addEntry(mapName, path, parsedData);
    }
}

async function parseCharts(event: any) {
    convertButton?.setAttribute('disabled', "true");
    await fileManager.clearDir("/MapImport");
    mapIndexer.clear();
    untitledMapExist = false;

    let MapParseTime = 0;
    let MapExtractionTime = 0;

    const extractInfoElement = document.getElementById("extraction-time");
    const parseInfoElement = document.getElementById("parse-time");
    const convertInfoElement = document.getElementById("convert-time");
    if (convertInfoElement) {
        convertInfoElement.textContent = "";
        convertInfoElement.classList.add("empty-info-state");
    }
    if (parseInfoElement) {
        parseInfoElement.textContent = "";
        parseInfoElement.classList.add("empty-info-state");
    }
    if (extractInfoElement) {
        extractInfoElement.textContent = "";
        extractInfoElement.classList.add("empty-info-state");
    }
    
    const files: File[] = await event.detail.files;
    const fileCount = files.length;
    let extractingCount = 1;

    progressBar.show(`Extracting.. (0/${fileCount})`, 0);
    let extractionStart = Date.now();
    for (const file of files) {
        const extension = fileManager.getFileExtension(file.name);

        progressBar.show(`Extracting.. (${extractingCount}/${fileCount})`, ((extractingCount - 1)/fileCount) * 50);
        switch (extension) {
            case 'zip':
            case 'rar':
            case 'tar':
            case '7z':
                await fileManager.fs.promises.mkdir("/MapImport/", { recursive: true });
                await fileManager.extractTo(file, "/MapImport/");
                break;
            case 'qp':
            case 'fms':
            case 'osz':
                const fullPath = `/MapImport/${fileManager.removeFileExtension(file.name)}`;
                await fileManager.fs.promises.mkdir(fullPath, { recursive: true });
                await fileManager.extractTo(file, fullPath);
                break;
            default:
                if (!untitledMapExist) {
                    await fileManager.fs.promises.mkdir(`/MapImport/untitled-${random_uuid}`);
                    untitledMapExist = true;
                }
                const arrayBuffer = await file.arrayBuffer(); 
                await fileManager.fs.promises.writeFile(
                    `/MapImport/untitled-${random_uuid}/${file.name}`,
                    new Uint8Array(arrayBuffer)
                );
        }
        extractingCount++;
    }

    MapExtractionTime = Date.now() - extractionStart;

    
    if (extractInfoElement) {
        extractInfoElement.textContent = formatTime(MapExtractionTime);
        extractInfoElement.classList.remove("empty-info-state");
    }

    progressBar.update("Waiting for FileSystem..", 50);
    
    // wait extra for filesystem
    // todo: this is very hacky and quite frankly ugly, pls fix later
    await sleep(500);

    
    let Maps = await fileManager.getDirectoryNames("/MapImport");
    let MapCount = Maps.length;
    let processingMaps = 1;
    let ParsePromises = []

    progressBar.update(`Parsing Maps.. (0/${MapCount})`, 50);
    let parseStart = Date.now();
    for (const Map of Maps) {
        progressBar.update(`Parsing Maps.. (${processingMaps}/${MapCount})`, ((processingMaps - 1)/MapCount) + 50 * 50);
        debugLog("\n\n\n");
        debugLog(Map);
        debugLog("-------------------------------------------------");
        for (const file of await fileManager.getFileNamesInDirectory(`/MapImport/${Map}`)) {
            const fullPath = `/MapImport/${Map}/${file}`;
            debugLog(fullPath);
            ParsePromises.push(parseChart(fullPath, Map));
        }
        processingMaps++;
    }

    await Promise.all(ParsePromises);
    MapParseTime = Date.now() - parseStart;
    
    if (parseInfoElement) {
        parseInfoElement.textContent = formatTime(MapParseTime);
        parseInfoElement.classList.remove("empty-info-state");
    }

    document.dispatchEvent(new CustomEvent('parse:done'));
    progressBar.update("Done Parsing!..", 100);
    await sleep(100);
    progressBar.hide()
    convertButton?.removeAttribute('disabled');
    debugLog("parsed entries: ", mapIndexer.getEntries());
}