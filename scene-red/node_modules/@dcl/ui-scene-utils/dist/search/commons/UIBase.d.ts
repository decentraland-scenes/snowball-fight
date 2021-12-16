/// <reference types="dcl" />
/// <reference types="env" />
export declare abstract class UIBase<T extends UIShape> {
    readonly shape: T;
    constructor(shape: T, initialProperties?: InitialUIProperties<T>);
    protected setProperties(prop: Partial<T>): void;
    protected getProperty<K extends keyof T>(propName: K): T[K];
}
export declare type InitialUIProperties<T extends UIShape> = Partial<T>;
