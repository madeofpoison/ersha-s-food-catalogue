export interface CatalogueItem {
    name: string,
    ingredientSource: string,
    flavourDescription: string,
    baseEffectDescription: string,
    baseDc: number,
    boostEffectDescription: string,
    boostDc: number,
    marketPrice?: number,
    categoryTag: string,
    effectTags: string[],
    location?: string,
    imageUrl?: string,
}
