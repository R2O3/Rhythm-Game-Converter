export function createLibraryManager<T>(loader: () => Promise<T>) {
  let libs: T | null = null;
  
  return {
    async initialize(): Promise<T> {
      if (libs) return libs;
      libs = await loader();
      return libs;
    },
    
    get(): T {
      if (!libs) {
        throw new Error('Libraries not initialized. Call initialize() first');
      }
      return libs;
    },
    
    isInitialized(): boolean {
      return libs !== null;
    },
    
    reset(): void {
      libs = null;
    }
  };
}