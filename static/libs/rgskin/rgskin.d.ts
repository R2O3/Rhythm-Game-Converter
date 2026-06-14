/* tslint:disable */
/* eslint-disable */

export class BinaryStore {
  free(): void;
  [Symbol.dispose](): void;
  allLoaded(): boolean;
  hasBinary(path: string): boolean;
  makeUnique(new_path: string, binary: RawBytes): string;
  loadedCount(): number;
  insertBinary(binary: RawBytes): void;
  unloadedPaths(): Array<any>;
  binaryHasData(path: string): boolean;
  getBinaryData(path: string): Uint8Array | undefined;
  getBinaryPath(path: string): string | undefined;
  loadFromUint8Array(path: string, array: Uint8Array): void;
  loadFromArrayBuffer(path: string, buffer: ArrayBuffer): void;
  constructor();
  clear(): void;
  getLength(): number;
  extend(other: BinaryStore): void;
  remove(path: string): boolean;
  contains(path: string): boolean;
  isEmpty(): boolean;
  getPaths(): Array<any>;
  makeUniqueCopy(original_path: string, new_base_path: string): string | undefined;
  copy(original_path: string, new_path: string): string | undefined;
}

export enum DefaultSkin {
  Arrow = 0,
  Bar = 1,
  Circle = 2,
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
  getKeymode(keymode: number): FluXisKeymode | undefined;
  toGenericMania(): GenericManiaSkin;
  static fromGenericMania(skin: GenericManiaSkin): FluXisSkinWithLayout;
  getRequiredSamplePaths(): string[];
  getRequiredTexturePaths(): string[];
  toGenericManiaWithLayout(layout: FluXisLayout): GenericManiaSkin;
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
  getKeymode(keymode: number): Keymode | undefined;
  toGenericMania(): GenericManiaSkin;
  static fromGenericMania(skin: GenericManiaSkin): GenericManiaSkin;
  getRequiredSamplePaths(): string[];
  getRequiredTexturePaths(): string[];
  textures: TextureStore;
  samples: BinaryStore;
}

export enum HealthBarKeysAlignment {
  LeftStage = 0,
  RightStage = 1,
  TopLeft = 2,
}

export enum HealthBarType {
  Horizontal = 0,
  Vertical = 1,
}

export enum HitBubblesAlignment {
  LeftStage = 0,
  RightStage = 1,
  BelowStage = 2,
}

export enum HitBubblesType {
  FallDown = 0,
  FallUp = 1,
  FallLeft = 2,
  FallRight = 3,
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
  toStr(): string;
  static fromStr(content: string): OsuKeymode;
  getTexturePaths(): string[];
  keymode: number;
}

export class MainMenu {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  static fromStr(content: string): MainMenu;
  toString(): string;
  navigation_button_hovered_alpha: number;
  audio_visualizer_opacity: number;
  note_visualizer_opacity: number;
}

export class MenuBorder {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  static fromStr(content: string): MenuBorder;
  toString(): string;
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
  getKeymode(keymode: number): OsuKeymode | undefined;
  toGenericMania(): GenericManiaSkin;
  static fromGenericMania(skin: GenericManiaSkin): OsuSkin;
  getRequiredSamplePaths(): string[];
  getRequiredTexturePaths(): string[];
  skin_ini: OsuSkinIni;
  textures: TextureStore;
  samples: BinaryStore;
}

export class OsuSkinIni {
  free(): void;
  [Symbol.dispose](): void;
  static fromStr(json_str: string): OsuSkinIni;
  toString(): string;
  getKeymode(keymode: number): OsuKeymode | undefined;
  getRequiredSamplePaths(): string[];
  getRequiredTexturePaths(): string[];
  constructor();
  general: General;
  keymodes: OsuKeymode[];
}

export class QuaGeneral {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  static fromStr(content: string): QuaGeneral;
  toString(): string;
  name: string;
  author: string;
  version: string;
  center_cursor: boolean;
  use_skin_backgrounds: boolean;
}

export class QuaKeymode {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  toStr(): string;
  static fromStr(content: string): QuaKeymode;
  keymode: number;
  default_skin: DefaultSkin;
  color_objects_by_snap_distance: boolean;
  use_hit_object_sheet: boolean;
  rotate_hit_objects_by_column: boolean;
  flip_note_images_on_upscroll: boolean;
  flip_note_end_images_on_upscroll: boolean;
  draw_long_note_end: boolean;
  note_padding: number;
  width_for_note_height_scale: number;
  bg_mask_alpha: number;
  bg_mask_padding: number;
  column_alignment: number;
  column_size: number;
  column_lighting_offset_y: number;
  column_lighting_scale: number;
  hit_pos_offset_y: number;
  receptor_pos_offset_y: number;
  receptors_over_hit_objects: boolean;
  stage_receptor_padding: number;
  coop_playfield_padding: number;
  hit_error_chevron_size: number;
  hit_error_height: number;
  hit_error_pos_x: number;
  hit_error_pos_y: number;
  hit_error_alpha: number;
  judgement_hit_burst_fps: number;
  judgement_burst_pos_y: number;
  judgement_hit_burst_bump_y: number;
  judgement_hit_burst_bump_time: number;
  judgement_hit_burst_scale: number;
  hit_lighting_x: number;
  hit_lighting_y: number;
  hit_lighting_fps: number;
  hit_lighting_scale: number;
  hit_lighting_column_rotation: boolean;
  hold_lighting_fps: number;
  hold_lighting_scale: number;
  hold_lighting_column_rotation: boolean;
  health_bar_keys_alignment: HealthBarKeysAlignment;
  health_bar_type: HealthBarType;
  health_bar_pos_offset_x: number;
  health_bar_pos_offset_y: number;
  health_bar_scale: number;
  hit_bubbles_alignment: HitBubblesAlignment;
  hit_bubbles_type: HitBubblesType;
  hit_bubbles_pos_x: number;
  hit_bubbles_pos_y: number;
  hit_bubbles_scale: number;
  hit_bubble_scale: number;
  hit_bubble_border_padding: number;
  hit_bubble_padding: number;
  combo_display_scale: number;
  combo_pos_x: number;
  combo_pos_y: number;
  combo_display_bump_y: number;
  combo_display_bump_time: number;
  rating_display_scale: number;
  rating_display_pos_x: number;
  rating_display_pos_y: number;
  accuracy_display_scale: number;
  accuracy_display_pos_x: number;
  accuracy_display_pos_y: number;
  kps_display_scale: number;
  kps_display_pos_x: number;
  kps_display_pos_y: number;
  score_display_scale: number;
  score_display_pos_x: number;
  score_display_pos_y: number;
  battle_royale_alert_pos_x: number;
  battle_royale_alert_pos_y: number;
  battle_royale_alert_scale: number;
  battle_royale_eliminated_pos_x: number;
  battle_royale_eliminated_pos_y: number;
  judgement_counter_alpha: number;
  judgement_counter_size: number;
  judgement_counter_pos_x: number;
  judgement_counter_pos_y: number;
  judgement_counter_padding: number;
  judgement_counter_horizontal: boolean;
  judgement_counter_fade_to_alpha: boolean;
  use_judgement_color_for_numbers: boolean;
  song_time_progress_scale: number;
  song_time_progress_position_at_top: boolean;
  show_mini_song_bar: boolean;
  mini_song_bar_display_pos_x: number;
  mini_song_bar_display_pos_y: number;
  mini_song_bar_display_width_factor: number;
  mini_song_bar_display_height: number;
  use_fallback: boolean;
}

