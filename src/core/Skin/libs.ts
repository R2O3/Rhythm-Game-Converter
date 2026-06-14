import { createLibraries } from '$core/Libraries/libInitilazation';

declare global {
    var __RGSKIN_THREAD_POOL_INITED: boolean | undefined;
}

export const skinLibraries = createLibraries(async () => {
  const modulePath = '/libs/rgskin/rgskin.js';
  const rgskin = await import(/* @vite-ignore */ modulePath);

  if (typeof rgskin.default === 'function') {
      await rgskin.default();
      
      if (!globalThis.__RGSKIN_THREAD_POOL_INITED) {
          try {
              await rgskin.initThreadPool(navigator.hardwareConcurrency);
              globalThis.__RGSKIN_THREAD_POOL_INITED = true;
          } catch (e) {
              console.warn("Rayon thread pool already initialized:", e);
              globalThis.__RGSKIN_THREAD_POOL_INITED = true; 
          }
      }
  }
  
  return {
    rgskin: rgskin
  };
});

export type SkinLibraries = Awaited<ReturnType<typeof skinLibraries.getAll>>;
export type * from '$static_libs/rgskin';