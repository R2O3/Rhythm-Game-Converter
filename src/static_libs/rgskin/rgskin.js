let wasm;

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_externrefs.set(idx, obj);
    return idx;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_externrefs.get(mem.getUint32(i, true)));
    }
    wasm.__externref_drop_slice(ptr, len);
    return result;
}

function getArrayU16FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint16ArrayMemory0().subarray(ptr / 2, ptr / 2 + len);
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let cachedFloat32ArrayMemory0 = null;
function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(ptr, len);
}

let cachedUint16ArrayMemory0 = null;
function getUint16ArrayMemory0() {
    if (cachedUint16ArrayMemory0 === null || cachedUint16ArrayMemory0.byteLength === 0) {
        cachedUint16ArrayMemory0 = new Uint16Array(wasm.memory.buffer);
    }
    return cachedUint16ArrayMemory0;
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function passArray16ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 2, 2) >>> 0;
    getUint16ArrayMemory0().set(arg, ptr / 2);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayF32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getFloat32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    for (let i = 0; i < array.length; i++) {
        const add = addToExternrefTable0(array[i]);
        getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    }
}

let WASM_VECTOR_LEN = 0;

function wasm_bindgen__convert__closures_____invoke__h9a6e61dda56dfb1d(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures_____invoke__h9a6e61dda56dfb1d(arg0, arg1, arg2, arg3);
}

const BinaryStoreFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_binarystore_free(ptr >>> 0, 1));

const FluXisKeymodeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fluxiskeymode_free(ptr >>> 0, 1));

const FluXisLayoutFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fluxislayout_free(ptr >>> 0, 1));

const FluXisSkinFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fluxisskin_free(ptr >>> 0, 1));

const FluXisSkinWithLayoutFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fluxisskinwithlayout_free(ptr >>> 0, 1));

const GeneralFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_general_free(ptr >>> 0, 1));

const GenericManiaSkinFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_genericmaniaskin_free(ptr >>> 0, 1));

const InfoFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_info_free(ptr >>> 0, 1));

const KeymodeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_keymode_free(ptr >>> 0, 1));

const OsuKeymodeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_osukeymode_free(ptr >>> 0, 1));

const OsuSkinFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_osuskin_free(ptr >>> 0, 1));

const OsuSkinIniFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_osuskinini_free(ptr >>> 0, 1));

const RawBytesFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rawbytes_free(ptr >>> 0, 1));

const SkinJsonFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_skinjson_free(ptr >>> 0, 1));

const TextureFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_texture_free(ptr >>> 0, 1));

const TextureStoreFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_texturestore_free(ptr >>> 0, 1));

