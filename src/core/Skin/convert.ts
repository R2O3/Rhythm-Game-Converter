import { FileManager } from '$core/Managers/FileManager';
import { skinParseManager } from '$core/Skin/SkinParseManager';
import { type FluXisSkin, type  OsuSkin, skinLibraries, type GenericManiaSkin } from '$core/Skin/libs';
import { SUPPORTED_MANIA_SKIN_FORMATS } from '$lib/stores';
import { Progress } from '$lib/components/Progress/ProgressOverlay';
import { convertError, yieldToMain } from '$lib/helpers';


export async function convertSkins(targetFormat: string) {
    const keys = skinParseManager.getKeys();
    
    if (keys.length === 0) {
        convertError("No skins loaded. Please import a skin first.");
        return;
    }

    await FileManager.clearDir("/SkinExport");
    const convertStart = Date.now();
    let convertedCount = 0;

    Progress.show('Converting Skins...', 0);

    for (const key of keys) {
        const currentProgress = (convertedCount / keys.length) * 100;
        Progress.update(`Converting ${key}...`, currentProgress);
        
        await yieldToMain();

        const importPath = `/SkinImport/${key}`;
        const exportPath = `/SkinExport/${key}`;

        await FileManager.copyDirectory(importPath, exportPath);

        const entries = skinParseManager.getEntries(key);
        for (const entry of entries) {
            const convertedFiles = await runConverter(entry.data, targetFormat, entry.originalPath);
            if (convertedFiles) {
                await FileManager.clearDir(exportPath);
                await FileManager.fs.promises.mkdir(exportPath, { recursive: true });
                
                for (const [filename, data] of convertedFiles) {
                    const filePath = `${exportPath}/${filename}`;
                    const dirPath = filePath.substring(0, filePath.lastIndexOf('/'));
                    
                    await FileManager.fs.promises.mkdir(dirPath, { recursive: true });
                    await FileManager.fs.promises.writeFile(filePath, data);
                }
            }
        }
        
        convertedCount++;
    }

    const convertTime = Date.now() - convertStart;
    
    Progress.update('Generating File Tree...', 100);
    await yieldToMain();
    
    const fileTree = await FileManager.generateFileTree("/SkinExport");
    
    Progress.update('Done', 100);
    await new Promise(r => setTimeout(r, 200));
    Progress.hide();

    return { convertTime, fileTree };
}

async function runConverter(skin: OsuSkin | FluXisSkin, type: string, path: string): Promise<Map<string, Uint8Array> | undefined> {
    if (!SUPPORTED_MANIA_SKIN_FORMATS.includes(type)) return;
    
    const { rgskin } = skinLibraries.getSpecific(); 

    if (!rgskin) return;

    try {
        const genericSkin = skin.toGenericMania();
        
        switch (type) {
            case 'osk':
                const osuSkin = rgskin.OsuSkin.fromGenericMania(genericSkin);
                return rgskin.osuSkinToFiles(osuSkin);
                
            case 'fsk':
                const fluXisSkin = rgskin.FluXisSkin.fromGenericMania(genericSkin);
                return rgskin.fluXisSkinToFiles(fluXisSkin.skin);
        }
    } catch (e) { 
        convertError(`Failed to convert ${path}:`, e); 
    }
}
