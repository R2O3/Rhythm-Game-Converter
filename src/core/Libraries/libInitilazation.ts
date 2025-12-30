import { createLibraryManager } from '$core/Managers/LibManager';
import { baseLibraries, type BaseLibraries } from '$core/Libraries/baselibs';

export function createLibraries<T extends Record<string, any>>(loader: () => Promise<T>) {
  const specificLibManager = createLibraryManager(loader);
  
  return {
    async initialize() {
      await Promise.all([
        baseLibraries.initialize(),
        specificLibManager.initialize()
      ]);
    },
    
    getBase(): BaseLibraries {
      return baseLibraries.get();
    },
    
    getSpecific(): T {
      return specificLibManager.get();
    },
    
    getAll(): BaseLibraries & T {
      return {
        ...baseLibraries.get(),
        ...specificLibManager.get()
      };
    },
    
    isInitialized(): boolean {
      return baseLibraries.isInitialized() && specificLibManager.isInitialized();
    }
  };
}