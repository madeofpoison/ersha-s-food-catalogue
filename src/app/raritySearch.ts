import { CatalogueItem } from "./catalogue-item";

export class RaritySearch {
    testData: CatalogueItem[] = [];
    minSearchRarity?: number;
    maxSearchRarity?: number;

    
    searchRarityRange(arrayToFilter: CatalogueItem[]): CatalogueItem[] | null{
        let arrayToReturn: CatalogueItem[] | null;
        if(this.minSearchRarity && this.maxSearchRarity) {
            arrayToReturn =arrayToFilter.filter((item) => this.minSearchRarity! <= item.rarity && this.maxSearchRarity! >= item.rarity )
        } else if(this.minSearchRarity) {
           arrayToReturn = arrayToFilter.filter((item) => this.minSearchRarity! <= item.rarity);
        } else if(this.maxSearchRarity){
            arrayToReturn = arrayToFilter.filter((item) => this.maxSearchRarity! >= item.rarity);
        } else {
            arrayToReturn = null;
        }
        return arrayToReturn;
    }
    
}