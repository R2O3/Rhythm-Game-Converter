import { createLibraries } from '$core/Libraries/libInitilazation';

export const mapLibraries = createLibraries(async () => {
  const rgchart = await import('$static_libs/rgchart');
  
  if (typeof rgchart.default === 'function') {
      await rgchart.default();
  }
  
  return {
    rgchart: rgchart
  };
});

export type MapLibraries = Awaited<ReturnType<typeof mapLibraries.getAll>>;
export type * from '$static_libs/rgchart';