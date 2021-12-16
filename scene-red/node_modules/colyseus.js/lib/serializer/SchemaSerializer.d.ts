import { Serializer } from "./Serializer";
import { Schema, Iterator } from "@colyseus/schema";
export declare type SchemaConstructor<T = Schema> = new (...args: any[]) => T;
export declare class SchemaSerializer<T extends Schema = any> implements Serializer<T> {
    state: T;
    setState(rawState: any): void;
    getState(): T;
    patch(patches: any): void;
    teardown(): void;
    handshake(bytes: number[], it?: Iterator): void;
}
