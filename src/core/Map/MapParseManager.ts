import { ParseManager } from "$core/Managers/ParseManager";
import type { Chart } from '$core/Map/libs';

export const mapParseManager = new ParseManager<Chart>('/MapImport');