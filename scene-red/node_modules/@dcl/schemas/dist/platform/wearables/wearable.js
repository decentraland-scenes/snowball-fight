"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wearable = void 0;
const validation_1 = require("../../validation");
const rarity_1 = require("../../dapps/rarity");
const wearable_category_1 = require("../../dapps/wearable-category");
const i18n_1 = require("./i18n");
const representation_1 = require("./representation");
const metrics_1 = require("./metrics");
/** @alpha */
var Wearable;
(function (Wearable) {
    Wearable.schema = {
        type: 'object',
        properties: {
            id: {
                type: 'string'
            },
            descriptions: {
                type: 'array',
                items: i18n_1.I18N.schema,
                minItems: 1
            },
            collectionAddress: {
                type: 'string'
            },
            rarity: rarity_1.Rarity.schema,
            names: {
                type: 'array',
                items: i18n_1.I18N.schema,
                minItems: 1
            },
            data: {
                type: 'object',
                properties: {
                    replaces: {
                        type: 'array',
                        items: wearable_category_1.WearableCategory.schema
                    },
                    hides: {
                        type: 'array',
                        items: wearable_category_1.WearableCategory.schema
                    },
                    tags: {
                        type: 'array',
                        items: {
                            type: 'string',
                            minLength: 1
                        }
                    },
                    representations: {
                        type: 'array',
                        items: representation_1.WearableRepresentation.schema,
                        minItems: 1
                    },
                    category: wearable_category_1.WearableCategory.schema
                },
                additionalProperties: false,
                required: ['replaces', 'hides', 'tags', 'representations', 'category']
            },
            thumbnail: {
                type: 'string'
            },
            image: {
                type: 'string'
            },
            metrics: {
                ...metrics_1.Metrics.schema,
                nullable: true
            }
        },
        additionalProperties: false,
        required: [
            'id',
            'descriptions',
            'collectionAddress',
            'rarity',
            'names',
            'data',
            'thumbnail',
            'image'
        ]
    };
    const schemaValidator = (0, validation_1.generateValidator)(Wearable.schema);
    Wearable.validate = (wearable) => schemaValidator(wearable) &&
        validateDuplicatedLocales(wearable.descriptions) &&
        validateDuplicatedLocales(wearable.names);
    // Returns true only if there are no entries with the same locale
    const validateDuplicatedLocales = (i18ns) => i18ns.every(({ code }, index) => i18ns.findIndex((i18n) => i18n.code === code) === index);
})(Wearable = exports.Wearable || (exports.Wearable = {}));
//# sourceMappingURL=wearable.js.map