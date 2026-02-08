/* tslint:disable */
/* eslint-disable */

export class BinaryStore {
  free(): void;
  [Symbol.dispose](): void;
  constructor();
  insertBinary(binary: RawBytes): void;
  makeUnique(new_path: string, binary: RawBytes): string;
  loadFromArrayBuffer(path: string, buffer: ArrayBuffer): void;
  loadFromUint8Array(path: string, array: Uint8Array): void;
  allLoaded(): boolean;
  loadedCount(): number;
  unloadedPaths(): Array<any>;
  hasBinary(path: string): boolean;
  getBinaryPath(path: string): string | undefined;
  binaryHasData(path: string): boolean;
  getBinaryData(path: string): Uint8Array | undefined;
  contains(path: string): boolean;
  remove(path: string): boolean;
  getLength(): number;
  isEmpty(): boolean;
  getPaths(): Array<any>;
  clear(): void;
  copy(original_path: string, new_path: string): string | undefined;
  makeUniqueCopy(original_path: string, new_base_path: string): string | undefined;
  extend(other: BinaryStore): void;
}

export class FluXisKeymode {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  keymode: number;
  column_width: number;
  hit_position: number;
  tint_notes: boolean;
  tint_lns: boolean;
  tint_receptors: boolean;
  colors: string[];
  receptors_first: boolean;
  receptor_offset: number;
}

export class FluXisLayout {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  name: string;
  author: string;
}

export class FluXisSkin {
  free(): void;
  [Symbol.dispose](): void;
  constructor(skin_json: SkinJson, textures?: TextureStore | null, samples?: BinaryStore | null);
  toGenericMania(): GenericManiaSkin;
  toGenericManiaWithLayout(layout: FluXisLayout): GenericManiaSkin;
  static fromGenericMania(skin: GenericManiaSkin): FluXisSkinWithLayout;
  getKeymode(keymode: number): FluXisKeymode | undefined;
  getRequiredTexturePaths(): string[];
  getRequiredSamplePaths(): string[];
  skin_json: SkinJson;
  textures: TextureStore;
  samples: BinaryStore;
}

export class FluXisSkinWithLayout {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  skin: FluXisSkin;
  layout: FluXisLayout;
}

export class General {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  static fromStr(content: string): General;
  toString(): string;
  name: string;
  author: string;
  version: string;
  animation_framerate: number;
  allow_slider_ball_tint: boolean;
  combo_burst_random: boolean;
  cursor_centre: boolean;
  cursor_expand: boolean;
  cursor_rotate: boolean;
  cursor_trail_rotate: boolean;
  custom_combo_burst_sounds: Uint16Array;
  hit_circle_overlay_above_number: boolean;
  layered_hit_sounds: boolean;
  slider_ball_flip: boolean;
  spinner_fade_playfield: boolean;
  spinner_frequency_modulate: boolean;
  spinner_no_blink: boolean;
}

export class GenericManiaSkin {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  toGenericMania(): GenericManiaSkin;
  static fromGenericMania(skin: GenericManiaSkin): GenericManiaSkin;
  getKeymode(keymode: number): Keymode | undefined;
  getRequiredTexturePaths(): string[];
  getRequiredSamplePaths(): string[];
  textures: TextureStore;
  samples: BinaryStore;
}

export class Info {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  name: string;
  creator: string;
  accent: string;
}

export class Keymode {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  static fromStr(content: string): OsuKeymode;
  toStr(): string;
  getTexturePaths(): string[];
  keymode: number;
}

export class OsuKeymode {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  keymode: number;
  keys_under_notes: boolean;
  judgement_line: boolean;
  upside_down: boolean;
  special_style: number;
  combo_burst_style: number;
  get split_stages(): boolean | undefined;
  set split_stages(value: boolean | null | undefined);
  stage_separation: number;
  separate_score: boolean;
  hit_position: number;
  light_position: number;
  get score_position(): number | undefined;
  set score_position(value: number | null | undefined);
  get combo_position(): number | undefined;
  set combo_position(value: number | null | undefined);
  column_start: number;
  column_right: number;
  column_line_width: Float32Array;
  column_width: Float32Array;
  column_spacing: Float32Array;
  barline_height: number;
  lighting_n_width: Float32Array;
  lighting_l_width: Float32Array;
  get width_for_note_height_scale(): number | undefined;
  set width_for_note_height_scale(value: number | null | undefined);
  light_frame_per_second: number;
  key_flip_when_upside_down: boolean;
  note_body_style: number;
  note_body_style_columns: Uint8Array;
  receptor_images: string[];
  receptor_images_down: string[];
  normal_note_images: string[];
  long_note_head_images: string[];
  long_note_body_images: string[];
  long_note_tail_images: string[];
  stage_left: string;
  stage_right: string;
  stage_bottom: string;
  stage_hint: string;
  stage_light: string;
  lighting_n: string;
  lighting_l: string;
  warning_arrow: string;
  hit0: string;
  hit50: string;
  hit100: string;
  hit200: string;
  hit300: string;
  hit300g: string;
}

