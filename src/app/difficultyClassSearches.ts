import { isNgTemplate } from "@angular/compiler";
import { CatalogueItem } from "./catalogue-item";
import { effectSearchClass } from "./effectSearchClass";

export class difficultyClassSearches extends effectSearchClass {
    //To be overriden by superclass
     override testData: CatalogueItem[]; 
     minBaseDC?: number;
     maxBaseDC?: number;
     minBoostedDC?: number;
     maxBoostedDC?: number
    //These are meant to be implemented within the reconstructView function as a filter to return a function of items that satisfy the DC range
    searchBaseDCRange(item:CatalogueItem, lowerLimit?: number, upperLimit?: number): boolean { 
        if(lowerLimit && upperLimit) {
            return (item.baseDc >= lowerLimit) && (item.baseDc <= upperLimit);
        } else if(!lowerLimit && upperLimit) {
            return (item.baseDc <= upperLimit);
        } else if(lowerLimit && !upperLimit) {
            return (item.baseDc >= lowerLimit);
        } else{
            return false;
        }
    }

    searchBoostDCRange(item: CatalogueItem, lowerLimit?: number, upperLimit?: number): boolean {
        if(lowerLimit && upperLimit) {
            return (item.baseDc >= lowerLimit) && (item.baseDc <= upperLimit);
        } else if(!lowerLimit && upperLimit) {
            return (item.baseDc <= upperLimit);
        } else if(lowerLimit && !upperLimit) {
            return (item.baseDc >= lowerLimit);
        } else{
            return false;
        }
    }

    constructor () {
        super();
        this.testData = [];
    }   
}