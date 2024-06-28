import { Injectable } from '@angular/core';
import { testData } from './testStuff';
import { CatalogueItem } from './catalogue-item';
import { difficultyClassSearches } from './difficultyClassSearches';
import { MinLengthValidator } from '@angular/forms';

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

    //Checks whether there are any tag filters present; If there are none, it assigns all items in the catalogue to newView and moves on to filtering by
    //DC ranges.
    if(this.selectedCategories.length === 0 && this.selectedEffects.length === 0) {
      newView = this.testData;
    } else{
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
  }
    //Creates and merges arrays based on the entered DC ranges if any are present.
    if(minBaseDC || maxBaseDC||  minBoostedDC || maxBaseDC) {
      const mergedArray: CatalogueItem[] | null = this.searchBoostBase(newView, minBaseDC, maxBaseDC, minBoostedDC, maxBoostedDC); 
      if(mergedArray !=  null)   newView = mergedArray;
      else{
        newView = [];
      }
    }
    this.currentView = newView;
    return;
  }
  constructor() {
    super();
   }
}
