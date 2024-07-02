export class SearchItem {
    nameToSearch: string | null;
    categoriesToSearch: string[];
    effectsToSearch: string[];
    currentEffectSearchTerm: string| null = null;
    currentCategorySearchTerm: string | null = null;
    currentLocationSearchTerm: string | null = null;
    effectsTags:string[] = [];
    categoriesTags:string[] = [];
    minBaseDC: number = 0;
    maxBaseDC: number = 0;
    minBoostedDC: number = 0;
    maxBoostedDC: number = 0;
    maxRarity: number = 0;
    minRarity: number = 0;

    constructor() {
        this.nameToSearch = null;
        this.categoriesToSearch = [];
        this.effectsToSearch = [];
    }

    exportSearch(): SearchExport {
        return {
            effectSearch: this.currentEffectSearchTerm,
            categorySearch: this.currentCategorySearchTerm
        }
    }


}

export interface SearchExport {
    effectSearch: string | null,
    categorySearch: string | null
}
export interface dcSearchRanges {
    baseDCs: {
        max: number,
        min: number

    }

    boostDCs: {
        max: number,
        min: number
    }
}