export class OsuSkin {
  free(): void;
  [Symbol.dispose](): void;
  constructor(skin_ini: OsuSkinIni, textures?: TextureStore | null, samples?: BinaryStore | null);
  toGenericMania(): GenericManiaSkin;
  static fromGenericMania(skin: GenericManiaSkin): OsuSkin;
  getKeymode(keymode: number): OsuKeymode | undefined;
  getRequiredTexturePaths(): string[];
  getRequiredSamplePaths(): string[];
  skin_ini: OsuSkinIni;
  textures: TextureStore;
  samples: BinaryStore;
}

export class OsuSkinIni {
  free(): void;
  [Symbol.dispose](): void;
  constructor();
  static fromStr(json_str: string): OsuSkinIni;
  toString(): string;
  getRequiredTexturePaths(): string[];
  getRequiredSamplePaths(): string[];
  getKeymode(keymode: number): OsuKeymode | undefined;
  general: General;
  keymodes: OsuKeymode[];
}

export class RawBytes {
  free(): void;
  [Symbol.dispose](): void;
  constructor(path: string);
  static fromBytes(path: string, bytes: Uint8Array): RawBytes;
  getData(): Uint8Array | undefined;
  static fromArrayBuffer(path: string, buffer: ArrayBuffer): RawBytes;
  static fromArrayBufferUnloaded(path: string, buffer: ArrayBuffer): RawBytes;
  static fromUint8Array(path: string, array: Uint8Array): RawBytes;
  static fromUint8ArrayUnloaded(path: string, array: Uint8Array): RawBytes;
  getPath(): string;
  hasData(): boolean;
  isLoaded(): boolean;
  isUnloaded(): boolean;
  isEmpty(): boolean;
  load(): void;
  unload(): void;
  path: string;
}

export class SkinJson {
  free(): void;
  [Symbol.dispose](): void;
  constructor();
  static fromStr(json_str: string): SkinJson;
  toString(): string;
  info: Info;
  keymodes: FluXisKeymode[];
}

export class Texture {
  free(): void;
  [Symbol.dispose](): void;
  constructor(path: string);
  static fromBlank(path: string): Texture;
  static fromArrayBuffer(path: string, buffer: ArrayBuffer): Texture;
  static fromArrayBufferUnloaded(path: string, buffer: ArrayBuffer): Texture;
  static fromUint8Array(path: string, array: Uint8Array): Texture;
  static fromUint8ArrayUnloaded(path: string, array: Uint8Array): Texture;
  getPath(): string;
  hasData(): boolean;
  isLoaded(): boolean;
  isUnloaded(): boolean;
  isEmpty(): boolean;
  load(): void;
  unload(): void;
  path: string;
}

export class TextureStore {
  free(): void;
  [Symbol.dispose](): void;
  constructor();
  insertTexture(texture: Texture): void;
  makeUnique(new_path: string, texture: Texture): string;
  loadFromArrayBuffer(path: string, buffer: ArrayBuffer): void;
  loadFromUint8Array(path: string, array: Uint8Array): void;
  allLoaded(): boolean;
  loadedCount(): number;
  unloadedPaths(): Array<any>;
  hasTexture(path: string): boolean;
  getTexturePath(path: string): string | undefined;
  textureHasData(path: string): boolean;
  contains(path: string): boolean;
  remove(path: string): boolean;
  getLength(): number;
  isEmpty(): boolean;
  getPaths(): Array<any>;
  clear(): void;
  copy(original_path: string, new_path: string): string | undefined;
  makeUniqueCopy(original_path: string, new_base_path: string): string | undefined;
  extend(other: TextureStore): void;
}

export function allSamplesFromFiles(files: Map<any, any>): BinaryStore;

export function allTexturesFromFiles(files: Map<any, any>): TextureStore;

export function fluXisSkinFromFiles(files: Map<any, any>): FluXisSkin;

export function fluXisSkinToFiles(skin: FluXisSkin): Map<any, any>;

