export declare class HashTarget {
    private readonly value;
    private readonly targetElement;
    private constructor();
    static fromString(value: string, document: HTMLDocument): HashTarget;
    getHash(): string;
    getElement(): HTMLElement;
}