export class QuaSkin {
  free(): void;
  [Symbol.dispose](): void;
  constructor(skin_ini: QuaSkinIni, textures?: TextureStore | null, samples?: BinaryStore | null);
  getKeymode(keymode: number): QuaKeymode | undefined;
  toGenericMania(): GenericManiaSkin;
  static fromGenericMania(skin: GenericManiaSkin): QuaSkin;
  getRequiredSamplePaths(): string[];
  getRequiredTexturePaths(): string[];
  skin_ini: QuaSkinIni;
  textures: TextureStore;
  samples: BinaryStore;
}

export class QuaSkinIni {
  free(): void;
  [Symbol.dispose](): void;
  static fromStr(ini_str: string): QuaSkinIni;
  toString(): string;
  getKeymode(keymode: number): QuaKeymode | undefined;
  constructor();
  general: QuaGeneral;
  main_menu: MainMenu;
  menu_border: MenuBorder;
  song_select: SongSelect;
  results: Results;
  keymodes: QuaKeymode[];
  get shared_keymode(): QuaKeymode | undefined;
  set shared_keymode(value: QuaKeymode | null | undefined);
}

export class RawBytes {
  free(): void;
  [Symbol.dispose](): void;
  getData(): Uint8Array | undefined;
  getHash(): bigint | undefined;
  static fromBytes(path: string, bytes: Uint8Array): RawBytes;
  constructor(path: string);
  unload(): void;
  getPath(): string;
  hasData(): boolean;
  isEmpty(): boolean;
  isLoaded(): boolean;
  isUnloaded(): boolean;
  static fromUint8Array(path: string, array: Uint8Array): RawBytes;
  static fromArrayBuffer(path: string, buffer: ArrayBuffer): RawBytes;
  static fromUint8ArrayUnloaded(path: string, array: Uint8Array): RawBytes;
  static fromArrayBufferUnloaded(path: string, buffer: ArrayBuffer): RawBytes;
  load(): void;
  path: string;
}

export class Results {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  static fromStr(content: string): Results;
  toString(): string;
  results_background_type: ResultsBackgroundType;
  results_background_filter_alpha: number;
}

export enum ResultsBackgroundType {
  Header = 0,
  Background = 1,
  None = 2,
}

export class SkinJson {
  free(): void;
  [Symbol.dispose](): void;
  static fromStr(json_str: string): SkinJson;
  toString(): string;
  constructor();
  info: Info;
  keymodes: FluXisKeymode[];
}

export class SongSelect {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  static fromStr(content: string): SongSelect;
  toString(): string;
  mapset_panel_hovering_alpha: number;
  map_background_brightness: number;
  display_map_background: boolean;
}

export class Texture {
  free(): void;
  [Symbol.dispose](): void;
  static fromBlank(path: string): Texture;
  getHash(): bigint | undefined;
  constructor(path: string);
  unload(): void;
  getPath(): string;
  hasData(): boolean;
  isEmpty(): boolean;
  isLoaded(): boolean;
  isUnloaded(): boolean;
  static fromUint8Array(path: string, array: Uint8Array): Texture;
  static fromArrayBuffer(path: string, buffer: ArrayBuffer): Texture;
  static fromUint8ArrayUnloaded(path: string, array: Uint8Array): Texture;
  static fromArrayBufferUnloaded(path: string, buffer: ArrayBuffer): Texture;
  load(): void;
  path: string;
}

export class TextureStore {
  free(): void;
  [Symbol.dispose](): void;
  allLoaded(): boolean;
  hasTexture(path: string): boolean;
  makeUnique(new_path: string, texture: Texture): string;
  loadedCount(): number;
  insertTexture(texture: Texture): void;
  unloadedPaths(): Array<any>;
  getTexturePath(path: string): string | undefined;
  textureHasData(path: string): boolean;
  loadFromUint8Array(path: string, array: Uint8Array): void;
  loadFromArrayBuffer(path: string, buffer: ArrayBuffer): void;
  constructor();
  clear(): void;
  getLength(): number;
  extend(other: TextureStore): void;
  remove(path: string): boolean;
  contains(path: string): boolean;
  isEmpty(): boolean;
  getPaths(): Array<any>;
  makeUniqueCopy(original_path: string, new_base_path: string): string | undefined;
  copy(original_path: string, new_path: string): string | undefined;
}

export function allSamplesFromFiles(files: Map<any, any>): BinaryStore;

export function allTexturesFromFiles(files: Map<any, any>): TextureStore;

export function fluXisSkinFromFiles(files: Map<any, any>): FluXisSkin;

export function fluXisSkinToFiles(skin: FluXisSkin): Map<any, any>;

export function fluxisJsonToString(skin_json: SkinJson): string;

export function fluxisLayoutToString(layout_json: FluXisLayout): string;

export function initThreadPool(num_threads: number): Promise<any>;

export function osuIniToString(skin_ini: OsuSkinIni): string;

export function osuSkinFromFiles(files: Map<any, any>): OsuSkin;

export function osuSkinToFiles(skin: OsuSkin): Map<any, any>;

export function quaverIniToString(skin_ini: QuaSkinIni): string;

export function quaverSkinFromFiles(files: Map<any, any>): QuaSkin;

export function quaverSkinToFiles(skin: QuaSkin): Map<any, any>;

export function samplesFromFiles(files: Map<any, any>, relative_sample_paths: Array<any>): BinaryStore;

export function samplesToFiles(samples: BinaryStore): Map<any, any>;

export function texturesFromFiles(files: Map<any, any>, relative_texture_paths: Array<any>): TextureStore;

export function texturesToFiles(textures: TextureStore): Map<any, any>;

export class wbg_rayon_PoolBuilder {
  private constructor();
  free(): void;
  [Symbol.dispose](): void;
  numThreads(): number;
  build(): void;
  mainJS(): string;
  receiver(): number;
}

