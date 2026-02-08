import { ParseManager } from "$core/Managers/ParseManager";
import type { FluXisSkin, OsuSkin } from '$core/Skin/libs';

export const skinParseManager = new ParseManager<OsuSkin | FluXisSkin>('/SkinImport');