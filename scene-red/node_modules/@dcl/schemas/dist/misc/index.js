"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPFSv2 = exports.EthAddress = exports.Color3 = void 0;
const __1 = require("..");
/**
 * Color3
 * @alpha
 */
var Color3;
(function (Color3) {
    Color3.schema = {
        type: 'object',
        required: ['r', 'g', 'b'],
        properties: {
            r: {
                type: 'number',
                minimum: 0,
                maximum: 1
            },
            g: {
                type: 'number',
                minimum: 0,
                maximum: 1
            },
            b: {
                type: 'number',
                minimum: 0,
                maximum: 1
            }
        }
    };
    const schemaValidator = (0, __1.generateValidator)(Color3.schema);
    Color3.validate = (color) => schemaValidator(color);
})(Color3 = exports.Color3 || (exports.Color3 = {}));
/**
 * EthAddress
 * @alpha
 */
var EthAddress;
(function (EthAddress) {
    EthAddress.schema = {
        type: 'string',
        pattern: '^0x[a-fA-F0-9]{40}$'
    };
    const schemaValidator = (0, __1.generateValidator)(EthAddress.schema);
    EthAddress.validate = (ethAddress) => schemaValidator(ethAddress);
})(EthAddress = exports.EthAddress || (exports.EthAddress = {}));
/**
 * IPFSv2
 * @alpha
 */
var IPFSv2;
(function (IPFSv2) {
    IPFSv2.schema = {
        type: 'string',
        pattern: '^(ba)[a-zA-Z0-9]{57}$'
    };
    const schemaValidator = (0, __1.generateValidator)(IPFSv2.schema);
    IPFSv2.validate = (hash) => schemaValidator(hash);
})(IPFSv2 = exports.IPFSv2 || (exports.IPFSv2 = {}));
//# sourceMappingURL=index.js.map