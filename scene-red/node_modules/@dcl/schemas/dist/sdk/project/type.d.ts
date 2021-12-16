import { JSONSchema, ValidateFunction } from '../../validation';
export declare enum ProjectType {
    SCENE = "scene",
    SMART_ITEM = "smart-item",
    PORTABLE_EXPERIENCE = "portable-experience"
}
export declare namespace ProjectType {
    const schema: JSONSchema<ProjectType>;
    const validate: ValidateFunction<ProjectType>;
}
//# sourceMappingURL=type.d.ts.map