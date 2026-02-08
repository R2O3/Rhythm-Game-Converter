import { createLibraries } from '$core/Libraries/libInitilazation';

export const skinLibraries = createLibraries(async () => {
  const rgskin = await import('$static_libs/rgskin');
  
  if (typeof rgskin.default === 'function') {
      await rgskin.default();
  }
  
  return {
    rgskin: rgskin
  };
});

export type SkinLibraries = Awaited<ReturnType<typeof skinLibraries.getAll>>;
export type * from '$static_libs/rgskin';