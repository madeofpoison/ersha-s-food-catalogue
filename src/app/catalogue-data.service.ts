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
    if(this.selectedCategories.length === 0 && this.selectedEffects.length === 0 && this.selectedLocations.length === 0) {
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
        });
        this.selectedLocations.forEach((location) => {
          if(item.location === location && !this.isItemInArray(item, newView)) newView.push(item);
         })
      })
  }
    //Creates and merges arrays based on the entered DC ranges if any are present. This case should only trigger on
    //a click of the "Add Range" button
    if(minBaseDC || maxBaseDC||  minBoostedDC || maxBaseDC) {
      
      if(minBaseDC) this.minBaseDC = minBaseDC ?? 0;
      if(maxBaseDC) this.maxBaseDC = maxBaseDC ?? 0;
      if(minBoostedDC) this.minBoostedDC = minBoostedDC ?? 0;
      if(maxBoostedDC) this.maxBoostedDC = maxBoostedDC ?? 0;
      const mergedArray: CatalogueItem[] | null = this.searchBoostBase(newView, minBaseDC, maxBaseDC, minBoostedDC, maxBoostedDC); 
      if(mergedArray !=  null)   newView = mergedArray;
      else{
        newView = [];
      }
    } else if(this.minBaseDC || this.maxBaseDC || this.minBoostedDC || this.maxBaseDC) {
      const mergedArray: CatalogueItem[] | null = this.searchBoostBase(newView, this.minBaseDC, this.maxBaseDC, this.minBoostedDC, this.maxBoostedDC); 
      if(mergedArray !=  null)   newView = mergedArray;
      else{
        newView = [];
      }
    }
    this.currentView = newView;
    return;
  }


  //Reconstructs current view using a more exclusive search.
  reconstructCurrentViewExclusive(minBaseDC?: number, maxBaseDC?: number, minBoostedDC?: number, maxBoostedDC?: number): void {
    let newView: CatalogueItem[] = [];
    const itemsByMatchingEffects: string[] = [];
    const itemsByMatchingCategories: string[] = [];
    const itemsByMatchingLocations: string[] = [];
    if(this.selectedCategories.length === 0 && this.selectedEffects.length === 0 && this.selectedLocations.length === 0) {
      newView = this.testData;
    } else{
      testData.forEach((item:CatalogueItem) => {
        for(let effect of item.effectTags) {
          if(this.selectedEffects.includes(effect)) {
            itemsByMatchingEffects.push(item.name);
            break;
          }
        }
        if(this.selectedCategories.includes(item.categoryTag)) itemsByMatchingCategories.push(item.name);
        if(item.location) if(this.selectedLocations.includes(item.location)) itemsByMatchingLocations.push(item.name);
      })

      if(itemsByMatchingCategories.length > 0 && itemsByMatchingEffects.length > 0 ) {
        if(itemsByMatchingCategories.length > itemsByMatchingEffects.length) {
          itemsByMatchingEffects.forEach((item) => {
            if(itemsByMatchingCategories.includes(item)) newView.push(this.testData.find((ingredient) => ingredient.name === item)!)
          })
        } else {
          itemsByMatchingCategories.forEach((item) => {
            if(itemsByMatchingEffects.includes(item)) newView.push(this.testData.find((ingredient) => ingredient.name === item)!)
          })
        }
      } else if(itemsByMatchingCategories.length) {
        itemsByMatchingCategories.forEach((categoryName) => newView.push(this.testData.find((ingredient) => ingredient.name === categoryName)!));

      } else if(itemsByMatchingEffects.length){
        itemsByMatchingEffects.forEach((categoryName) => newView.push(this.testData.find((ingredient) => ingredient.name === categoryName)!))
      }
      if(itemsByMatchingLocations.length) {
        newView = newView.filter((item) => {
          let isMatchingLocation  = false;
          this.selectedLocations.forEach((location) => {

            if(item.location === location) isMatchingLocation = true;
            console.log(isMatchingLocation);
          });
          return isMatchingLocation;
      })
  }
  }
  if(minBaseDC || maxBaseDC||  minBoostedDC || maxBaseDC) {

    if(minBaseDC) this.minBaseDC = minBaseDC ?? 0;
    if(maxBaseDC) this.maxBaseDC = maxBaseDC ?? 0;
    if(minBoostedDC) this.minBoostedDC = minBoostedDC ?? 0;
    if(maxBoostedDC) this.maxBoostedDC = maxBoostedDC ?? 0;
    const mergedArray: CatalogueItem[] | null = this.searchBoostBase(newView, minBaseDC, maxBaseDC, minBoostedDC, maxBoostedDC); 
    if(mergedArray !=  null)   newView = mergedArray;
    else{
      newView = [];
    }
  } else if(this.minBaseDC || this.maxBaseDC || this.minBoostedDC || this.maxBaseDC) {

    const mergedArray: CatalogueItem[] | null = this.searchBoostBase(newView, this.minBaseDC, this.maxBaseDC, this.minBoostedDC, this.maxBoostedDC); 
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
