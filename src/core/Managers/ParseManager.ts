export interface ParseEntry<T> {
    readonly data: T;
    readonly originalPath: string;
}

export class ParseManager<T> {
    private root: string;
    private entries: ParseEntry<T>[] = [];
    private entriesByKey = new Map<string, ParseEntry<T>[]>();

    constructor(root: string) {
        this.root = root;
    }

    addEntry(key: string, originalPath: string, data: T): void {
        const entry: ParseEntry<T> = { data, originalPath };
        this.entries.push(entry);
        
        const group = this.entriesByKey.get(key) || [];
        group.push(entry);
        this.entriesByKey.set(key, group);
    }

    getEntries(key?: string): readonly ParseEntry<T>[] {
        if (key) return this.entriesByKey.get(key) || [];
        return this.entries;
    }

    getKeys(): readonly string[] {
        return Array.from(this.entriesByKey.keys());
    }

    clear(): this {
        this.entries = [];
        this.entriesByKey.clear();
        return this;
    }
}
