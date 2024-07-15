import { isNgTemplate } from "@angular/compiler";
import { CatalogueItem } from "./catalogue-item";
import { effectSearchClass } from "./effectSearchClass";

export class difficultyClassSearches extends effectSearchClass {
    //To be overriden by superclass

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

    searchBoostBase(newView: CatalogueItem[], minBaseDC?: number, maxBaseDC?: number, minBoostedDC?: number, maxBoostedDC?: number): CatalogueItem[] | null {
        let baseArraysResult: CatalogueItem[] = [];
        let boostArraysResult: CatalogueItem[] = [];
        let mergedArray: CatalogueItem[] = [];
        if(minBaseDC || maxBaseDC) {
            baseArraysResult = newView.filter((item) => this.searchBaseDCRange(item, minBaseDC, maxBaseDC));
        }
        if(minBoostedDC || maxBoostedDC){
            boostArraysResult = newView.filter((item) => this.searchBoostDCRange(item, minBoostedDC, maxBoostedDC));
        }
        if(baseArraysResult.length > 0 && boostArraysResult.length > 0) {
            mergedArray = baseArraysResult.concat(boostArraysResult);
            mergedArray.forEach((item: CatalogueItem, index: number) => {
                if(mergedArray[index+2]){
                    if(item.name === mergedArray[index+2].name) mergedArray.splice((index+2), 1);
                }
                })
            
            console.log(mergedArray);
            return mergedArray ?? null;
        } else if(baseArraysResult.length > 0 && boostArraysResult.length === 0) {
            return baseArraysResult;
        }
        else if(baseArraysResult.length === 0 && boostArraysResult.length > 0) {
            return boostArraysResult;
        }
        else {
            return null;
        }
    }

    constructor () {
        super();
        this.testData = [];
    }   
}