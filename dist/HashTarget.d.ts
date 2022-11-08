export declare class HashTarget {
    private readonly value;
    private constructor();
    static fromString(value: string): HashTarget;
    getHash(): string;
    getRefElement(document: HTMLDocument): HTMLElement;
}
