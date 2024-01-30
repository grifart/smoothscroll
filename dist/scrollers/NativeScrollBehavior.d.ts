declare class NativeScrollBehavior {
    private readonly rootEl;
    private originalValue;
    private constructor();
    static forWindowObject(): NativeScrollBehavior;
    remove(): void;
    restore(): void;
}
export declare const nativeScrollBehavior: NativeScrollBehavior;
export {};
