import { JSONSchema, ValidateFunction } from '../../validation';
/** @internal */
export declare const SCENE_UPDATE = "SCENE_UPDATE";
/** @internal */
export declare type SceneUpdate = {
    type: typeof SCENE_UPDATE;
    payload: {
        sceneId: string;
        sceneType: string;
    };
};
/** @internal */
export declare namespace SceneUpdate {
    const schema: JSONSchema<SceneUpdate>;
    const validate: ValidateFunction<SceneUpdate>;
}
//# sourceMappingURL=scene-update.d.ts.map