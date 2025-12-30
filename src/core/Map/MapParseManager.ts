import { ParseManager } from "$core/Managers/ParseManager";
import type { GenericManiaChart } from '$core/Map/libs';

export const mapParseManager = new ParseManager<GenericManiaChart>('/MapImport');