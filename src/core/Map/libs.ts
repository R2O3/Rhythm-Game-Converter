import { createLibraries } from '$core/Libraries/libCreation';

export const mapLibraries = createLibraries(async () => {
  const rgcChart = await import('$static_libs/rgc-chart');
  
  return {
    rgcChart: rgcChart
  };
});

export type MapLibraries = Awaited<ReturnType<typeof mapLibraries.getAll>>;
export type * from '$static_libs/rgc-chart';