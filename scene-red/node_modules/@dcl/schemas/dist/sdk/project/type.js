"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectType = void 0;
const validation_1 = require("../../validation");
/* @internal */
var ProjectType;
(function (ProjectType) {
    ProjectType["SCENE"] = "scene";
    ProjectType["SMART_ITEM"] = "smart-item";
    ProjectType["PORTABLE_EXPERIENCE"] = "portable-experience";
})(ProjectType = exports.ProjectType || (exports.ProjectType = {}));
/* @internal */
(function (ProjectType) {
    ProjectType.schema = {
        type: 'string',
        enum: Object.values(ProjectType)
    };
    ProjectType.validate = (0, validation_1.generateValidator)(ProjectType.schema);
})(ProjectType = exports.ProjectType || (exports.ProjectType = {}));
//# sourceMappingURL=type.js.map