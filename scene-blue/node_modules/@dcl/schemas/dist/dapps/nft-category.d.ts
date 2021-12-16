import { JSONSchema, ValidateFunction } from '../validation';
export declare enum NFTCategory {
    PARCEL = "parcel",
    ESTATE = "estate",
    WEARABLE = "wearable",
    ENS = "ens"
}
export declare namespace NFTCategory {
    const schema: JSONSchema<NFTCategory>;
    const validate: ValidateFunction<NFTCategory>;
}
//# sourceMappingURL=nft-category.d.ts.map