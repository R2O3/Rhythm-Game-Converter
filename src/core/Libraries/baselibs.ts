import { createLibraryManager } from '$core/Managers/LibManager';

export const baseLibraries = createLibraryManager(async () => {
  return {}; // We used to have base libraries but keeping this here for future use
});

export type BaseLibraries = Awaited<ReturnType<typeof baseLibraries.initialize>>;