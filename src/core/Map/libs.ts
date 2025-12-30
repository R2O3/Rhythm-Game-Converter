import { createLibraries } from '$core/Libraries/libInitilazation';

export const mapLibraries = createLibraries(async () => {
  const rgcChart = await import('$static_libs/rgc-chart');
  
  if (typeof rgcChart.default === 'function') {
      await rgcChart.default();
  }
  
  return {
    rgcChart: rgcChart
  };
});

export type MapLibraries = Awaited<ReturnType<typeof mapLibraries.getAll>>;
export type * from '$static_libs/rgc-chart';