export function wbg_rayon_start_worker(receiver: number): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly __wbg_binarystore_free: (a: number, b: number) => void;
  readonly __wbg_get_osukeymode_barline_height: (a: number) => number;
  readonly __wbg_get_osukeymode_column_line_width: (a: number) => [number, number];
  readonly __wbg_get_osukeymode_column_right: (a: number) => number;
  readonly __wbg_get_osukeymode_column_spacing: (a: number) => [number, number];
  readonly __wbg_get_osukeymode_column_start: (a: number) => number;
  readonly __wbg_get_osukeymode_column_width: (a: number) => [number, number];
  readonly __wbg_get_osukeymode_combo_burst_style: (a: number) => number;
  readonly __wbg_get_osukeymode_combo_position: (a: number) => number;
  readonly __wbg_get_osukeymode_hit0: (a: number) => [number, number];
  readonly __wbg_get_osukeymode_hit100: (a: number) => [number, number];
  readonly __wbg_get_osukeymode_hit200: (a: number) => [number, number];
  readonly __wbg_get_osukeymode_hit300: (a: number) => [number, number];
  readonly __wbg_get_osukeymode_hit300g: (a: number) => [number, number];
  readonly __wbg_get_osukeymode_hit50: (a: number) => [number, number];
  readonly __wbg_get_osukeymode_hit_position: (a: number) => number;
  readonly __wbg_get_osukeymode_judgement_line: (a: number) => number;
  readonly __wbg_get_osukeymode_key_flip_when_upside_down: (a: number) => number;
  readonly __wbg_get_osukeymode_keymode: (a: number) => number;
  readonly __wbg_get_osukeymode_keys_under_notes: (a: number) => number;
  readonly __wbg_get_osukeymode_light_frame_per_second: (a: number) => number;
  readonly __wbg_get_osukeymode_light_position: (a: number) => number;
  readonly __wbg_get_osukeymode_lighting_l: (a: number) => [number, number];
  readonly __wbg_get_osukeymode_lighting_l_width: (a: number) => [number, number];
  readonly __wbg_get_osukeymode_lighting_n: (a: number) => [number, number];
  readonly __wbg_get_osukeymode_lighting_n_width: (a: number) => [number, number];
  readonly __wbg_get_osukeymode_long_note_body_images: (a: number) => [number, number];
  readonly __wbg_get_osukeymode_long_note_head_images: (a: number) => [number, number];
  readonly __wbg_get_osukeymode_long_note_tail_images: (a: number) => [number, number];
  readonly __wbg_get_osukeymode_normal_note_images: (a: number) => [number, number];
  readonly __wbg_get_osukeymode_note_body_style: (a: number) => number;
  readonly __wbg_get_osukeymode_note_body_style_columns: (a: number) => [number, number];
  readonly __wbg_get_osukeymode_receptor_images: (a: number) => [number, number];
  readonly __wbg_get_osukeymode_receptor_images_down: (a: number) => [number, number];
  readonly __wbg_get_osukeymode_score_position: (a: number) => number;
  readonly __wbg_get_osukeymode_separate_score: (a: number) => number;
  readonly __wbg_get_osukeymode_special_style: (a: number) => number;
  readonly __wbg_get_osukeymode_split_stages: (a: number) => number;
  readonly __wbg_get_osukeymode_stage_bottom: (a: number) => [number, number];
  readonly __wbg_get_osukeymode_stage_hint: (a: number) => [number, number];
  readonly __wbg_get_osukeymode_stage_left: (a: number) => [number, number];
  readonly __wbg_get_osukeymode_stage_light: (a: number) => [number, number];
  readonly __wbg_get_osukeymode_stage_right: (a: number) => [number, number];
  readonly __wbg_get_osukeymode_stage_separation: (a: number) => number;
  readonly __wbg_get_osukeymode_upside_down: (a: number) => number;
  readonly __wbg_get_osukeymode_warning_arrow: (a: number) => [number, number];
  readonly __wbg_get_osukeymode_width_for_note_height_scale: (a: number) => number;
  readonly __wbg_get_skinjson_info: (a: number) => number;
  readonly __wbg_get_skinjson_keymodes: (a: number) => [number, number];
  readonly __wbg_get_songselect_display_map_background: (a: number) => number;
  readonly __wbg_get_songselect_map_background_brightness: (a: number) => number;
  readonly __wbg_get_songselect_mapset_panel_hovering_alpha: (a: number) => number;
  readonly __wbg_osukeymode_free: (a: number, b: number) => void;
  readonly __wbg_set_osukeymode_barline_height: (a: number, b: number) => void;
  readonly __wbg_set_osukeymode_column_line_width: (a: number, b: number, c: number) => void;
  readonly __wbg_set_osukeymode_column_right: (a: number, b: number) => void;
  readonly __wbg_set_osukeymode_column_spacing: (a: number, b: number, c: number) => void;
  readonly __wbg_set_osukeymode_column_start: (a: number, b: number) => void;
  readonly __wbg_set_osukeymode_column_width: (a: number, b: number, c: number) => void;
  readonly __wbg_set_osukeymode_combo_burst_style: (a: number, b: number) => void;
  readonly __wbg_set_osukeymode_combo_position: (a: number, b: number) => void;
  readonly __wbg_set_osukeymode_hit0: (a: number, b: number, c: number) => void;
  readonly __wbg_set_osukeymode_hit100: (a: number, b: number, c: number) => void;
  readonly __wbg_set_osukeymode_hit200: (a: number, b: number, c: number) => void;
  readonly __wbg_set_osukeymode_hit300: (a: number, b: number, c: number) => void;
  readonly __wbg_set_osukeymode_hit300g: (a: number, b: number, c: number) => void;
  readonly __wbg_set_osukeymode_hit50: (a: number, b: number, c: number) => void;
  readonly __wbg_set_osukeymode_hit_position: (a: number, b: number) => void;
  readonly __wbg_set_osukeymode_judgement_line: (a: number, b: number) => void;
  readonly __wbg_set_osukeymode_key_flip_when_upside_down: (a: number, b: number) => void;
  readonly __wbg_set_osukeymode_keymode: (a: number, b: number) => void;
  readonly __wbg_set_osukeymode_keys_under_notes: (a: number, b: number) => void;
  readonly __wbg_set_osukeymode_light_frame_per_second: (a: number, b: number) => void;
  readonly __wbg_set_osukeymode_light_position: (a: number, b: number) => void;
  readonly __wbg_set_osukeymode_lighting_l: (a: number, b: number, c: number) => void;
  readonly __wbg_set_osukeymode_lighting_l_width: (a: number, b: number, c: number) => void;
  readonly __wbg_set_osukeymode_lighting_n: (a: number, b: number, c: number) => void;
  readonly __wbg_set_osukeymode_lighting_n_width: (a: number, b: number, c: number) => void;
  readonly __wbg_set_osukeymode_long_note_body_images: (a: number, b: number, c: number) => void;
  readonly __wbg_set_osukeymode_long_note_head_images: (a: number, b: number, c: number) => void;
  readonly __wbg_set_osukeymode_long_note_tail_images: (a: number, b: number, c: number) => void;
  readonly __wbg_set_osukeymode_normal_note_images: (a: number, b: number, c: number) => void;
  readonly __wbg_set_osukeymode_note_body_style: (a: number, b: number) => void;
  readonly __wbg_set_osukeymode_note_body_style_columns: (a: number, b: number, c: number) => void;
  readonly __wbg_set_osukeymode_receptor_images: (a: number, b: number, c: number) => void;
  readonly __wbg_set_osukeymode_receptor_images_down: (a: number, b: number, c: number) => void;
  readonly __wbg_set_osukeymode_score_position: (a: number, b: number) => void;
  readonly __wbg_set_osukeymode_separate_score: (a: number, b: number) => void;
  readonly __wbg_set_osukeymode_special_style: (a: number, b: number) => void;
  readonly __wbg_set_osukeymode_split_stages: (a: number, b: number) => void;
  readonly __wbg_set_osukeymode_stage_bottom: (a: number, b: number, c: number) => void;
  readonly __wbg_set_osukeymode_stage_hint: (a: number, b: number, c: number) => void;
  readonly __wbg_set_osukeymode_stage_left: (a: number, b: number, c: number) => void;
  readonly __wbg_set_osukeymode_stage_light: (a: number, b: number, c: number) => void;
  readonly __wbg_set_osukeymode_stage_right: (a: number, b: number, c: number) => void;
  readonly __wbg_set_osukeymode_stage_separation: (a: number, b: number) => void;
  readonly __wbg_set_osukeymode_upside_down: (a: number, b: number) => void;
  readonly __wbg_set_osukeymode_warning_arrow: (a: number, b: number, c: number) => void;
  readonly __wbg_set_osukeymode_width_for_note_height_scale: (a: number, b: number) => void;
  readonly __wbg_set_skinjson_info: (a: number, b: number) => void;
  readonly __wbg_set_skinjson_keymodes: (a: number, b: number, c: number) => void;
  readonly __wbg_set_songselect_display_map_background: (a: number, b: number) => void;
  readonly __wbg_set_songselect_map_background_brightness: (a: number, b: number) => void;
  readonly __wbg_set_songselect_mapset_panel_hovering_alpha: (a: number, b: number) => void;
  readonly __wbg_skinjson_free: (a: number, b: number) => void;
  readonly __wbg_songselect_free: (a: number, b: number) => void;
  readonly __wbg_texturestore_free: (a: number, b: number) => void;
  readonly binarystore_allLoaded: (a: number) => number;
  readonly binarystore_binaryHasData: (a: number, b: number, c: number) => number;
  readonly binarystore_clear: (a: number) => void;
  readonly binarystore_contains: (a: number, b: number, c: number) => number;
  readonly binarystore_copy: (a: number, b: number, c: number, d: number, e: number) => [number, number];
  readonly binarystore_extend: (a: number, b: number) => void;
  readonly binarystore_getBinaryData: (a: number, b: number, c: number) => any;
  readonly binarystore_getBinaryPath: (a: number, b: number, c: number) => [number, number];
  readonly binarystore_getLength: (a: number) => number;
  readonly binarystore_getPaths: (a: number) => any;
  readonly binarystore_insertBinary: (a: number, b: number) => void;
  readonly binarystore_isEmpty: (a: number) => number;
  readonly binarystore_loadFromArrayBuffer: (a: number, b: number, c: number, d: any) => [number, number];
  readonly binarystore_loadFromUint8Array: (a: number, b: number, c: number, d: any) => [number, number];
  readonly binarystore_loadedCount: (a: number) => number;
  readonly binarystore_makeUnique: (a: number, b: number, c: number, d: number) => [number, number];
  readonly binarystore_makeUniqueCopy: (a: number, b: number, c: number, d: number, e: number) => [number, number];
  readonly binarystore_new_wasm: () => number;
  readonly binarystore_remove: (a: number, b: number, c: number) => number;
  readonly binarystore_unloadedPaths: (a: number) => any;
  readonly keymode_fromStr: (a: number, b: number) => [number, number, number];
  readonly keymode_getTexturePaths: (a: number) => [number, number];
  readonly keymode_toStr: (a: number) => [number, number];
  readonly samplesToFiles: (a: number) => [number, number, number];
  readonly skinjson_fromStr: (a: number, b: number) => [number, number, number];
  readonly skinjson_new: () => number;
  readonly skinjson_toString: (a: number) => [number, number];
  readonly songselect_fromStr: (a: number, b: number) => [number, number, number];
  readonly songselect_toString: (a: number) => [number, number];
  readonly texturesToFiles: (a: number) => [number, number, number];
  readonly texturestore_allLoaded: (a: number) => number;
  readonly texturestore_clear: (a: number) => void;
  readonly texturestore_contains: (a: number, b: number, c: number) => number;
  readonly texturestore_copy: (a: number, b: number, c: number, d: number, e: number) => [number, number];
  readonly texturestore_extend: (a: number, b: number) => void;
  readonly texturestore_getLength: (a: number) => number;
  readonly texturestore_getPaths: (a: number) => any;
  readonly texturestore_getTexturePath: (a: number, b: number, c: number) => [number, number];
  readonly texturestore_insertTexture: (a: number, b: number) => void;
  readonly texturestore_isEmpty: (a: number) => number;
  readonly texturestore_loadFromArrayBuffer: (a: number, b: number, c: number, d: any) => [number, number];
  readonly texturestore_loadFromUint8Array: (a: number, b: number, c: number, d: any) => [number, number];
  readonly texturestore_loadedCount: (a: number) => number;
  readonly texturestore_makeUnique: (a: number, b: number, c: number, d: number) => [number, number];
  readonly texturestore_makeUniqueCopy: (a: number, b: number, c: number, d: number, e: number) => [number, number];
  readonly texturestore_new_wasm: () => number;
  readonly texturestore_remove: (a: number, b: number, c: number) => number;
  readonly texturestore_textureHasData: (a: number, b: number, c: number) => number;
  readonly texturestore_unloadedPaths: (a: number) => any;
  readonly binarystore_hasBinary: (a: number, b: number, c: number) => number;
  readonly texturestore_hasTexture: (a: number, b: number, c: number) => number;
  readonly __wbg_get_info_accent: (a: number) => [number, number];
  readonly __wbg_get_info_creator: (a: number) => [number, number];
  readonly __wbg_get_info_name: (a: number) => [number, number];
  readonly __wbg_info_free: (a: number, b: number) => void;
  readonly __wbg_set_info_accent: (a: number, b: number, c: number) => void;
  readonly __wbg_set_info_creator: (a: number, b: number, c: number) => void;
  readonly __wbg_set_info_name: (a: number, b: number, c: number) => void;
  readonly __wbg_general_free: (a: number, b: number) => void;
  readonly __wbg_get_general_allow_slider_ball_tint: (a: number) => number;
  readonly __wbg_get_general_animation_framerate: (a: number) => number;
  readonly __wbg_get_general_author: (a: number) => [number, number];
  readonly __wbg_get_general_combo_burst_random: (a: number) => number;
  readonly __wbg_get_general_cursor_centre: (a: number) => number;
  readonly __wbg_get_general_cursor_expand: (a: number) => number;
  readonly __wbg_get_general_cursor_rotate: (a: number) => number;
  readonly __wbg_get_general_cursor_trail_rotate: (a: number) => number;
  readonly __wbg_get_general_custom_combo_burst_sounds: (a: number) => [number, number];
  readonly __wbg_get_general_hit_circle_overlay_above_number: (a: number) => number;
  readonly __wbg_get_general_layered_hit_sounds: (a: number) => number;
  readonly __wbg_get_general_name: (a: number) => [number, number];
  readonly __wbg_get_general_slider_ball_flip: (a: number) => number;
  readonly __wbg_get_general_spinner_fade_playfield: (a: number) => number;
  readonly __wbg_get_general_spinner_frequency_modulate: (a: number) => number;
  readonly __wbg_get_general_spinner_no_blink: (a: number) => number;
  readonly __wbg_get_general_version: (a: number) => [number, number];
  readonly __wbg_get_keymode_keymode: (a: number) => number;
  readonly __wbg_get_mainmenu_audio_visualizer_opacity: (a: number) => number;
  readonly __wbg_get_mainmenu_navigation_button_hovered_alpha: (a: number) => number;
  readonly __wbg_get_mainmenu_note_visualizer_opacity: (a: number) => number;
  readonly __wbg_get_quageneral_center_cursor: (a: number) => number;
  readonly __wbg_get_quageneral_use_skin_backgrounds: (a: number) => number;
  readonly __wbg_get_quakeymode_accuracy_display_pos_x: (a: number) => number;
  readonly __wbg_get_quakeymode_accuracy_display_pos_y: (a: number) => number;
  readonly __wbg_get_quakeymode_accuracy_display_scale: (a: number) => number;
  readonly __wbg_get_quakeymode_battle_royale_alert_pos_x: (a: number) => number;
  readonly __wbg_get_quakeymode_battle_royale_alert_pos_y: (a: number) => number;
  readonly __wbg_get_quakeymode_battle_royale_alert_scale: (a: number) => number;
  readonly __wbg_get_quakeymode_battle_royale_eliminated_pos_x: (a: number) => number;
  readonly __wbg_get_quakeymode_battle_royale_eliminated_pos_y: (a: number) => number;
  readonly __wbg_get_quakeymode_bg_mask_alpha: (a: number) => number;
  readonly __wbg_get_quakeymode_bg_mask_padding: (a: number) => number;
  readonly __wbg_get_quakeymode_color_objects_by_snap_distance: (a: number) => number;
  readonly __wbg_get_quakeymode_column_alignment: (a: number) => number;
  readonly __wbg_get_quakeymode_column_lighting_offset_y: (a: number) => number;
  readonly __wbg_get_quakeymode_column_lighting_scale: (a: number) => number;
  readonly __wbg_get_quakeymode_column_size: (a: number) => number;
  readonly __wbg_get_quakeymode_combo_display_bump_time: (a: number) => number;
  readonly __wbg_get_quakeymode_combo_display_bump_y: (a: number) => number;
  readonly __wbg_get_quakeymode_combo_display_scale: (a: number) => number;
  readonly __wbg_get_quakeymode_combo_pos_x: (a: number) => number;
  readonly __wbg_get_quakeymode_combo_pos_y: (a: number) => number;
  readonly __wbg_get_quakeymode_coop_playfield_padding: (a: number) => number;
  readonly __wbg_get_quakeymode_default_skin: (a: number) => number;
  readonly __wbg_get_quakeymode_draw_long_note_end: (a: number) => number;
  readonly __wbg_get_quakeymode_flip_note_end_images_on_upscroll: (a: number) => number;
  readonly __wbg_get_quakeymode_flip_note_images_on_upscroll: (a: number) => number;
  readonly __wbg_get_quakeymode_health_bar_keys_alignment: (a: number) => number;
  readonly __wbg_get_quakeymode_health_bar_pos_offset_x: (a: number) => number;
  readonly __wbg_get_quakeymode_health_bar_pos_offset_y: (a: number) => number;
  readonly __wbg_get_quakeymode_health_bar_scale: (a: number) => number;
  readonly __wbg_get_quakeymode_health_bar_type: (a: number) => number;
  readonly __wbg_get_quakeymode_hit_bubble_border_padding: (a: number) => number;
  readonly __wbg_get_quakeymode_hit_bubble_padding: (a: number) => number;
  readonly __wbg_get_quakeymode_hit_bubble_scale: (a: number) => number;
  readonly __wbg_get_quakeymode_hit_bubbles_alignment: (a: number) => number;
  readonly __wbg_get_quakeymode_hit_bubbles_pos_x: (a: number) => number;
  readonly __wbg_get_quakeymode_hit_bubbles_pos_y: (a: number) => number;
  readonly __wbg_get_quakeymode_hit_bubbles_scale: (a: number) => number;
  readonly __wbg_get_quakeymode_hit_bubbles_type: (a: number) => number;
  readonly __wbg_get_quakeymode_hit_error_alpha: (a: number) => number;
  readonly __wbg_get_quakeymode_hit_error_chevron_size: (a: number) => number;
  readonly __wbg_get_quakeymode_hit_error_height: (a: number) => number;
  readonly __wbg_get_quakeymode_hit_error_pos_x: (a: number) => number;
  readonly __wbg_get_quakeymode_hit_error_pos_y: (a: number) => number;
  readonly __wbg_get_quakeymode_hit_lighting_column_rotation: (a: number) => number;
  readonly __wbg_get_quakeymode_hit_lighting_fps: (a: number) => number;
  readonly __wbg_get_quakeymode_hit_lighting_scale: (a: number) => number;
  readonly __wbg_get_quakeymode_hit_lighting_x: (a: number) => number;
  readonly __wbg_get_quakeymode_hit_lighting_y: (a: number) => number;
  readonly __wbg_get_quakeymode_hit_pos_offset_y: (a: number) => number;
  readonly __wbg_get_quakeymode_hold_lighting_column_rotation: (a: number) => number;
  readonly __wbg_get_quakeymode_hold_lighting_fps: (a: number) => number;
  readonly __wbg_get_quakeymode_hold_lighting_scale: (a: number) => number;
  readonly __wbg_get_quakeymode_judgement_burst_pos_y: (a: number) => number;
  readonly __wbg_get_quakeymode_judgement_counter_alpha: (a: number) => number;
  readonly __wbg_get_quakeymode_judgement_counter_fade_to_alpha: (a: number) => number;
  readonly __wbg_get_quakeymode_judgement_counter_horizontal: (a: number) => number;
  readonly __wbg_get_quakeymode_judgement_counter_padding: (a: number) => number;
  readonly __wbg_get_quakeymode_judgement_counter_pos_x: (a: number) => number;
  readonly __wbg_get_quakeymode_judgement_counter_pos_y: (a: number) => number;
  readonly __wbg_get_quakeymode_judgement_counter_size: (a: number) => number;
  readonly __wbg_get_quakeymode_judgement_hit_burst_bump_time: (a: number) => number;
  readonly __wbg_get_quakeymode_judgement_hit_burst_bump_y: (a: number) => number;
  readonly __wbg_get_quakeymode_judgement_hit_burst_fps: (a: number) => number;
  readonly __wbg_get_quakeymode_judgement_hit_burst_scale: (a: number) => number;
  readonly __wbg_get_quakeymode_keymode: (a: number) => number;
  readonly __wbg_get_quakeymode_kps_display_pos_x: (a: number) => number;
  readonly __wbg_get_quakeymode_kps_display_pos_y: (a: number) => number;
  readonly __wbg_get_quakeymode_kps_display_scale: (a: number) => number;
  readonly __wbg_get_quakeymode_mini_song_bar_display_height: (a: number) => number;
  readonly __wbg_get_quakeymode_mini_song_bar_display_pos_x: (a: number) => number;
  readonly __wbg_get_quakeymode_mini_song_bar_display_pos_y: (a: number) => number;
  readonly __wbg_get_quakeymode_mini_song_bar_display_width_factor: (a: number) => number;
  readonly __wbg_get_quakeymode_note_padding: (a: number) => number;
  readonly __wbg_get_quakeymode_rating_display_pos_x: (a: number) => number;
  readonly __wbg_get_quakeymode_rating_display_pos_y: (a: number) => number;
  readonly __wbg_get_quakeymode_rating_display_scale: (a: number) => number;
  readonly __wbg_get_quakeymode_receptor_pos_offset_y: (a: number) => number;
  readonly __wbg_get_quakeymode_receptors_over_hit_objects: (a: number) => number;
  readonly __wbg_get_quakeymode_rotate_hit_objects_by_column: (a: number) => number;
  readonly __wbg_get_quakeymode_score_display_pos_x: (a: number) => number;
  readonly __wbg_get_quakeymode_score_display_pos_y: (a: number) => number;
  readonly __wbg_get_quakeymode_score_display_scale: (a: number) => number;
  readonly __wbg_get_quakeymode_show_mini_song_bar: (a: number) => number;
  readonly __wbg_get_quakeymode_song_time_progress_position_at_top: (a: number) => number;
  readonly __wbg_get_quakeymode_song_time_progress_scale: (a: number) => number;
  readonly __wbg_get_quakeymode_stage_receptor_padding: (a: number) => number;
  readonly __wbg_get_quakeymode_use_fallback: (a: number) => number;
  readonly __wbg_get_quakeymode_use_hit_object_sheet: (a: number) => number;
  readonly __wbg_get_quakeymode_use_judgement_color_for_numbers: (a: number) => number;
  readonly __wbg_get_quakeymode_width_for_note_height_scale: (a: number) => number;
  readonly __wbg_get_results_results_background_filter_alpha: (a: number) => number;
  readonly __wbg_get_results_results_background_type: (a: number) => number;
  readonly __wbg_keymode_free: (a: number, b: number) => void;
  readonly __wbg_mainmenu_free: (a: number, b: number) => void;
  readonly __wbg_menuborder_free: (a: number, b: number) => void;
  readonly __wbg_quageneral_free: (a: number, b: number) => void;
  readonly __wbg_quakeymode_free: (a: number, b: number) => void;
  readonly __wbg_results_free: (a: number, b: number) => void;
  readonly __wbg_set_general_allow_slider_ball_tint: (a: number, b: number) => void;
  readonly __wbg_set_general_animation_framerate: (a: number, b: number) => void;
  readonly __wbg_set_general_author: (a: number, b: number, c: number) => void;
  readonly __wbg_set_general_combo_burst_random: (a: number, b: number) => void;
  readonly __wbg_set_general_cursor_centre: (a: number, b: number) => void;
  readonly __wbg_set_general_cursor_expand: (a: number, b: number) => void;
  readonly __wbg_set_general_cursor_rotate: (a: number, b: number) => void;
  readonly __wbg_set_general_cursor_trail_rotate: (a: number, b: number) => void;
  readonly __wbg_set_general_custom_combo_burst_sounds: (a: number, b: number, c: number) => void;
  readonly __wbg_set_general_hit_circle_overlay_above_number: (a: number, b: number) => void;
  readonly __wbg_set_general_layered_hit_sounds: (a: number, b: number) => void;
  readonly __wbg_set_general_name: (a: number, b: number, c: number) => void;
  readonly __wbg_set_general_slider_ball_flip: (a: number, b: number) => void;
  readonly __wbg_set_general_spinner_fade_playfield: (a: number, b: number) => void;
  readonly __wbg_set_general_spinner_frequency_modulate: (a: number, b: number) => void;
  readonly __wbg_set_general_spinner_no_blink: (a: number, b: number) => void;
  readonly __wbg_set_general_version: (a: number, b: number, c: number) => void;
  readonly __wbg_set_keymode_keymode: (a: number, b: number) => void;
  readonly __wbg_set_mainmenu_audio_visualizer_opacity: (a: number, b: number) => void;
  readonly __wbg_set_mainmenu_navigation_button_hovered_alpha: (a: number, b: number) => void;
  readonly __wbg_set_mainmenu_note_visualizer_opacity: (a: number, b: number) => void;
  readonly __wbg_set_quageneral_center_cursor: (a: number, b: number) => void;
  readonly __wbg_set_quageneral_use_skin_backgrounds: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_accuracy_display_pos_x: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_accuracy_display_pos_y: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_accuracy_display_scale: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_battle_royale_alert_pos_x: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_battle_royale_alert_pos_y: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_battle_royale_alert_scale: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_battle_royale_eliminated_pos_x: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_battle_royale_eliminated_pos_y: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_bg_mask_alpha: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_bg_mask_padding: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_color_objects_by_snap_distance: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_column_alignment: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_column_lighting_offset_y: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_column_lighting_scale: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_column_size: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_combo_display_bump_time: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_combo_display_bump_y: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_combo_display_scale: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_combo_pos_x: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_combo_pos_y: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_coop_playfield_padding: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_default_skin: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_draw_long_note_end: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_flip_note_end_images_on_upscroll: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_flip_note_images_on_upscroll: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_health_bar_keys_alignment: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_health_bar_pos_offset_x: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_health_bar_pos_offset_y: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_health_bar_scale: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_health_bar_type: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_hit_bubble_border_padding: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_hit_bubble_padding: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_hit_bubble_scale: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_hit_bubbles_alignment: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_hit_bubbles_pos_x: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_hit_bubbles_pos_y: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_hit_bubbles_scale: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_hit_bubbles_type: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_hit_error_alpha: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_hit_error_chevron_size: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_hit_error_height: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_hit_error_pos_x: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_hit_error_pos_y: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_hit_lighting_column_rotation: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_hit_lighting_fps: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_hit_lighting_scale: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_hit_lighting_x: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_hit_lighting_y: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_hit_pos_offset_y: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_hold_lighting_column_rotation: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_hold_lighting_fps: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_hold_lighting_scale: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_judgement_burst_pos_y: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_judgement_counter_alpha: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_judgement_counter_fade_to_alpha: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_judgement_counter_horizontal: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_judgement_counter_padding: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_judgement_counter_pos_x: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_judgement_counter_pos_y: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_judgement_counter_size: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_judgement_hit_burst_bump_time: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_judgement_hit_burst_bump_y: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_judgement_hit_burst_fps: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_judgement_hit_burst_scale: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_keymode: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_kps_display_pos_x: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_kps_display_pos_y: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_kps_display_scale: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_mini_song_bar_display_height: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_mini_song_bar_display_pos_x: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_mini_song_bar_display_pos_y: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_mini_song_bar_display_width_factor: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_note_padding: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_rating_display_pos_x: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_rating_display_pos_y: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_rating_display_scale: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_receptor_pos_offset_y: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_receptors_over_hit_objects: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_rotate_hit_objects_by_column: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_score_display_pos_x: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_score_display_pos_y: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_score_display_scale: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_show_mini_song_bar: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_song_time_progress_position_at_top: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_song_time_progress_scale: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_stage_receptor_padding: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_use_fallback: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_use_hit_object_sheet: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_use_judgement_color_for_numbers: (a: number, b: number) => void;
  readonly __wbg_set_quakeymode_width_for_note_height_scale: (a: number, b: number) => void;
  readonly __wbg_set_results_results_background_filter_alpha: (a: number, b: number) => void;
  readonly __wbg_set_results_results_background_type: (a: number, b: number) => void;
  readonly general_fromStr: (a: number, b: number) => [number, number, number];
  readonly general_toString: (a: number) => [number, number];
  readonly mainmenu_fromStr: (a: number, b: number) => [number, number, number];
  readonly mainmenu_toString: (a: number) => [number, number];
  readonly menuborder_fromStr: (a: number, b: number) => [number, number, number];
  readonly menuborder_toString: (a: number) => [number, number];
  readonly quageneral_fromStr: (a: number, b: number) => [number, number, number];
  readonly quageneral_toString: (a: number) => [number, number];
  readonly quakeymode_fromStr: (a: number, b: number) => [number, number, number];
  readonly quakeymode_toStr: (a: number) => [number, number];
  readonly results_fromStr: (a: number, b: number) => [number, number, number];
  readonly results_toString: (a: number) => [number, number];
  readonly __wbg_set_quageneral_author: (a: number, b: number, c: number) => void;
  readonly __wbg_set_quageneral_name: (a: number, b: number, c: number) => void;
  readonly __wbg_set_quageneral_version: (a: number, b: number, c: number) => void;
  readonly __wbg_get_quageneral_author: (a: number) => [number, number];
  readonly __wbg_get_quageneral_name: (a: number) => [number, number];
  readonly __wbg_get_quageneral_version: (a: number) => [number, number];
  readonly allSamplesFromFiles: (a: any) => [number, number, number];
  readonly allTexturesFromFiles: (a: any) => [number, number, number];
  readonly fluXisSkinFromFiles: (a: any) => [number, number, number];
  readonly osuSkinFromFiles: (a: any) => [number, number, number];
  readonly quaverIniToString: (a: number) => [number, number];
  readonly quaverSkinFromFiles: (a: any) => [number, number, number];
  readonly quaverSkinToFiles: (a: number) => [number, number, number];
  readonly samplesFromFiles: (a: any, b: any) => [number, number, number];
  readonly texturesFromFiles: (a: any, b: any) => [number, number, number];
  readonly __wbg_fluxiskeymode_free: (a: number, b: number) => void;
  readonly __wbg_fluxislayout_free: (a: number, b: number) => void;
  readonly __wbg_get_fluxiskeymode_colors: (a: number) => [number, number];
  readonly __wbg_get_fluxiskeymode_column_width: (a: number) => number;
  readonly __wbg_get_fluxiskeymode_hit_position: (a: number) => number;
  readonly __wbg_get_fluxiskeymode_keymode: (a: number) => number;
  readonly __wbg_get_fluxiskeymode_receptor_offset: (a: number) => number;
  readonly __wbg_get_fluxiskeymode_receptors_first: (a: number) => number;
  readonly __wbg_get_fluxiskeymode_tint_lns: (a: number) => number;
  readonly __wbg_get_fluxiskeymode_tint_notes: (a: number) => number;
  readonly __wbg_get_fluxiskeymode_tint_receptors: (a: number) => number;
  readonly __wbg_get_fluxislayout_author: (a: number) => [number, number];
  readonly __wbg_get_fluxislayout_name: (a: number) => [number, number];
  readonly __wbg_get_texture_path: (a: number) => [number, number];
  readonly __wbg_rawbytes_free: (a: number, b: number) => void;
  readonly __wbg_set_fluxiskeymode_colors: (a: number, b: number, c: number) => void;
  readonly __wbg_set_fluxiskeymode_column_width: (a: number, b: number) => void;
  readonly __wbg_set_fluxiskeymode_hit_position: (a: number, b: number) => void;
  readonly __wbg_set_fluxiskeymode_keymode: (a: number, b: number) => void;
  readonly __wbg_set_fluxiskeymode_receptor_offset: (a: number, b: number) => void;
  readonly __wbg_set_fluxiskeymode_receptors_first: (a: number, b: number) => void;
  readonly __wbg_set_fluxiskeymode_tint_lns: (a: number, b: number) => void;
  readonly __wbg_set_fluxiskeymode_tint_notes: (a: number, b: number) => void;
  readonly __wbg_set_fluxiskeymode_tint_receptors: (a: number, b: number) => void;
  readonly __wbg_set_fluxislayout_author: (a: number, b: number, c: number) => void;
  readonly __wbg_set_fluxislayout_name: (a: number, b: number, c: number) => void;
  readonly __wbg_set_texture_path: (a: number, b: number, c: number) => void;
  readonly __wbg_texture_free: (a: number, b: number) => void;
  readonly rawbytes_fromArrayBuffer: (a: number, b: number, c: any) => [number, number, number];
  readonly rawbytes_fromArrayBufferUnloaded: (a: number, b: number, c: any) => [number, number, number];
  readonly rawbytes_fromBytes: (a: number, b: number, c: number, d: number) => number;
  readonly rawbytes_fromUint8Array: (a: number, b: number, c: any) => [number, number, number];
  readonly rawbytes_fromUint8ArrayUnloaded: (a: number, b: number, c: any) => [number, number, number];
  readonly rawbytes_getData: (a: number) => any;
  readonly rawbytes_getHash: (a: number) => [number, bigint];
  readonly rawbytes_getPath: (a: number) => [number, number];
  readonly rawbytes_hasData: (a: number) => number;
  readonly rawbytes_isEmpty: (a: number) => number;
  readonly rawbytes_isLoaded: (a: number) => number;
  readonly rawbytes_isUnloaded: (a: number) => number;
  readonly rawbytes_load: (a: number) => [number, number];
  readonly rawbytes_new: (a: number, b: number) => number;
  readonly rawbytes_unload: (a: number) => [number, number];
  readonly texture_fromArrayBuffer: (a: number, b: number, c: any) => [number, number, number];
  readonly texture_fromArrayBufferUnloaded: (a: number, b: number, c: any) => [number, number, number];
  readonly texture_fromBlank: (a: number, b: number) => number;
  readonly texture_fromUint8Array: (a: number, b: number, c: any) => [number, number, number];
  readonly texture_fromUint8ArrayUnloaded: (a: number, b: number, c: any) => [number, number, number];
  readonly texture_getPath: (a: number) => [number, number];
  readonly texture_hasData: (a: number) => number;
  readonly texture_isEmpty: (a: number) => number;
  readonly texture_isLoaded: (a: number) => number;
  readonly texture_isUnloaded: (a: number) => number;
  readonly texture_load: (a: number) => [number, number];
  readonly texture_new: (a: number, b: number) => number;
  readonly texture_unload: (a: number) => [number, number];
  readonly texture_getHash: (a: number) => [number, bigint];
  readonly __wbg_set_rawbytes_path: (a: number, b: number, c: number) => void;
  readonly __wbg_get_rawbytes_path: (a: number) => [number, number];
  readonly __wbg_fluxisskin_free: (a: number, b: number) => void;
  readonly __wbg_fluxisskinwithlayout_free: (a: number, b: number) => void;
  readonly __wbg_genericmaniaskin_free: (a: number, b: number) => void;
  readonly __wbg_get_fluxisskin_samples: (a: number) => number;
  readonly __wbg_get_fluxisskin_skin_json: (a: number) => number;
  readonly __wbg_get_fluxisskin_textures: (a: number) => number;
  readonly __wbg_get_fluxisskinwithlayout_layout: (a: number) => number;
  readonly __wbg_get_fluxisskinwithlayout_skin: (a: number) => number;
  readonly __wbg_get_genericmaniaskin_samples: (a: number) => number;
  readonly __wbg_get_genericmaniaskin_textures: (a: number) => number;
  readonly __wbg_get_osuskin_skin_ini: (a: number) => number;
  readonly __wbg_get_osuskinini_general: (a: number) => number;
  readonly __wbg_get_osuskinini_keymodes: (a: number) => [number, number];
  readonly __wbg_get_quaskin_skin_ini: (a: number) => number;
  readonly __wbg_get_quaskinini_general: (a: number) => number;
  readonly __wbg_get_quaskinini_keymodes: (a: number) => [number, number];
  readonly __wbg_get_quaskinini_main_menu: (a: number) => number;
  readonly __wbg_get_quaskinini_menu_border: (a: number) => number;
  readonly __wbg_get_quaskinini_results: (a: number) => number;
  readonly __wbg_get_quaskinini_shared_keymode: (a: number) => number;
  readonly __wbg_get_quaskinini_song_select: (a: number) => number;
  readonly __wbg_osuskin_free: (a: number, b: number) => void;
  readonly __wbg_osuskinini_free: (a: number, b: number) => void;
  readonly __wbg_quaskin_free: (a: number, b: number) => void;
  readonly __wbg_quaskinini_free: (a: number, b: number) => void;
  readonly __wbg_set_fluxisskin_samples: (a: number, b: number) => void;
  readonly __wbg_set_fluxisskin_skin_json: (a: number, b: number) => void;
  readonly __wbg_set_fluxisskin_textures: (a: number, b: number) => void;
  readonly __wbg_set_fluxisskinwithlayout_layout: (a: number, b: number) => void;
  readonly __wbg_set_fluxisskinwithlayout_skin: (a: number, b: number) => void;
  readonly __wbg_set_genericmaniaskin_samples: (a: number, b: number) => void;
  readonly __wbg_set_genericmaniaskin_textures: (a: number, b: number) => void;
  readonly __wbg_set_osuskin_skin_ini: (a: number, b: number) => void;
  readonly __wbg_set_osuskinini_general: (a: number, b: number) => void;
  readonly __wbg_set_osuskinini_keymodes: (a: number, b: number, c: number) => void;
  readonly __wbg_set_quaskin_skin_ini: (a: number, b: number) => void;
  readonly __wbg_set_quaskinini_general: (a: number, b: number) => void;
  readonly __wbg_set_quaskinini_keymodes: (a: number, b: number, c: number) => void;
  readonly __wbg_set_quaskinini_main_menu: (a: number, b: number) => void;
  readonly __wbg_set_quaskinini_menu_border: (a: number, b: number) => void;
  readonly __wbg_set_quaskinini_results: (a: number, b: number) => void;
  readonly __wbg_set_quaskinini_shared_keymode: (a: number, b: number) => void;
  readonly __wbg_set_quaskinini_song_select: (a: number, b: number) => void;
  readonly fluXisSkinToFiles: (a: number) => [number, number, number];
  readonly fluxisJsonToString: (a: number) => [number, number];
  readonly fluxisLayoutToString: (a: number) => [number, number, number, number];
  readonly fluxisskin_fromGenericMania: (a: number) => [number, number, number];
  readonly fluxisskin_getKeymode: (a: number, b: number) => number;
  readonly fluxisskin_getRequiredSamplePaths: (a: number) => [number, number];
  readonly fluxisskin_getRequiredTexturePaths: (a: number) => [number, number];
  readonly fluxisskin_new: (a: number, b: number, c: number) => number;
  readonly fluxisskin_toGenericMania: (a: number) => [number, number, number];
  readonly fluxisskin_toGenericManiaWithLayout: (a: number, b: number) => [number, number, number];
  readonly genericmaniaskin_fromGenericMania: (a: number) => [number, number, number];
  readonly genericmaniaskin_getKeymode: (a: number, b: number) => number;
  readonly genericmaniaskin_getRequiredSamplePaths: (a: number) => [number, number];
  readonly genericmaniaskin_getRequiredTexturePaths: (a: number) => [number, number];
  readonly osuIniToString: (a: number) => [number, number];
  readonly osuSkinToFiles: (a: number) => [number, number, number];
  readonly osuskin_fromGenericMania: (a: number) => [number, number, number];
  readonly osuskin_getKeymode: (a: number, b: number) => number;
  readonly osuskin_getRequiredSamplePaths: (a: number) => [number, number];
  readonly osuskin_getRequiredTexturePaths: (a: number) => [number, number];
  readonly osuskin_new: (a: number, b: number, c: number) => number;
  readonly osuskin_toGenericMania: (a: number) => [number, number, number];
  readonly osuskinini_fromStr: (a: number, b: number) => [number, number, number];
  readonly osuskinini_getKeymode: (a: number, b: number) => number;
  readonly osuskinini_getRequiredSamplePaths: (a: number) => [number, number];
  readonly osuskinini_getRequiredTexturePaths: (a: number) => [number, number];
  readonly osuskinini_new: () => number;
  readonly quaskin_fromGenericMania: (a: number) => [number, number, number];
  readonly quaskin_getKeymode: (a: number, b: number) => number;
  readonly quaskin_getRequiredSamplePaths: (a: number) => [number, number];
  readonly quaskin_getRequiredTexturePaths: (a: number) => [number, number];
  readonly quaskin_new: (a: number, b: number, c: number) => number;
  readonly quaskin_toGenericMania: (a: number) => [number, number, number];
  readonly quaskinini_fromStr: (a: number, b: number) => [number, number, number];
  readonly quaskinini_getKeymode: (a: number, b: number) => number;
  readonly quaskinini_new: () => number;
  readonly quaskinini_toString: (a: number) => [number, number];
  readonly __wbg_get_osuskin_samples: (a: number) => number;
  readonly __wbg_get_quaskin_samples: (a: number) => number;
  readonly __wbg_get_osuskin_textures: (a: number) => number;
  readonly __wbg_get_quaskin_textures: (a: number) => number;
  readonly __wbg_set_osuskin_textures: (a: number, b: number) => void;
  readonly __wbg_set_quaskin_textures: (a: number, b: number) => void;
  readonly osuskinini_toString: (a: number) => [number, number];
  readonly __wbg_set_osuskin_samples: (a: number, b: number) => void;
  readonly __wbg_set_quaskin_samples: (a: number, b: number) => void;
  readonly genericmaniaskin_toGenericMania: (a: number) => [number, number, number];
  readonly __wbg_wbg_rayon_poolbuilder_free: (a: number, b: number) => void;
  readonly initThreadPool: (a: number) => any;
  readonly wbg_rayon_poolbuilder_build: (a: number) => void;
  readonly wbg_rayon_poolbuilder_mainJS: (a: number) => any;
  readonly wbg_rayon_poolbuilder_numThreads: (a: number) => number;
  readonly wbg_rayon_poolbuilder_receiver: (a: number) => number;
  readonly wbg_rayon_start_worker: (a: number) => void;
  readonly wasm_bindgen_aaa77acde99fbdb___convert__closures_____invoke___wasm_bindgen_aaa77acde99fbdb___JsValue__wasm_bindgen_aaa77acde99fbdb___JsValue_____: (a: number, b: number, c: any, d: any) => void;
  readonly memory: WebAssembly.Memory;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_externrefs: WebAssembly.Table;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __externref_drop_slice: (a: number, b: number) => void;
  readonly __wbindgen_thread_destroy: (a?: number, b?: number, c?: number) => void;
  readonly __wbindgen_start: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput, memory?: WebAssembly.Memory, thread_stack_size?: number }} module - Passing `SyncInitInput` directly is deprecated.
* @param {WebAssembly.Memory} memory - Deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput, memory?: WebAssembly.Memory, thread_stack_size?: number } | SyncInitInput, memory?: WebAssembly.Memory): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput>, memory?: WebAssembly.Memory, thread_stack_size?: number }} module_or_path - Passing `InitInput` directly is deprecated.
* @param {WebAssembly.Memory} memory - Deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput>, memory?: WebAssembly.Memory, thread_stack_size?: number } | InitInput | Promise<InitInput>, memory?: WebAssembly.Memory): Promise<InitOutput>;
