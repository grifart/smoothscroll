export declare class Hash {
    private readonly value;
    private constructor();
    static fromString(value: string): Hash;
    getValue(): string;
    findTargetElementIn(document: HTMLDocument): HTMLElement;
}
