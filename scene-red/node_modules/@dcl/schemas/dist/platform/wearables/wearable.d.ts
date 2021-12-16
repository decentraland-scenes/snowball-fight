import { JSONSchema, ValidateFunction } from '../../validation';
import { Rarity } from '../../dapps/rarity';
import { WearableCategory } from '../../dapps/wearable-category';
import { I18N } from './i18n';
import { WearableRepresentation } from './representation';
import { Metrics } from './metrics';
/** @alpha */
export declare type Wearable = {
    id: string;
    descriptions: I18N[];
    collectionAddress: string;
    rarity: Rarity;
    names: I18N[];
    data: {
        replaces: WearableCategory[];
        hides: WearableCategory[];
        tags: string[];
        representations: WearableRepresentation[];
        category: WearableCategory;
    };
    thumbnail: string;
    image: string;
    metrics?: Metrics;
};
/** @alpha */
export declare namespace Wearable {
    const schema: JSONSchema<Wearable>;
    const validate: ValidateFunction<Wearable>;
}
//# sourceMappingURL=wearable.d.ts.map