/// <reference types="env" />
/// <reference types="dcl" />
export declare function deepMerge<T extends Record<string, any>>(target: T, source: RecursivePartial<T>): T;
export declare type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends Color4 ? T[P] : T[P] extends (infer U)[] ? RecursivePartial<U>[] : T[P] extends object ? RecursivePartial<T[P]> : T[P];
};
