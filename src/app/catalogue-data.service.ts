import { Injectable } from '@angular/core';
import { testData } from './testStuff';
import { CatalogueItem } from './catalogue-item';
import { difficultyClassSearches } from './difficultyClassSearches';

@Injectable({
  providedIn: 'root'
})
export class CatalogueDataService extends difficultyClassSearches {
  override testData: CatalogueItem[] = testData;


  currentView: CatalogueItem[] = testData;

  
  isItemInArray(item:CatalogueItem, array: CatalogueItem[]): boolean {
    let itemFound: boolean = false;
    array.forEach((element) => {
      if(element.name === item.name) itemFound = true;
      else itemFound = false;
    })
    return itemFound;
  }


    
  reconstructCurrentView(minBaseDC?: number, maxBaseDC?: number, minBoostedDC?: number, maxBoostedDC?: number): void {
    let newView: CatalogueItem[] = [];
    if(this.selectedCategories.length === 0 && this.selectedEffects.length === 0) {
      newView = this.testData;
    }
    testData.forEach((item:CatalogueItem) => {
      this.selectedEffects.forEach((effect) => {
        if(item.effectTags.includes(effect) && !this.isItemInArray(item, newView)) newView.push(item);
        console.log()
      }
      );
      this.selectedCategories.forEach((category) => {
        if(item.categoryTag.includes(category) && !this.isItemInArray(item, newView)) newView.push(item);
      })
    })
    if(minBaseDC || maxBaseDC||  minBoostedDC || maxBaseDC) {
      const baseArraysResult = newView.filter((item) => this.searchBaseDCRange(item, minBaseDC, maxBaseDC));
      const boostArraysResult = newView.filter((item) => this.searchBoostDCRange(item, minBoostedDC, maxBoostedDC));
      console.log(boostArraysResult);
      console.log(baseArraysResult);
      const mergedArray: CatalogueItem[] = baseArraysResult.concat(boostArraysResult);
      mergedArray.forEach((item: CatalogueItem, index: number) => {
        if(mergedArray[index+2]){
          if(item.name === mergedArray[index+2].name) mergedArray.splice((index+2), 1);
        }
      })
      console.log(mergedArray);
      newView = mergedArray;
    }
    this.currentView = newView;
    return;
  }
  constructor() {
    super();
   }
}