export class BinaryStore {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(BinaryStore.prototype);
        obj.__wbg_ptr = ptr;
        BinaryStoreFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BinaryStoreFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_binarystore_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.binarystore_new_wasm();
        this.__wbg_ptr = ret >>> 0;
        BinaryStoreFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {RawBytes} binary
     */
    insertBinary(binary) {
        _assertClass(binary, RawBytes);
        var ptr0 = binary.__destroy_into_raw();
        wasm.binarystore_insertBinary(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string} new_path
     * @param {RawBytes} binary
     * @returns {string}
     */
    makeUnique(new_path, binary) {
        let deferred3_0;
        let deferred3_1;
        try {
            const ptr0 = passStringToWasm0(new_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(binary, RawBytes);
            var ptr1 = binary.__destroy_into_raw();
            const ret = wasm.binarystore_makeUnique(this.__wbg_ptr, ptr0, len0, ptr1);
            deferred3_0 = ret[0];
            deferred3_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    }
    /**
     * @param {string} path
     * @param {ArrayBuffer} buffer
     */
    loadFromArrayBuffer(path, buffer) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.binarystore_loadFromArrayBuffer(this.__wbg_ptr, ptr0, len0, buffer);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {string} path
     * @param {Uint8Array} array
     */
    loadFromUint8Array(path, array) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.binarystore_loadFromUint8Array(this.__wbg_ptr, ptr0, len0, array);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @returns {boolean}
     */
    allLoaded() {
        const ret = wasm.binarystore_allLoaded(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    loadedCount() {
        const ret = wasm.binarystore_loadedCount(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {Array<any>}
     */
    unloadedPaths() {
        const ret = wasm.binarystore_unloadedPaths(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {string} path
     * @returns {boolean}
     */
    hasBinary(path) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.binarystore_contains(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {string} path
     * @returns {string | undefined}
     */
    getBinaryPath(path) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.binarystore_getBinaryPath(this.__wbg_ptr, ptr0, len0);
        let v2;
        if (ret[0] !== 0) {
            v2 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v2;
    }
    /**
     * @param {string} path
     * @returns {boolean}
     */
    binaryHasData(path) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.binarystore_binaryHasData(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {string} path
     * @returns {Uint8Array | undefined}
     */
    getBinaryData(path) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.binarystore_getBinaryData(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * @param {string} path
     * @returns {boolean}
     */
    contains(path) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.binarystore_contains(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {string} path
     * @returns {boolean}
     */
    remove(path) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.binarystore_remove(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    getLength() {
        const ret = wasm.binarystore_getLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.binarystore_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {Array<any>}
     */
    getPaths() {
        const ret = wasm.binarystore_getPaths(this.__wbg_ptr);
        return ret;
    }
    clear() {
        wasm.binarystore_clear(this.__wbg_ptr);
    }
    /**
     * @param {string} original_path
     * @param {string} new_path
     * @returns {string | undefined}
     */
    copy(original_path, new_path) {
        const ptr0 = passStringToWasm0(original_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(new_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.binarystore_copy(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        let v3;
        if (ret[0] !== 0) {
            v3 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v3;
    }
    /**
     * @param {string} original_path
     * @param {string} new_base_path
     * @returns {string | undefined}
     */
    makeUniqueCopy(original_path, new_base_path) {
        const ptr0 = passStringToWasm0(original_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(new_base_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.binarystore_makeUniqueCopy(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        let v3;
        if (ret[0] !== 0) {
            v3 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v3;
    }
    /**
     * @param {BinaryStore} other
     */
    extend(other) {
        _assertClass(other, BinaryStore);
        wasm.binarystore_extend(this.__wbg_ptr, other.__wbg_ptr);
    }
}
if (Symbol.dispose) BinaryStore.prototype[Symbol.dispose] = BinaryStore.prototype.free;

export class FluXisKeymode {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FluXisKeymode.prototype);
        obj.__wbg_ptr = ptr;
        FluXisKeymodeFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    static __unwrap(jsValue) {
        if (!(jsValue instanceof FluXisKeymode)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FluXisKeymodeFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fluxiskeymode_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get keymode() {
        const ret = wasm.__wbg_get_fluxiskeymode_keymode(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set keymode(arg0) {
        wasm.__wbg_set_fluxiskeymode_keymode(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get column_width() {
        const ret = wasm.__wbg_get_fluxiskeymode_column_width(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set column_width(arg0) {
        wasm.__wbg_set_fluxiskeymode_column_width(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get hit_position() {
        const ret = wasm.__wbg_get_fluxiskeymode_hit_position(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set hit_position(arg0) {
        wasm.__wbg_set_fluxiskeymode_hit_position(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {boolean}
     */
    get tint_notes() {
        const ret = wasm.__wbg_get_fluxiskeymode_tint_notes(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set tint_notes(arg0) {
        wasm.__wbg_set_fluxiskeymode_tint_notes(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {boolean}
     */
    get tint_lns() {
        const ret = wasm.__wbg_get_fluxiskeymode_tint_lns(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set tint_lns(arg0) {
        wasm.__wbg_set_fluxiskeymode_tint_lns(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {boolean}
     */
    get tint_receptors() {
        const ret = wasm.__wbg_get_fluxiskeymode_tint_receptors(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set tint_receptors(arg0) {
        wasm.__wbg_set_fluxiskeymode_tint_receptors(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {string[]}
     */
    get colors() {
        const ret = wasm.__wbg_get_fluxiskeymode_colors(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {string[]} arg0
     */
    set colors(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_fluxiskeymode_colors(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {boolean}
     */
    get receptors_first() {
        const ret = wasm.__wbg_get_fluxiskeymode_receptors_first(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set receptors_first(arg0) {
        wasm.__wbg_set_fluxiskeymode_receptors_first(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get receptor_offset() {
        const ret = wasm.__wbg_get_fluxiskeymode_receptor_offset(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set receptor_offset(arg0) {
        wasm.__wbg_set_fluxiskeymode_receptor_offset(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) FluXisKeymode.prototype[Symbol.dispose] = FluXisKeymode.prototype.free;

export class FluXisLayout {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FluXisLayout.prototype);
        obj.__wbg_ptr = ptr;
        FluXisLayoutFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FluXisLayoutFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fluxislayout_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get name() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_fluxislayout_name(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set name(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_fluxislayout_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get author() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_fluxislayout_author(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set author(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_fluxislayout_author(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) FluXisLayout.prototype[Symbol.dispose] = FluXisLayout.prototype.free;

export class FluXisSkin {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FluXisSkin.prototype);
        obj.__wbg_ptr = ptr;
        FluXisSkinFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FluXisSkinFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fluxisskin_free(ptr, 0);
    }
    /**
     * @returns {SkinJson}
     */
    get skin_json() {
        const ret = wasm.__wbg_get_fluxisskin_skin_json(this.__wbg_ptr);
        return SkinJson.__wrap(ret);
    }
    /**
     * @param {SkinJson} arg0
     */
    set skin_json(arg0) {
        _assertClass(arg0, SkinJson);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_fluxisskin_skin_json(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TextureStore}
     */
    get textures() {
        const ret = wasm.__wbg_get_fluxisskin_textures(this.__wbg_ptr);
        return TextureStore.__wrap(ret);
    }
    /**
     * @param {TextureStore} arg0
     */
    set textures(arg0) {
        _assertClass(arg0, TextureStore);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_fluxisskin_textures(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {BinaryStore}
     */
    get samples() {
        const ret = wasm.__wbg_get_fluxisskin_samples(this.__wbg_ptr);
        return BinaryStore.__wrap(ret);
    }
    /**
     * @param {BinaryStore} arg0
     */
    set samples(arg0) {
        _assertClass(arg0, BinaryStore);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_fluxisskin_samples(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {SkinJson} skin_json
     * @param {TextureStore | null} [textures]
     * @param {BinaryStore | null} [samples]
     */
    constructor(skin_json, textures, samples) {
        _assertClass(skin_json, SkinJson);
        var ptr0 = skin_json.__destroy_into_raw();
        let ptr1 = 0;
        if (!isLikeNone(textures)) {
            _assertClass(textures, TextureStore);
            ptr1 = textures.__destroy_into_raw();
        }
        let ptr2 = 0;
        if (!isLikeNone(samples)) {
            _assertClass(samples, BinaryStore);
            ptr2 = samples.__destroy_into_raw();
        }
        const ret = wasm.fluxisskin_new(ptr0, ptr1, ptr2);
        this.__wbg_ptr = ret >>> 0;
        FluXisSkinFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {GenericManiaSkin}
     */
    toGenericMania() {
        const ret = wasm.fluxisskin_toGenericMania(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return GenericManiaSkin.__wrap(ret[0]);
    }
    /**
     * @param {FluXisLayout} layout
     * @returns {GenericManiaSkin}
     */
    toGenericManiaWithLayout(layout) {
        _assertClass(layout, FluXisLayout);
        const ret = wasm.fluxisskin_toGenericManiaWithLayout(this.__wbg_ptr, layout.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return GenericManiaSkin.__wrap(ret[0]);
    }
    /**
     * @param {GenericManiaSkin} skin
     * @returns {FluXisSkinWithLayout}
     */
    static fromGenericMania(skin) {
        _assertClass(skin, GenericManiaSkin);
        const ret = wasm.fluxisskin_fromGenericMania(skin.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FluXisSkinWithLayout.__wrap(ret[0]);
    }
    /**
     * @param {number} keymode
     * @returns {FluXisKeymode | undefined}
     */
    getKeymode(keymode) {
        const ret = wasm.fluxisskin_getKeymode(this.__wbg_ptr, keymode);
        return ret === 0 ? undefined : FluXisKeymode.__wrap(ret);
    }
    /**
     * @returns {string[]}
     */
    getRequiredTexturePaths() {
        const ret = wasm.fluxisskin_getRequiredTexturePaths(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {string[]}
     */
    getRequiredSamplePaths() {
        const ret = wasm.fluxisskin_getRequiredSamplePaths(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
}
if (Symbol.dispose) FluXisSkin.prototype[Symbol.dispose] = FluXisSkin.prototype.free;

export class FluXisSkinWithLayout {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FluXisSkinWithLayout.prototype);
        obj.__wbg_ptr = ptr;
        FluXisSkinWithLayoutFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FluXisSkinWithLayoutFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fluxisskinwithlayout_free(ptr, 0);
    }
    /**
     * @returns {FluXisSkin}
     */
    get skin() {
        const ret = wasm.__wbg_get_fluxisskinwithlayout_skin(this.__wbg_ptr);
        return FluXisSkin.__wrap(ret);
    }
    /**
     * @param {FluXisSkin} arg0
     */
    set skin(arg0) {
        _assertClass(arg0, FluXisSkin);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_fluxisskinwithlayout_skin(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {FluXisLayout}
     */
    get layout() {
        const ret = wasm.__wbg_get_fluxisskinwithlayout_layout(this.__wbg_ptr);
        return FluXisLayout.__wrap(ret);
    }
    /**
     * @param {FluXisLayout} arg0
     */
    set layout(arg0) {
        _assertClass(arg0, FluXisLayout);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_fluxisskinwithlayout_layout(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) FluXisSkinWithLayout.prototype[Symbol.dispose] = FluXisSkinWithLayout.prototype.free;

export class General {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(General.prototype);
        obj.__wbg_ptr = ptr;
        GeneralFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GeneralFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_general_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get name() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_general_name(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set name(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_general_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get author() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_general_author(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set author(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_general_author(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get version() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_general_version(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set version(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_general_version(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {number}
     */
    get animation_framerate() {
        const ret = wasm.__wbg_get_general_animation_framerate(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set animation_framerate(arg0) {
        wasm.__wbg_set_general_animation_framerate(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {boolean}
     */
    get allow_slider_ball_tint() {
        const ret = wasm.__wbg_get_general_allow_slider_ball_tint(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set allow_slider_ball_tint(arg0) {
        wasm.__wbg_set_general_allow_slider_ball_tint(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {boolean}
     */
    get combo_burst_random() {
        const ret = wasm.__wbg_get_general_combo_burst_random(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set combo_burst_random(arg0) {
        wasm.__wbg_set_general_combo_burst_random(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {boolean}
     */
    get cursor_centre() {
        const ret = wasm.__wbg_get_general_cursor_centre(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set cursor_centre(arg0) {
        wasm.__wbg_set_general_cursor_centre(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {boolean}
     */
    get cursor_expand() {
        const ret = wasm.__wbg_get_general_cursor_expand(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set cursor_expand(arg0) {
        wasm.__wbg_set_general_cursor_expand(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {boolean}
     */
    get cursor_rotate() {
        const ret = wasm.__wbg_get_general_cursor_rotate(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set cursor_rotate(arg0) {
        wasm.__wbg_set_general_cursor_rotate(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {boolean}
     */
    get cursor_trail_rotate() {
        const ret = wasm.__wbg_get_general_cursor_trail_rotate(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set cursor_trail_rotate(arg0) {
        wasm.__wbg_set_general_cursor_trail_rotate(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {Uint16Array}
     */
    get custom_combo_burst_sounds() {
        const ret = wasm.__wbg_get_general_custom_combo_burst_sounds(this.__wbg_ptr);
        var v1 = getArrayU16FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 2, 2);
        return v1;
    }
    /**
     * @param {Uint16Array} arg0
     */
    set custom_combo_burst_sounds(arg0) {
        const ptr0 = passArray16ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_general_custom_combo_burst_sounds(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {boolean}
     */
    get hit_circle_overlay_above_number() {
        const ret = wasm.__wbg_get_general_hit_circle_overlay_above_number(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set hit_circle_overlay_above_number(arg0) {
        wasm.__wbg_set_general_hit_circle_overlay_above_number(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {boolean}
     */
    get layered_hit_sounds() {
        const ret = wasm.__wbg_get_general_layered_hit_sounds(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set layered_hit_sounds(arg0) {
        wasm.__wbg_set_general_layered_hit_sounds(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {boolean}
     */
    get slider_ball_flip() {
        const ret = wasm.__wbg_get_general_slider_ball_flip(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set slider_ball_flip(arg0) {
        wasm.__wbg_set_general_slider_ball_flip(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {boolean}
     */
    get spinner_fade_playfield() {
        const ret = wasm.__wbg_get_general_spinner_fade_playfield(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set spinner_fade_playfield(arg0) {
        wasm.__wbg_set_general_spinner_fade_playfield(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {boolean}
     */
    get spinner_frequency_modulate() {
        const ret = wasm.__wbg_get_general_spinner_frequency_modulate(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set spinner_frequency_modulate(arg0) {
        wasm.__wbg_set_general_spinner_frequency_modulate(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {boolean}
     */
    get spinner_no_blink() {
        const ret = wasm.__wbg_get_general_spinner_no_blink(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set spinner_no_blink(arg0) {
        wasm.__wbg_set_general_spinner_no_blink(this.__wbg_ptr, arg0);
    }
    /**
     * @param {string} content
     * @returns {General}
     */
    static fromStr(content) {
        const ptr0 = passStringToWasm0(content, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.general_fromStr(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return General.__wrap(ret[0]);
    }
    /**
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.general_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) General.prototype[Symbol.dispose] = General.prototype.free;

export class GenericManiaSkin {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(GenericManiaSkin.prototype);
        obj.__wbg_ptr = ptr;
        GenericManiaSkinFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GenericManiaSkinFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_genericmaniaskin_free(ptr, 0);
    }
    /**
     * @returns {TextureStore}
     */
    get textures() {
        const ret = wasm.__wbg_get_genericmaniaskin_textures(this.__wbg_ptr);
        return TextureStore.__wrap(ret);
    }
    /**
     * @param {TextureStore} arg0
     */
    set textures(arg0) {
        _assertClass(arg0, TextureStore);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_genericmaniaskin_textures(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {BinaryStore}
     */
    get samples() {
        const ret = wasm.__wbg_get_genericmaniaskin_samples(this.__wbg_ptr);
        return BinaryStore.__wrap(ret);
    }
    /**
     * @param {BinaryStore} arg0
     */
    set samples(arg0) {
        _assertClass(arg0, BinaryStore);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_genericmaniaskin_samples(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {GenericManiaSkin}
     */
    toGenericMania() {
        const ret = wasm.genericmaniaskin_toGenericMania(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return GenericManiaSkin.__wrap(ret[0]);
    }
    /**
     * @param {GenericManiaSkin} skin
     * @returns {GenericManiaSkin}
     */
    static fromGenericMania(skin) {
        _assertClass(skin, GenericManiaSkin);
        const ret = wasm.genericmaniaskin_fromGenericMania(skin.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return GenericManiaSkin.__wrap(ret[0]);
    }
    /**
     * @param {number} keymode
     * @returns {Keymode | undefined}
     */
    getKeymode(keymode) {
        const ret = wasm.genericmaniaskin_getKeymode(this.__wbg_ptr, keymode);
        return ret === 0 ? undefined : Keymode.__wrap(ret);
    }
    /**
     * @returns {string[]}
     */
    getRequiredTexturePaths() {
        const ret = wasm.genericmaniaskin_getRequiredTexturePaths(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {string[]}
     */
    getRequiredSamplePaths() {
        const ret = wasm.genericmaniaskin_getRequiredSamplePaths(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
}
if (Symbol.dispose) GenericManiaSkin.prototype[Symbol.dispose] = GenericManiaSkin.prototype.free;

export class Info {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Info.prototype);
        obj.__wbg_ptr = ptr;
        InfoFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        InfoFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_info_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get name() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_info_name(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set name(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_info_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get creator() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_info_creator(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set creator(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_info_creator(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get accent() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_info_accent(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set accent(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_info_accent(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) Info.prototype[Symbol.dispose] = Info.prototype.free;

export class Keymode {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Keymode.prototype);
        obj.__wbg_ptr = ptr;
        KeymodeFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        KeymodeFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_keymode_free(ptr, 0);
    }
    /**
     * @param {string} content
     * @returns {OsuKeymode}
     */
    static fromStr(content) {
        const ptr0 = passStringToWasm0(content, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.keymode_fromStr(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return OsuKeymode.__wrap(ret[0]);
    }
    /**
     * @returns {string}
     */
    toStr() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.keymode_toStr(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {string[]}
     */
    getTexturePaths() {
        const ret = wasm.keymode_getTexturePaths(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {number}
     */
    get keymode() {
        const ret = wasm.__wbg_get_keymode_keymode(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set keymode(arg0) {
        wasm.__wbg_set_keymode_keymode(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) Keymode.prototype[Symbol.dispose] = Keymode.prototype.free;

export class OsuKeymode {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(OsuKeymode.prototype);
        obj.__wbg_ptr = ptr;
        OsuKeymodeFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    static __unwrap(jsValue) {
        if (!(jsValue instanceof OsuKeymode)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        OsuKeymodeFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_osukeymode_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get keymode() {
        const ret = wasm.__wbg_get_osukeymode_keymode(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set keymode(arg0) {
        wasm.__wbg_set_osukeymode_keymode(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {boolean}
     */
    get keys_under_notes() {
        const ret = wasm.__wbg_get_osukeymode_keys_under_notes(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set keys_under_notes(arg0) {
        wasm.__wbg_set_osukeymode_keys_under_notes(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {boolean}
     */
    get judgement_line() {
        const ret = wasm.__wbg_get_osukeymode_judgement_line(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set judgement_line(arg0) {
        wasm.__wbg_set_osukeymode_judgement_line(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {boolean}
     */
    get upside_down() {
        const ret = wasm.__wbg_get_osukeymode_upside_down(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set upside_down(arg0) {
        wasm.__wbg_set_osukeymode_upside_down(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get special_style() {
        const ret = wasm.__wbg_get_osukeymode_special_style(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set special_style(arg0) {
        wasm.__wbg_set_osukeymode_special_style(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get combo_burst_style() {
        const ret = wasm.__wbg_get_osukeymode_combo_burst_style(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set combo_burst_style(arg0) {
        wasm.__wbg_set_osukeymode_combo_burst_style(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get split_stages() {
        const ret = wasm.__wbg_get_osukeymode_split_stages(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set split_stages(arg0) {
        wasm.__wbg_set_osukeymode_split_stages(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {number}
     */
    get stage_separation() {
        const ret = wasm.__wbg_get_osukeymode_stage_separation(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set stage_separation(arg0) {
        wasm.__wbg_set_osukeymode_stage_separation(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {boolean}
     */
    get separate_score() {
        const ret = wasm.__wbg_get_osukeymode_separate_score(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set separate_score(arg0) {
        wasm.__wbg_set_osukeymode_separate_score(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get hit_position() {
        const ret = wasm.__wbg_get_osukeymode_hit_position(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set hit_position(arg0) {
        wasm.__wbg_set_osukeymode_hit_position(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get light_position() {
        const ret = wasm.__wbg_get_osukeymode_light_position(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set light_position(arg0) {
        wasm.__wbg_set_osukeymode_light_position(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number | undefined}
     */
    get score_position() {
        const ret = wasm.__wbg_get_osukeymode_score_position(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set score_position(arg0) {
        wasm.__wbg_set_osukeymode_score_position(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @returns {number | undefined}
     */
    get combo_position() {
        const ret = wasm.__wbg_get_osukeymode_combo_position(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set combo_position(arg0) {
        wasm.__wbg_set_osukeymode_combo_position(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @returns {number}
     */
    get column_start() {
        const ret = wasm.__wbg_get_osukeymode_column_start(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set column_start(arg0) {
        wasm.__wbg_set_osukeymode_column_start(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get column_right() {
        const ret = wasm.__wbg_get_osukeymode_column_right(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set column_right(arg0) {
        wasm.__wbg_set_osukeymode_column_right(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {Float32Array}
     */
    get column_line_width() {
        const ret = wasm.__wbg_get_osukeymode_column_line_width(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {Float32Array} arg0
     */
    set column_line_width(arg0) {
        const ptr0 = passArrayF32ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osukeymode_column_line_width(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {Float32Array}
     */
    get column_width() {
        const ret = wasm.__wbg_get_osukeymode_column_width(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {Float32Array} arg0
     */
    set column_width(arg0) {
        const ptr0 = passArrayF32ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osukeymode_column_width(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {Float32Array}
     */
    get column_spacing() {
        const ret = wasm.__wbg_get_osukeymode_column_spacing(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {Float32Array} arg0
     */
    set column_spacing(arg0) {
        const ptr0 = passArrayF32ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osukeymode_column_spacing(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {number}
     */
    get barline_height() {
        const ret = wasm.__wbg_get_osukeymode_barline_height(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set barline_height(arg0) {
        wasm.__wbg_set_osukeymode_barline_height(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {Float32Array}
     */
    get lighting_n_width() {
        const ret = wasm.__wbg_get_osukeymode_lighting_n_width(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {Float32Array} arg0
     */
    set lighting_n_width(arg0) {
        const ptr0 = passArrayF32ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osukeymode_lighting_n_width(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {Float32Array}
     */
    get lighting_l_width() {
        const ret = wasm.__wbg_get_osukeymode_lighting_l_width(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {Float32Array} arg0
     */
    set lighting_l_width(arg0) {
        const ptr0 = passArrayF32ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osukeymode_lighting_l_width(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {number | undefined}
     */
    get width_for_note_height_scale() {
        const ret = wasm.__wbg_get_osukeymode_width_for_note_height_scale(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set width_for_note_height_scale(arg0) {
        wasm.__wbg_set_osukeymode_width_for_note_height_scale(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {number}
     */
    get light_frame_per_second() {
        const ret = wasm.__wbg_get_osukeymode_light_frame_per_second(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set light_frame_per_second(arg0) {
        wasm.__wbg_set_osukeymode_light_frame_per_second(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {boolean}
     */
    get key_flip_when_upside_down() {
        const ret = wasm.__wbg_get_osukeymode_key_flip_when_upside_down(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set key_flip_when_upside_down(arg0) {
        wasm.__wbg_set_osukeymode_key_flip_when_upside_down(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get note_body_style() {
        const ret = wasm.__wbg_get_osukeymode_note_body_style(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set note_body_style(arg0) {
        wasm.__wbg_set_osukeymode_note_body_style(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {Uint8Array}
     */
    get note_body_style_columns() {
        const ret = wasm.__wbg_get_osukeymode_note_body_style_columns(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @param {Uint8Array} arg0
     */
    set note_body_style_columns(arg0) {
        const ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osukeymode_note_body_style_columns(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string[]}
     */
    get receptor_images() {
        const ret = wasm.__wbg_get_osukeymode_receptor_images(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {string[]} arg0
     */
    set receptor_images(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osukeymode_receptor_images(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string[]}
     */
    get receptor_images_down() {
        const ret = wasm.__wbg_get_osukeymode_receptor_images_down(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {string[]} arg0
     */
    set receptor_images_down(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osukeymode_receptor_images_down(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string[]}
     */
    get normal_note_images() {
        const ret = wasm.__wbg_get_osukeymode_normal_note_images(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {string[]} arg0
     */
    set normal_note_images(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osukeymode_normal_note_images(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string[]}
     */
    get long_note_head_images() {
        const ret = wasm.__wbg_get_osukeymode_long_note_head_images(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {string[]} arg0
     */
    set long_note_head_images(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osukeymode_long_note_head_images(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string[]}
     */
    get long_note_body_images() {
        const ret = wasm.__wbg_get_osukeymode_long_note_body_images(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {string[]} arg0
     */
    set long_note_body_images(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osukeymode_long_note_body_images(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string[]}
     */
    get long_note_tail_images() {
        const ret = wasm.__wbg_get_osukeymode_long_note_tail_images(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {string[]} arg0
     */
    set long_note_tail_images(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osukeymode_long_note_tail_images(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get stage_left() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_osukeymode_stage_left(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set stage_left(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osukeymode_stage_left(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get stage_right() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_osukeymode_stage_right(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set stage_right(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osukeymode_stage_right(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get stage_bottom() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_osukeymode_stage_bottom(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set stage_bottom(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osukeymode_stage_bottom(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get stage_hint() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_osukeymode_stage_hint(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set stage_hint(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osukeymode_stage_hint(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get stage_light() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_osukeymode_stage_light(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set stage_light(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osukeymode_stage_light(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get lighting_n() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_osukeymode_lighting_n(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set lighting_n(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osukeymode_lighting_n(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get lighting_l() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_osukeymode_lighting_l(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set lighting_l(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osukeymode_lighting_l(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get warning_arrow() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_osukeymode_warning_arrow(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set warning_arrow(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osukeymode_warning_arrow(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get hit0() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_osukeymode_hit0(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set hit0(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osukeymode_hit0(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get hit50() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_osukeymode_hit50(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set hit50(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osukeymode_hit50(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get hit100() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_osukeymode_hit100(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set hit100(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osukeymode_hit100(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get hit200() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_osukeymode_hit200(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set hit200(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osukeymode_hit200(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get hit300() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_osukeymode_hit300(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set hit300(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osukeymode_hit300(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get hit300g() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_osukeymode_hit300g(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set hit300g(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osukeymode_hit300g(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) OsuKeymode.prototype[Symbol.dispose] = OsuKeymode.prototype.free;

export class OsuSkin {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(OsuSkin.prototype);
        obj.__wbg_ptr = ptr;
        OsuSkinFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        OsuSkinFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_osuskin_free(ptr, 0);
    }
    /**
     * @returns {OsuSkinIni}
     */
    get skin_ini() {
        const ret = wasm.__wbg_get_osuskin_skin_ini(this.__wbg_ptr);
        return OsuSkinIni.__wrap(ret);
    }
    /**
     * @param {OsuSkinIni} arg0
     */
    set skin_ini(arg0) {
        _assertClass(arg0, OsuSkinIni);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_osuskin_skin_ini(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TextureStore}
     */
    get textures() {
        const ret = wasm.__wbg_get_osuskin_textures(this.__wbg_ptr);
        return TextureStore.__wrap(ret);
    }
    /**
     * @param {TextureStore} arg0
     */
    set textures(arg0) {
        _assertClass(arg0, TextureStore);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_osuskin_textures(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {BinaryStore}
     */
    get samples() {
        const ret = wasm.__wbg_get_osuskin_samples(this.__wbg_ptr);
        return BinaryStore.__wrap(ret);
    }
    /**
     * @param {BinaryStore} arg0
     */
    set samples(arg0) {
        _assertClass(arg0, BinaryStore);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_osuskin_samples(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {OsuSkinIni} skin_ini
     * @param {TextureStore | null} [textures]
     * @param {BinaryStore | null} [samples]
     */
    constructor(skin_ini, textures, samples) {
        _assertClass(skin_ini, OsuSkinIni);
        var ptr0 = skin_ini.__destroy_into_raw();
        let ptr1 = 0;
        if (!isLikeNone(textures)) {
            _assertClass(textures, TextureStore);
            ptr1 = textures.__destroy_into_raw();
        }
        let ptr2 = 0;
        if (!isLikeNone(samples)) {
            _assertClass(samples, BinaryStore);
            ptr2 = samples.__destroy_into_raw();
        }
        const ret = wasm.osuskin_new(ptr0, ptr1, ptr2);
        this.__wbg_ptr = ret >>> 0;
        OsuSkinFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {GenericManiaSkin}
     */
    toGenericMania() {
        const ret = wasm.osuskin_toGenericMania(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return GenericManiaSkin.__wrap(ret[0]);
    }
    /**
     * @param {GenericManiaSkin} skin
     * @returns {OsuSkin}
     */
    static fromGenericMania(skin) {
        _assertClass(skin, GenericManiaSkin);
        const ret = wasm.osuskin_fromGenericMania(skin.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return OsuSkin.__wrap(ret[0]);
    }
    /**
     * @param {number} keymode
     * @returns {OsuKeymode | undefined}
     */
    getKeymode(keymode) {
        const ret = wasm.osuskin_getKeymode(this.__wbg_ptr, keymode);
        return ret === 0 ? undefined : OsuKeymode.__wrap(ret);
    }
    /**
     * @returns {string[]}
     */
    getRequiredTexturePaths() {
        const ret = wasm.osuskin_getRequiredTexturePaths(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {string[]}
     */
    getRequiredSamplePaths() {
        const ret = wasm.osuskin_getRequiredSamplePaths(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
}
if (Symbol.dispose) OsuSkin.prototype[Symbol.dispose] = OsuSkin.prototype.free;

export class OsuSkinIni {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(OsuSkinIni.prototype);
        obj.__wbg_ptr = ptr;
        OsuSkinIniFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        OsuSkinIniFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_osuskinini_free(ptr, 0);
    }
    /**
     * @returns {General}
     */
    get general() {
        const ret = wasm.__wbg_get_osuskinini_general(this.__wbg_ptr);
        return General.__wrap(ret);
    }
    /**
     * @param {General} arg0
     */
    set general(arg0) {
        _assertClass(arg0, General);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_osuskinini_general(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {OsuKeymode[]}
     */
    get keymodes() {
        const ret = wasm.__wbg_get_osuskinini_keymodes(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {OsuKeymode[]} arg0
     */
    set keymodes(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_osuskinini_keymodes(this.__wbg_ptr, ptr0, len0);
    }
    constructor() {
        const ret = wasm.osuskinini_new();
        this.__wbg_ptr = ret >>> 0;
        OsuSkinIniFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {string} json_str
     * @returns {OsuSkinIni}
     */
    static fromStr(json_str) {
        const ptr0 = passStringToWasm0(json_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.osuskinini_fromStr(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return OsuSkinIni.__wrap(ret[0]);
    }
    /**
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.osuskinini_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {string[]}
     */
    getRequiredTexturePaths() {
        const ret = wasm.osuskinini_getRequiredTexturePaths(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @returns {string[]}
     */
    getRequiredSamplePaths() {
        const ret = wasm.osuskinini_getRequiredSamplePaths(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {number} keymode
     * @returns {OsuKeymode | undefined}
     */
    getKeymode(keymode) {
        const ret = wasm.osuskinini_getKeymode(this.__wbg_ptr, keymode);
        return ret === 0 ? undefined : OsuKeymode.__wrap(ret);
    }
}
if (Symbol.dispose) OsuSkinIni.prototype[Symbol.dispose] = OsuSkinIni.prototype.free;

export class RawBytes {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(RawBytes.prototype);
        obj.__wbg_ptr = ptr;
        RawBytesFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RawBytesFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rawbytes_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get path() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_rawbytes_path(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set path(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_rawbytes_path(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} path
     */
    constructor(path) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.rawbytes_new(ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        RawBytesFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {string} path
     * @param {Uint8Array} bytes
     * @returns {RawBytes}
     */
    static fromBytes(path, bytes) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.rawbytes_fromBytes(ptr0, len0, ptr1, len1);
        return RawBytes.__wrap(ret);
    }
    /**
     * @returns {Uint8Array | undefined}
     */
    getData() {
        const ret = wasm.rawbytes_getData(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {string} path
     * @param {ArrayBuffer} buffer
     * @returns {RawBytes}
     */
    static fromArrayBuffer(path, buffer) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.rawbytes_fromArrayBuffer(ptr0, len0, buffer);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return RawBytes.__wrap(ret[0]);
    }
    /**
     * @param {string} path
     * @param {ArrayBuffer} buffer
     * @returns {RawBytes}
     */
    static fromArrayBufferUnloaded(path, buffer) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.rawbytes_fromArrayBufferUnloaded(ptr0, len0, buffer);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return RawBytes.__wrap(ret[0]);
    }
    /**
     * @param {string} path
     * @param {Uint8Array} array
     * @returns {RawBytes}
     */
    static fromUint8Array(path, array) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.rawbytes_fromUint8Array(ptr0, len0, array);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return RawBytes.__wrap(ret[0]);
    }
    /**
     * @param {string} path
     * @param {Uint8Array} array
     * @returns {RawBytes}
     */
    static fromUint8ArrayUnloaded(path, array) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.rawbytes_fromUint8ArrayUnloaded(ptr0, len0, array);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return RawBytes.__wrap(ret[0]);
    }
    /**
     * @returns {string}
     */
    getPath() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.rawbytes_getPath(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {boolean}
     */
    hasData() {
        const ret = wasm.rawbytes_hasData(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isLoaded() {
        const ret = wasm.rawbytes_isLoaded(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isUnloaded() {
        const ret = wasm.rawbytes_isUnloaded(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.rawbytes_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    load() {
        const ret = wasm.rawbytes_load(this.__wbg_ptr);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    unload() {
        const ret = wasm.rawbytes_unload(this.__wbg_ptr);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
}
if (Symbol.dispose) RawBytes.prototype[Symbol.dispose] = RawBytes.prototype.free;

export class SkinJson {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SkinJson.prototype);
        obj.__wbg_ptr = ptr;
        SkinJsonFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SkinJsonFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_skinjson_free(ptr, 0);
    }
    /**
     * @returns {Info}
     */
    get info() {
        const ret = wasm.__wbg_get_skinjson_info(this.__wbg_ptr);
        return Info.__wrap(ret);
    }
    /**
     * @param {Info} arg0
     */
    set info(arg0) {
        _assertClass(arg0, Info);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_skinjson_info(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {FluXisKeymode[]}
     */
    get keymodes() {
        const ret = wasm.__wbg_get_skinjson_keymodes(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {FluXisKeymode[]} arg0
     */
    set keymodes(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_skinjson_keymodes(this.__wbg_ptr, ptr0, len0);
    }
    constructor() {
        const ret = wasm.skinjson_new();
        this.__wbg_ptr = ret >>> 0;
        SkinJsonFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {string} json_str
     * @returns {SkinJson}
     */
    static fromStr(json_str) {
        const ptr0 = passStringToWasm0(json_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.skinjson_fromStr(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return SkinJson.__wrap(ret[0]);
    }
    /**
     * @returns {string}
     */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.skinjson_toString(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) SkinJson.prototype[Symbol.dispose] = SkinJson.prototype.free;

export class Texture {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Texture.prototype);
        obj.__wbg_ptr = ptr;
        TextureFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TextureFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_texture_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get path() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_texture_path(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set path(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_texture_path(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} path
     */
    constructor(path) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.texture_new(ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        TextureFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {string} path
     * @returns {Texture}
     */
    static fromBlank(path) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.texture_fromBlank(ptr0, len0);
        return Texture.__wrap(ret);
    }
    /**
     * @param {string} path
     * @param {ArrayBuffer} buffer
     * @returns {Texture}
     */
    static fromArrayBuffer(path, buffer) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.texture_fromArrayBuffer(ptr0, len0, buffer);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Texture.__wrap(ret[0]);
    }
    /**
     * @param {string} path
     * @param {ArrayBuffer} buffer
     * @returns {Texture}
     */
    static fromArrayBufferUnloaded(path, buffer) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.texture_fromArrayBufferUnloaded(ptr0, len0, buffer);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Texture.__wrap(ret[0]);
    }
    /**
     * @param {string} path
     * @param {Uint8Array} array
     * @returns {Texture}
     */
    static fromUint8Array(path, array) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.texture_fromUint8Array(ptr0, len0, array);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Texture.__wrap(ret[0]);
    }
    /**
     * @param {string} path
     * @param {Uint8Array} array
     * @returns {Texture}
     */
    static fromUint8ArrayUnloaded(path, array) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.texture_fromUint8ArrayUnloaded(ptr0, len0, array);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Texture.__wrap(ret[0]);
    }
    /**
     * @returns {string}
     */
    getPath() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.texture_getPath(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {boolean}
     */
    hasData() {
        const ret = wasm.texture_hasData(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isLoaded() {
        const ret = wasm.texture_isLoaded(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isUnloaded() {
        const ret = wasm.texture_isUnloaded(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.texture_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    load() {
        const ret = wasm.texture_load(this.__wbg_ptr);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    unload() {
        const ret = wasm.texture_unload(this.__wbg_ptr);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
}
if (Symbol.dispose) Texture.prototype[Symbol.dispose] = Texture.prototype.free;

export class TextureStore {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TextureStore.prototype);
        obj.__wbg_ptr = ptr;
        TextureStoreFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TextureStoreFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_texturestore_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.texturestore_new_wasm();
        this.__wbg_ptr = ret >>> 0;
        TextureStoreFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {Texture} texture
     */
    insertTexture(texture) {
        _assertClass(texture, Texture);
        var ptr0 = texture.__destroy_into_raw();
        wasm.texturestore_insertTexture(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {string} new_path
     * @param {Texture} texture
     * @returns {string}
     */
    makeUnique(new_path, texture) {
        let deferred3_0;
        let deferred3_1;
        try {
            const ptr0 = passStringToWasm0(new_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            _assertClass(texture, Texture);
            var ptr1 = texture.__destroy_into_raw();
            const ret = wasm.texturestore_makeUnique(this.__wbg_ptr, ptr0, len0, ptr1);
            deferred3_0 = ret[0];
            deferred3_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    }
    /**
     * @param {string} path
     * @param {ArrayBuffer} buffer
     */
    loadFromArrayBuffer(path, buffer) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.texturestore_loadFromArrayBuffer(this.__wbg_ptr, ptr0, len0, buffer);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {string} path
     * @param {Uint8Array} array
     */
    loadFromUint8Array(path, array) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.texturestore_loadFromUint8Array(this.__wbg_ptr, ptr0, len0, array);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @returns {boolean}
     */
    allLoaded() {
        const ret = wasm.texturestore_allLoaded(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    loadedCount() {
        const ret = wasm.texturestore_loadedCount(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {Array<any>}
     */
    unloadedPaths() {
        const ret = wasm.texturestore_unloadedPaths(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {string} path
     * @returns {boolean}
     */
    hasTexture(path) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.texturestore_contains(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {string} path
     * @returns {string | undefined}
     */
    getTexturePath(path) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.texturestore_getTexturePath(this.__wbg_ptr, ptr0, len0);
        let v2;
        if (ret[0] !== 0) {
            v2 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v2;
    }
    /**
     * @param {string} path
     * @returns {boolean}
     */
    textureHasData(path) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.texturestore_textureHasData(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {string} path
     * @returns {boolean}
     */
    contains(path) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.texturestore_contains(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @param {string} path
     * @returns {boolean}
     */
    remove(path) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.texturestore_remove(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    getLength() {
        const ret = wasm.texturestore_getLength(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {boolean}
     */
    isEmpty() {
        const ret = wasm.texturestore_isEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {Array<any>}
     */
    getPaths() {
        const ret = wasm.texturestore_getPaths(this.__wbg_ptr);
        return ret;
    }
    clear() {
        wasm.texturestore_clear(this.__wbg_ptr);
    }
    /**
     * @param {string} original_path
     * @param {string} new_path
     * @returns {string | undefined}
     */
    copy(original_path, new_path) {
        const ptr0 = passStringToWasm0(original_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(new_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.texturestore_copy(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        let v3;
        if (ret[0] !== 0) {
            v3 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v3;
    }
    /**
     * @param {string} original_path
     * @param {string} new_base_path
     * @returns {string | undefined}
     */
    makeUniqueCopy(original_path, new_base_path) {
        const ptr0 = passStringToWasm0(original_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(new_base_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.texturestore_makeUniqueCopy(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        let v3;
        if (ret[0] !== 0) {
            v3 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v3;
    }
    /**
     * @param {TextureStore} other
     */
    extend(other) {
        _assertClass(other, TextureStore);
        wasm.texturestore_extend(this.__wbg_ptr, other.__wbg_ptr);
    }
}
if (Symbol.dispose) TextureStore.prototype[Symbol.dispose] = TextureStore.prototype.free;

/**
 * @param {Map<any, any>} files
 * @returns {BinaryStore}
 */
export function allSamplesFromFiles(files) {
    const ret = wasm.allSamplesFromFiles(files);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return BinaryStore.__wrap(ret[0]);
}

/**
 * @param {Map<any, any>} files
 * @returns {TextureStore}
 */
export function allTexturesFromFiles(files) {
    const ret = wasm.allTexturesFromFiles(files);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return TextureStore.__wrap(ret[0]);
}

/**
 * @param {Map<any, any>} files
 * @returns {FluXisSkin}
 */
export function fluXisSkinFromFiles(files) {
    const ret = wasm.fluXisSkinFromFiles(files);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return FluXisSkin.__wrap(ret[0]);
}

/**
 * @param {FluXisSkin} skin
 * @returns {Map<any, any>}
 */
export function fluXisSkinToFiles(skin) {
    _assertClass(skin, FluXisSkin);
    const ret = wasm.fluXisSkinToFiles(skin.__wbg_ptr);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * @param {OsuSkinIni} skin_ini
 * @returns {string}
 */
export function iniToString(skin_ini) {
    let deferred1_0;
    let deferred1_1;
    try {
        _assertClass(skin_ini, OsuSkinIni);
        const ret = wasm.iniToString(skin_ini.__wbg_ptr);
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

/**
 * @param {SkinJson} skin_json
 * @returns {string}
 */
export function jsonToString(skin_json) {
    let deferred1_0;
    let deferred1_1;
    try {
        _assertClass(skin_json, SkinJson);
        const ret = wasm.jsonToString(skin_json.__wbg_ptr);
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

/**
 * @param {FluXisLayout} layout_json
 * @returns {string}
 */
export function layoutToString(layout_json) {
    let deferred2_0;
    let deferred2_1;
    try {
        _assertClass(layout_json, FluXisLayout);
        const ret = wasm.layoutToString(layout_json.__wbg_ptr);
        var ptr1 = ret[0];
        var len1 = ret[1];
        if (ret[3]) {
            ptr1 = 0; len1 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred2_0 = ptr1;
        deferred2_1 = len1;
        return getStringFromWasm0(ptr1, len1);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * @param {Map<any, any>} files
 * @returns {OsuSkin}
 */
export function osuSkinFromFiles(files) {
    const ret = wasm.osuSkinFromFiles(files);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return OsuSkin.__wrap(ret[0]);
}

/**
 * @param {OsuSkin} skin
 * @returns {Map<any, any>}
 */
export function osuSkinToFiles(skin) {
    _assertClass(skin, OsuSkin);
    const ret = wasm.osuSkinToFiles(skin.__wbg_ptr);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * @param {Map<any, any>} files
 * @param {Array<any>} relative_sample_paths
 * @returns {BinaryStore}
 */
export function samplesFromFiles(files, relative_sample_paths) {
    const ret = wasm.samplesFromFiles(files, relative_sample_paths);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return BinaryStore.__wrap(ret[0]);
}

/**
 * @param {BinaryStore} samples
 * @returns {Map<any, any>}
 */
export function samplesToFiles(samples) {
    _assertClass(samples, BinaryStore);
    const ret = wasm.samplesToFiles(samples.__wbg_ptr);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

/**
 * @param {Map<any, any>} files
 * @param {Array<any>} relative_texture_paths
 * @returns {TextureStore}
 */
export function texturesFromFiles(files, relative_texture_paths) {
    const ret = wasm.texturesFromFiles(files, relative_texture_paths);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return TextureStore.__wrap(ret[0]);
}

/**
 * @param {TextureStore} textures
 * @returns {Map<any, any>}
 */
export function texturesToFiles(textures) {
    _assertClass(textures, TextureStore);
    const ret = wasm.texturesToFiles(textures.__wbg_ptr);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
}

const EXPECTED_RESPONSE_TYPES = new Set(['basic', 'cors', 'default']);

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && EXPECTED_RESPONSE_TYPES.has(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_Error_52673b7de5a0ca89 = function(arg0, arg1) {
        const ret = Error(getStringFromWasm0(arg0, arg1));
        return ret;
    };
    imports.wbg.__wbg___wbindgen_string_get_a2a31e16edf96e42 = function(arg0, arg1) {
        const obj = arg1;
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg___wbindgen_throw_dd24417ed36fc46e = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbg_fluxiskeymode_new = function(arg0) {
        const ret = FluXisKeymode.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_fluxiskeymode_unwrap = function(arg0) {
        const ret = FluXisKeymode.__unwrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_forEach_d7b0beca8c53e695 = function(arg0, arg1, arg2) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0, arg1) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return wasm_bindgen__convert__closures_____invoke__h9a6e61dda56dfb1d(a, state0.b, arg0, arg1);
                } finally {
                    state0.a = a;
                }
            };
            arg0.forEach(cb0);
        } finally {
            state0.a = state0.b = 0;
        }
    };
    imports.wbg.__wbg_get_6b7bd52aca3f9671 = function(arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        return ret;
    };
    imports.wbg.__wbg_length_22ac23eaec9d8053 = function(arg0) {
        const ret = arg0.length;
        return ret;
    };
    imports.wbg.__wbg_length_d45040a40c570362 = function(arg0) {
        const ret = arg0.length;
        return ret;
    };
    imports.wbg.__wbg_new_25f239778d6112b9 = function() {
        const ret = new Array();
        return ret;
    };
    imports.wbg.__wbg_new_6421f6084cc5bc5a = function(arg0) {
        const ret = new Uint8Array(arg0);
        return ret;
    };
    imports.wbg.__wbg_new_b546ae120718850e = function() {
        const ret = new Map();
        return ret;
    };
    imports.wbg.__wbg_new_from_slice_f9c22b9153b26992 = function(arg0, arg1) {
        const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
        return ret;
    };
    imports.wbg.__wbg_osukeymode_new = function(arg0) {
        const ret = OsuKeymode.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_osukeymode_unwrap = function(arg0) {
        const ret = OsuKeymode.__unwrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_prototypesetcall_dfe9b766cdc1f1fd = function(arg0, arg1, arg2) {
        Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
    };
    imports.wbg.__wbg_push_7d9be8f38fc13975 = function(arg0, arg1) {
        const ret = arg0.push(arg1);
        return ret;
    };
    imports.wbg.__wbg_set_efaaf145b9377369 = function(arg0, arg1, arg2) {
        const ret = arg0.set(arg1, arg2);
        return ret;
    };
    imports.wbg.__wbindgen_cast_2241b6af4c4b2941 = function(arg0, arg1) {
        // Cast intrinsic for `Ref(String) -> Externref`.
        const ret = getStringFromWasm0(arg0, arg1);
        return ret;
    };
    imports.wbg.__wbindgen_init_externref_table = function() {
        const table = wasm.__wbindgen_externrefs;
        const offset = table.grow(4);
        table.set(0, undefined);
        table.set(offset + 0, undefined);
        table.set(offset + 1, null);
        table.set(offset + 2, true);
        table.set(offset + 3, false);
    };

    return imports;
}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedFloat32ArrayMemory0 = null;
    cachedUint16ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;


    wasm.__wbindgen_start();
    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined') {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL('rgskin_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync };
export default __wbg_init;