export function iniToString(skin_ini: OsuSkinIni): string;

export function jsonToString(skin_json: SkinJson): string;

export function layoutToString(layout_json: FluXisLayout): string;

export function osuSkinFromFiles(files: Map<any, any>): OsuSkin;

export function osuSkinToFiles(skin: OsuSkin): Map<any, any>;

export function samplesFromFiles(files: Map<any, any>, relative_sample_paths: Array<any>): BinaryStore;

export function samplesToFiles(samples: BinaryStore): Map<any, any>;

export function texturesFromFiles(files: Map<any, any>, relative_texture_paths: Array<any>): TextureStore;

export function texturesToFiles(textures: TextureStore): Map<any, any>;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_osukeymode_free: (a: number, b: number) => void;
  readonly __wbg_get_osukeymode_keymode: (a: number) => number;
  readonly __wbg_set_osukeymode_keymode: (a: number, b: number) => void;
  readonly __wbg_get_osukeymode_keys_under_notes: (a: number) => number;
  readonly __wbg_set_osukeymode_keys_under_notes: (a: number, b: number) => void;
  readonly __wbg_get_osukeymode_judgement_line: (a: number) => number;
  readonly __wbg_set_osukeymode_judgement_line: (a: number, b: number) => void;
  readonly __wbg_get_osukeymode_upside_down: (a: number) => number;
  readonly __wbg_set_osukeymode_upside_down: (a: number, b: number) => void;
  readonly __wbg_get_osukeymode_special_style: (a: number) => number;
  readonly __wbg_set_osukeymode_special_style: (a: number, b: number) => void;
  readonly __wbg_get_osukeymode_combo_burst_style: (a: number) => number;
  readonly __wbg_set_osukeymode_combo_burst_style: (a: number, b: number) => void;
  readonly __wbg_get_osukeymode_split_stages: (a: number) => number;
  readonly __wbg_set_osukeymode_split_stages: (a: number, b: number) => void;
  readonly __wbg_get_osukeymode_stage_separation: (a: number) => number;
  readonly __wbg_set_osukeymode_stage_separation: (a: number, b: number) => void;
  readonly __wbg_get_osukeymode_separate_score: (a: number) => number;
  readonly __wbg_set_osukeymode_separate_score: (a: number, b: number) => void;
  readonly __wbg_get_osukeymode_hit_position: (a: number) => number;
  readonly __wbg_set_osukeymode_hit_position: (a: number, b: number) => void;
  readonly __wbg_get_osukeymode_light_position: (a: number) => number;
  readonly __wbg_set_osukeymode_light_position: (a: number, b: number) => void;
  readonly __wbg_get_osukeymode_score_position: (a: number) => number;
  readonly __wbg_set_osukeymode_score_position: (a: number, b: number) => void;
  readonly __wbg_get_osukeymode_combo_position: (a: number) => number;
  readonly __wbg_set_osukeymode_combo_position: (a: number, b: number) => void;
  readonly __wbg_get_osukeymode_column_start: (a: number) => number;
  readonly __wbg_set_osukeymode_column_start: (a: number, b: number) => void;
  readonly __wbg_get_osukeymode_column_right: (a: number) => number;
  readonly __wbg_set_osukeymode_column_right: (a: number, b: number) => void;
  readonly __wbg_get_osukeymode_column_line_width: (a: number) => [number, number];
  readonly __wbg_set_osukeymode_column_line_width: (a: number, b: number, c: number) => void;
  readonly __wbg_get_osukeymode_column_width: (a: number) => [number, number];
  readonly __wbg_set_osukeymode_column_width: (a: number, b: number, c: number) => void;
  readonly __wbg_get_osukeymode_column_spacing: (a: number) => [number, number];
  readonly __wbg_set_osukeymode_column_spacing: (a: number, b: number, c: number) => void;
  readonly __wbg_get_osukeymode_barline_height: (a: number) => number;
  readonly __wbg_set_osukeymode_barline_height: (a: number, b: number) => void;
  readonly __wbg_get_osukeymode_lighting_n_width: (a: number) => [number, number];
  readonly __wbg_set_osukeymode_lighting_n_width: (a: number, b: number, c: number) => void;
  readonly __wbg_get_osukeymode_lighting_l_width: (a: number) => [number, number];
  readonly __wbg_set_osukeymode_lighting_l_width: (a: number, b: number, c: number) => void;
  readonly __wbg_get_osukeymode_width_for_note_height_scale: (a: number) => number;
  readonly __wbg_set_osukeymode_width_for_note_height_scale: (a: number, b: number) => void;
  readonly __wbg_get_osukeymode_light_frame_per_second: (a: number) => number;
  readonly __wbg_set_osukeymode_light_frame_per_second: (a: number, b: number) => void;
  readonly __wbg_get_osukeymode_key_flip_when_upside_down: (a: number) => number;
  readonly __wbg_set_osukeymode_key_flip_when_upside_down: (a: number, b: number) => void;
  readonly __wbg_get_osukeymode_note_body_style: (a: number) => number;
  readonly __wbg_set_osukeymode_note_body_style: (a: number, b: number) => void;
  readonly __wbg_get_osukeymode_note_body_style_columns: (a: number) => [number, number];
  readonly __wbg_set_osukeymode_note_body_style_columns: (a: number, b: number, c: number) => void;
  readonly __wbg_get_osukeymode_receptor_images: (a: number) => [number, number];
  readonly __wbg_set_osukeymode_receptor_images: (a: number, b: number, c: number) => void;
  readonly __wbg_get_osukeymode_receptor_images_down: (a: number) => [number, number];
  readonly __wbg_set_osukeymode_receptor_images_down: (a: number, b: number, c: number) => void;
  readonly __wbg_get_osukeymode_normal_note_images: (a: number) => [number, number];
  readonly __wbg_set_osukeymode_normal_note_images: (a: number, b: number, c: number) => void;
  readonly __wbg_get_osukeymode_long_note_head_images: (a: number) => [number, number];
  readonly __wbg_set_osukeymode_long_note_head_images: (a: number, b: number, c: number) => void;
  readonly __wbg_get_osukeymode_long_note_body_images: (a: number) => [number, number];
  readonly __wbg_set_osukeymode_long_note_body_images: (a: number, b: number, c: number) => void;
  readonly __wbg_get_osukeymode_long_note_tail_images: (a: number) => [number, number];
  readonly __wbg_set_osukeymode_long_note_tail_images: (a: number, b: number, c: number) => void;
  readonly __wbg_get_osukeymode_stage_left: (a: number) => [number, number];
  readonly __wbg_set_osukeymode_stage_left: (a: number, b: number, c: number) => void;
  readonly __wbg_get_osukeymode_stage_right: (a: number) => [number, number];
  readonly __wbg_set_osukeymode_stage_right: (a: number, b: number, c: number) => void;
  readonly __wbg_get_osukeymode_stage_bottom: (a: number) => [number, number];
  readonly __wbg_set_osukeymode_stage_bottom: (a: number, b: number, c: number) => void;
  readonly __wbg_get_osukeymode_stage_hint: (a: number) => [number, number];
  readonly __wbg_set_osukeymode_stage_hint: (a: number, b: number, c: number) => void;
  readonly __wbg_get_osukeymode_stage_light: (a: number) => [number, number];
  readonly __wbg_set_osukeymode_stage_light: (a: number, b: number, c: number) => void;
  readonly __wbg_get_osukeymode_lighting_n: (a: number) => [number, number];
  readonly __wbg_set_osukeymode_lighting_n: (a: number, b: number, c: number) => void;
  readonly __wbg_get_osukeymode_lighting_l: (a: number) => [number, number];
  readonly __wbg_set_osukeymode_lighting_l: (a: number, b: number, c: number) => void;
  readonly __wbg_get_osukeymode_warning_arrow: (a: number) => [number, number];
  readonly __wbg_set_osukeymode_warning_arrow: (a: number, b: number, c: number) => void;
  readonly __wbg_get_osukeymode_hit0: (a: number) => [number, number];
  readonly __wbg_set_osukeymode_hit0: (a: number, b: number, c: number) => void;
  readonly __wbg_get_osukeymode_hit50: (a: number) => [number, number];
  readonly __wbg_set_osukeymode_hit50: (a: number, b: number, c: number) => void;
  readonly __wbg_get_osukeymode_hit100: (a: number) => [number, number];
  readonly __wbg_set_osukeymode_hit100: (a: number, b: number, c: number) => void;
  readonly __wbg_get_osukeymode_hit200: (a: number) => [number, number];
  readonly __wbg_set_osukeymode_hit200: (a: number, b: number, c: number) => void;
  readonly __wbg_get_osukeymode_hit300: (a: number) => [number, number];
  readonly __wbg_set_osukeymode_hit300: (a: number, b: number, c: number) => void;
  readonly __wbg_get_osukeymode_hit300g: (a: number) => [number, number];
  readonly __wbg_set_osukeymode_hit300g: (a: number, b: number, c: number) => void;
  readonly keymode_fromStr: (a: number, b: number) => [number, number, number];
  readonly keymode_toStr: (a: number) => [number, number];
  readonly keymode_getTexturePaths: (a: number) => [number, number];
  readonly __wbg_fluxiskeymode_free: (a: number, b: number) => void;
  readonly __wbg_get_fluxiskeymode_keymode: (a: number) => number;
  readonly __wbg_set_fluxiskeymode_keymode: (a: number, b: number) => void;
  readonly __wbg_get_fluxiskeymode_column_width: (a: number) => number;
  readonly __wbg_set_fluxiskeymode_column_width: (a: number, b: number) => void;
  readonly __wbg_get_fluxiskeymode_hit_position: (a: number) => number;
  readonly __wbg_set_fluxiskeymode_hit_position: (a: number, b: number) => void;
  readonly __wbg_get_fluxiskeymode_tint_notes: (a: number) => number;
  readonly __wbg_set_fluxiskeymode_tint_notes: (a: number, b: number) => void;
  readonly __wbg_get_fluxiskeymode_tint_lns: (a: number) => number;
  readonly __wbg_set_fluxiskeymode_tint_lns: (a: number, b: number) => void;
  readonly __wbg_get_fluxiskeymode_tint_receptors: (a: number) => number;
  readonly __wbg_set_fluxiskeymode_tint_receptors: (a: number, b: number) => void;
  readonly __wbg_get_fluxiskeymode_colors: (a: number) => [number, number];
  readonly __wbg_set_fluxiskeymode_colors: (a: number, b: number, c: number) => void;
  readonly __wbg_get_fluxiskeymode_receptors_first: (a: number) => number;
  readonly __wbg_set_fluxiskeymode_receptors_first: (a: number, b: number) => void;
  readonly __wbg_get_fluxiskeymode_receptor_offset: (a: number) => number;
  readonly __wbg_set_fluxiskeymode_receptor_offset: (a: number, b: number) => void;
  readonly __wbg_info_free: (a: number, b: number) => void;
  readonly __wbg_get_info_name: (a: number) => [number, number];
  readonly __wbg_set_info_name: (a: number, b: number, c: number) => void;
  readonly __wbg_get_info_creator: (a: number) => [number, number];
  readonly __wbg_set_info_creator: (a: number, b: number, c: number) => void;
  readonly __wbg_get_info_accent: (a: number) => [number, number];
  readonly __wbg_set_info_accent: (a: number, b: number, c: number) => void;
  readonly __wbg_fluxisskin_free: (a: number, b: number) => void;
  readonly __wbg_get_fluxisskin_skin_json: (a: number) => number;
  readonly __wbg_set_fluxisskin_skin_json: (a: number, b: number) => void;
  readonly __wbg_get_fluxisskin_textures: (a: number) => number;
  readonly __wbg_set_fluxisskin_textures: (a: number, b: number) => void;
  readonly __wbg_get_fluxisskin_samples: (a: number) => number;
  readonly __wbg_set_fluxisskin_samples: (a: number, b: number) => void;
  readonly fluxisskin_new: (a: number, b: number, c: number) => number;
  readonly fluxisskin_toGenericMania: (a: number) => [number, number, number];
  readonly fluxisskin_toGenericManiaWithLayout: (a: number, b: number) => [number, number, number];
  readonly fluxisskin_fromGenericMania: (a: number) => [number, number, number];
  readonly fluxisskin_getKeymode: (a: number, b: number) => number;
  readonly fluxisskin_getRequiredTexturePaths: (a: number) => [number, number];
  readonly fluxisskin_getRequiredSamplePaths: (a: number) => [number, number];
  readonly __wbg_fluxisskinwithlayout_free: (a: number, b: number) => void;
  readonly __wbg_get_fluxisskinwithlayout_skin: (a: number) => number;
  readonly __wbg_set_fluxisskinwithlayout_skin: (a: number, b: number) => void;
  readonly __wbg_get_fluxisskinwithlayout_layout: (a: number) => number;
  readonly __wbg_set_fluxisskinwithlayout_layout: (a: number, b: number) => void;
  readonly __wbg_fluxislayout_free: (a: number, b: number) => void;
  readonly __wbg_get_fluxislayout_name: (a: number) => [number, number];
  readonly __wbg_set_fluxislayout_name: (a: number, b: number, c: number) => void;
  readonly __wbg_get_fluxislayout_author: (a: number) => [number, number];
  readonly __wbg_set_fluxislayout_author: (a: number, b: number, c: number) => void;
  readonly texturesFromFiles: (a: any, b: any) => [number, number, number];
  readonly allTexturesFromFiles: (a: any) => [number, number, number];
  readonly samplesFromFiles: (a: any, b: any) => [number, number, number];
  readonly allSamplesFromFiles: (a: any) => [number, number, number];
  readonly __wbg_osuskinini_free: (a: number, b: number) => void;
  readonly __wbg_get_osuskinini_general: (a: number) => number;
  readonly __wbg_set_osuskinini_general: (a: number, b: number) => void;
  readonly __wbg_get_osuskinini_keymodes: (a: number) => [number, number];
  readonly __wbg_set_osuskinini_keymodes: (a: number, b: number, c: number) => void;
  readonly osuskinini_new: () => number;
  readonly osuskinini_fromStr: (a: number, b: number) => [number, number, number];
  readonly osuskinini_toString: (a: number) => [number, number];
  readonly osuskinini_getRequiredTexturePaths: (a: number) => [number, number];
  readonly osuskinini_getRequiredSamplePaths: (a: number) => [number, number];
  readonly osuskinini_getKeymode: (a: number, b: number) => number;
  readonly __wbg_skinjson_free: (a: number, b: number) => void;
  readonly __wbg_get_skinjson_info: (a: number) => number;
  readonly __wbg_set_skinjson_info: (a: number, b: number) => void;
  readonly __wbg_get_skinjson_keymodes: (a: number) => [number, number];
  readonly __wbg_set_skinjson_keymodes: (a: number, b: number, c: number) => void;
  readonly skinjson_new: () => number;
  readonly skinjson_fromStr: (a: number, b: number) => [number, number, number];
  readonly fluXisSkinToFiles: (a: number) => [number, number, number];
  readonly layoutToString: (a: number) => [number, number, number, number];
  readonly jsonToString: (a: number) => [number, number];
  readonly skinjson_toString: (a: number) => [number, number];
  readonly __wbg_osuskin_free: (a: number, b: number) => void;
  readonly __wbg_get_osuskin_skin_ini: (a: number) => number;
  readonly __wbg_set_osuskin_skin_ini: (a: number, b: number) => void;
  readonly __wbg_get_osuskin_textures: (a: number) => number;
  readonly __wbg_set_osuskin_textures: (a: number, b: number) => void;
  readonly __wbg_get_osuskin_samples: (a: number) => number;
  readonly __wbg_set_osuskin_samples: (a: number, b: number) => void;
  readonly osuskin_new: (a: number, b: number, c: number) => number;
  readonly osuskin_toGenericMania: (a: number) => [number, number, number];
  readonly osuskin_fromGenericMania: (a: number) => [number, number, number];
  readonly osuskin_getKeymode: (a: number, b: number) => number;
  readonly osuskin_getRequiredTexturePaths: (a: number) => [number, number];
  readonly osuskin_getRequiredSamplePaths: (a: number) => [number, number];
  readonly __wbg_binarystore_free: (a: number, b: number) => void;
  readonly binarystore_new_wasm: () => number;
  readonly binarystore_insertBinary: (a: number, b: number) => void;
  readonly binarystore_makeUnique: (a: number, b: number, c: number, d: number) => [number, number];
  readonly binarystore_loadFromArrayBuffer: (a: number, b: number, c: number, d: any) => [number, number];
  readonly binarystore_loadFromUint8Array: (a: number, b: number, c: number, d: any) => [number, number];
  readonly binarystore_allLoaded: (a: number) => number;
  readonly binarystore_loadedCount: (a: number) => number;
  readonly binarystore_unloadedPaths: (a: number) => any;
  readonly binarystore_getBinaryPath: (a: number, b: number, c: number) => [number, number];
  readonly binarystore_binaryHasData: (a: number, b: number, c: number) => number;
  readonly binarystore_getBinaryData: (a: number, b: number, c: number) => any;
  readonly binarystore_contains: (a: number, b: number, c: number) => number;
  readonly binarystore_remove: (a: number, b: number, c: number) => number;
  readonly binarystore_getLength: (a: number) => number;
  readonly binarystore_isEmpty: (a: number) => number;
  readonly binarystore_getPaths: (a: number) => any;
  readonly binarystore_clear: (a: number) => void;
  readonly binarystore_copy: (a: number, b: number, c: number, d: number, e: number) => [number, number];
  readonly binarystore_makeUniqueCopy: (a: number, b: number, c: number, d: number, e: number) => [number, number];
  readonly binarystore_extend: (a: number, b: number) => void;
  readonly osuSkinToFiles: (a: number) => [number, number, number];
  readonly iniToString: (a: number) => [number, number];
  readonly binarystore_hasBinary: (a: number, b: number, c: number) => number;
  readonly __wbg_genericmaniaskin_free: (a: number, b: number) => void;
  readonly __wbg_get_genericmaniaskin_textures: (a: number) => number;
  readonly __wbg_set_genericmaniaskin_textures: (a: number, b: number) => void;
  readonly __wbg_get_genericmaniaskin_samples: (a: number) => number;
  readonly __wbg_set_genericmaniaskin_samples: (a: number, b: number) => void;
  readonly genericmaniaskin_fromGenericMania: (a: number) => [number, number, number];
  readonly genericmaniaskin_getKeymode: (a: number, b: number) => number;
  readonly genericmaniaskin_getRequiredTexturePaths: (a: number) => [number, number];
  readonly genericmaniaskin_getRequiredSamplePaths: (a: number) => [number, number];
  readonly __wbg_texture_free: (a: number, b: number) => void;
  readonly __wbg_get_texture_path: (a: number) => [number, number];
  readonly __wbg_set_texture_path: (a: number, b: number, c: number) => void;
  readonly texture_new: (a: number, b: number) => number;
  readonly texture_fromBlank: (a: number, b: number) => number;
  readonly texture_fromArrayBuffer: (a: number, b: number, c: any) => [number, number, number];
  readonly texture_fromArrayBufferUnloaded: (a: number, b: number, c: any) => [number, number, number];
  readonly texture_fromUint8Array: (a: number, b: number, c: any) => [number, number, number];
  readonly texture_fromUint8ArrayUnloaded: (a: number, b: number, c: any) => [number, number, number];
  readonly texture_getPath: (a: number) => [number, number];
  readonly texture_hasData: (a: number) => number;
  readonly texture_isLoaded: (a: number) => number;
  readonly texture_isUnloaded: (a: number) => number;
  readonly texture_isEmpty: (a: number) => number;
  readonly texture_load: (a: number) => [number, number];
  readonly texture_unload: (a: number) => [number, number];
  readonly __wbg_texturestore_free: (a: number, b: number) => void;
  readonly texturestore_new_wasm: () => number;
  readonly texturestore_insertTexture: (a: number, b: number) => void;
  readonly texturestore_makeUnique: (a: number, b: number, c: number, d: number) => [number, number];
  readonly texturestore_loadFromArrayBuffer: (a: number, b: number, c: number, d: any) => [number, number];
  readonly texturestore_loadFromUint8Array: (a: number, b: number, c: number, d: any) => [number, number];
  readonly texturestore_allLoaded: (a: number) => number;
  readonly texturestore_loadedCount: (a: number) => number;
  readonly texturestore_unloadedPaths: (a: number) => any;
  readonly texturestore_getTexturePath: (a: number, b: number, c: number) => [number, number];
  readonly texturestore_textureHasData: (a: number, b: number, c: number) => number;
  readonly texturestore_contains: (a: number, b: number, c: number) => number;
  readonly texturestore_remove: (a: number, b: number, c: number) => number;
  readonly texturestore_getLength: (a: number) => number;
  readonly texturestore_isEmpty: (a: number) => number;
  readonly texturestore_getPaths: (a: number) => any;
  readonly texturestore_clear: (a: number) => void;
  readonly texturestore_copy: (a: number, b: number, c: number, d: number, e: number) => [number, number];
  readonly texturestore_makeUniqueCopy: (a: number, b: number, c: number, d: number, e: number) => [number, number];
  readonly texturestore_extend: (a: number, b: number) => void;
  readonly texturestore_hasTexture: (a: number, b: number, c: number) => number;
  readonly genericmaniaskin_toGenericMania: (a: number) => [number, number, number];
  readonly __wbg_general_free: (a: number, b: number) => void;
  readonly __wbg_get_general_name: (a: number) => [number, number];
  readonly __wbg_set_general_name: (a: number, b: number, c: number) => void;
  readonly __wbg_get_general_author: (a: number) => [number, number];
  readonly __wbg_set_general_author: (a: number, b: number, c: number) => void;
  readonly __wbg_get_general_version: (a: number) => [number, number];
  readonly __wbg_set_general_version: (a: number, b: number, c: number) => void;
  readonly __wbg_get_general_animation_framerate: (a: number) => number;
  readonly __wbg_set_general_animation_framerate: (a: number, b: number) => void;
  readonly __wbg_get_general_allow_slider_ball_tint: (a: number) => number;
  readonly __wbg_set_general_allow_slider_ball_tint: (a: number, b: number) => void;
  readonly __wbg_get_general_combo_burst_random: (a: number) => number;
  readonly __wbg_set_general_combo_burst_random: (a: number, b: number) => void;
  readonly __wbg_get_general_cursor_centre: (a: number) => number;
  readonly __wbg_set_general_cursor_centre: (a: number, b: number) => void;
  readonly __wbg_get_general_cursor_expand: (a: number) => number;
  readonly __wbg_set_general_cursor_expand: (a: number, b: number) => void;
  readonly __wbg_get_general_cursor_rotate: (a: number) => number;
  readonly __wbg_set_general_cursor_rotate: (a: number, b: number) => void;
  readonly __wbg_get_general_cursor_trail_rotate: (a: number) => number;
  readonly __wbg_set_general_cursor_trail_rotate: (a: number, b: number) => void;
  readonly __wbg_get_general_custom_combo_burst_sounds: (a: number) => [number, number];
  readonly __wbg_set_general_custom_combo_burst_sounds: (a: number, b: number, c: number) => void;
  readonly __wbg_get_general_hit_circle_overlay_above_number: (a: number) => number;
  readonly __wbg_set_general_hit_circle_overlay_above_number: (a: number, b: number) => void;
  readonly __wbg_get_general_layered_hit_sounds: (a: number) => number;
  readonly __wbg_set_general_layered_hit_sounds: (a: number, b: number) => void;
  readonly __wbg_get_general_slider_ball_flip: (a: number) => number;
  readonly __wbg_set_general_slider_ball_flip: (a: number, b: number) => void;
  readonly __wbg_get_general_spinner_fade_playfield: (a: number) => number;
  readonly __wbg_set_general_spinner_fade_playfield: (a: number, b: number) => void;
  readonly __wbg_get_general_spinner_frequency_modulate: (a: number) => number;
  readonly __wbg_set_general_spinner_frequency_modulate: (a: number, b: number) => void;
  readonly __wbg_get_general_spinner_no_blink: (a: number) => number;
  readonly __wbg_set_general_spinner_no_blink: (a: number, b: number) => void;
  readonly general_fromStr: (a: number, b: number) => [number, number, number];
  readonly general_toString: (a: number) => [number, number];
  readonly __wbg_keymode_free: (a: number, b: number) => void;
  readonly __wbg_get_keymode_keymode: (a: number) => number;
  readonly __wbg_set_keymode_keymode: (a: number, b: number) => void;
  readonly __wbg_rawbytes_free: (a: number, b: number) => void;
  readonly __wbg_get_rawbytes_path: (a: number) => [number, number];
  readonly __wbg_set_rawbytes_path: (a: number, b: number, c: number) => void;
  readonly rawbytes_new: (a: number, b: number) => number;
  readonly rawbytes_fromBytes: (a: number, b: number, c: number, d: number) => number;
  readonly rawbytes_getData: (a: number) => any;
  readonly rawbytes_fromArrayBuffer: (a: number, b: number, c: any) => [number, number, number];
  readonly rawbytes_fromArrayBufferUnloaded: (a: number, b: number, c: any) => [number, number, number];
  readonly rawbytes_fromUint8Array: (a: number, b: number, c: any) => [number, number, number];
  readonly rawbytes_fromUint8ArrayUnloaded: (a: number, b: number, c: any) => [number, number, number];
  readonly rawbytes_getPath: (a: number) => [number, number];
  readonly rawbytes_hasData: (a: number) => number;
  readonly rawbytes_isLoaded: (a: number) => number;
  readonly rawbytes_isUnloaded: (a: number) => number;
  readonly rawbytes_isEmpty: (a: number) => number;
  readonly rawbytes_load: (a: number) => [number, number];
  readonly rawbytes_unload: (a: number) => [number, number];
  readonly texturesToFiles: (a: number) => [number, number, number];
  readonly samplesToFiles: (a: number) => [number, number, number];
  readonly osuSkinFromFiles: (a: any) => [number, number, number];
  readonly fluXisSkinFromFiles: (a: any) => [number, number, number];
  readonly wasm_bindgen__convert__closures_____invoke__h9a6e61dda56dfb1d: (a: number, b: number, c: any, d: any) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_externrefs: WebAssembly.Table;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __externref_drop_slice: (a: number, b: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
