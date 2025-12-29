import { createLibraryManager } from '$core/Managers/LibManager';
import type * as LibArchiveType from '$static_libs/libarchive/libarchive';

let libarchiveInitialized = false;

export const baseLibraries = createLibraryManager(async () => {
  const [jszipModule, libarchive] = await Promise.all([
    import('$static_libs/jszip/jszip'),
    import('$static_libs/libarchive/libarchive')
  ]);
  
  if (!libarchiveInitialized) {
    (libarchive as typeof LibArchiveType).Archive.init({
      workerUrl: '$static_libs/libarchive/worker-bundle.js',
      wasmUrl: '$static_libs/libarchive/libarchive.wasm'
    } as any);
    libarchiveInitialized = true;
  }
  
  return {
    JSZip: (jszipModule as any).default || (jszipModule as any),
    libarchive: libarchive as typeof LibArchiveType
  };
});

export type BaseLibraries = Awaited<ReturnType<typeof baseLibraries.initialize>>;