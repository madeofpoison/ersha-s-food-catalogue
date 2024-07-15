import { Component, DoCheck, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges, inject } from '@angular/core';
import { SearchExport, SearchItem } from '../search-item';
import { CatalogueDataService } from '../catalogue-data.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-search-suggestions',
  standalone: true,
  imports: [NgFor, NgIf],
  template:`
  <div id="suggested-effects">
    <h2> Effects </h2>
    <div class="search-button-box">
      <button *ngFor="let effect of suggestedEffects" (click)="onClickEffect(effect)">{{effect}}</button>
    </div>
  </div>
  <div id="suggested-categories">
    <h2> Categories </h2>
    <div class="search-button-box"> 
      <button *ngFor="let category of suggestedCategories" (click)="onClickCategory(category)"> {{category}} </button>
    </div>
  </div>
  <div id="suggested-locations">
    <h2> Locations </h2>
    <div class="search-button-box">
      <button *ngFor="let location of suggestedLocations" (click)="onClickLocation(location)"> {{location}} </button>
    </div>
  </div>
  `,
  styleUrl: './search-suggestions.component.css'
})
export class SearchSuggestionsComponent implements DoCheck {
  @Input() currentSearch!: SearchItem;
  @Input() isExclusiveSearch!: boolean;
  catalogueDataService: CatalogueDataService = inject(CatalogueDataService);
  suggestedEffects: string[] = this.catalogueDataService.allEffects;
  suggestedCategories: string[] = this.catalogueDataService.allCategories;
  suggestedLocations: string[] = this.catalogueDataService.allLocations;
  

  reconstructView() {
    if(!this.isExclusiveSearch) {
      this.catalogueDataService.reconstructCurrentView();
    }
    else{
      this.catalogueDataService.reconstructCurrentViewExclusive();
    }
  }
  onClickEffect(effectName: string): void {
      this.catalogueDataService.addToSelectedEffects(effectName);
      this.reconstructView();
  }

  onClickCategory(categoryName: string): void {
    this.catalogueDataService.addToSelectedCategories(categoryName);
    this.reconstructView();
  }
  onClickLocation(locationName: string): void {
    this.catalogueDataService.addToSelectedLocations(locationName);
    this.reconstructView();
  }


  ngDoCheck(): void {
    if(this.currentSearch.currentEffectSearchTerm) this.suggestedEffects =
     this.catalogueDataService.searchForPossibleEffects(this.currentSearch.currentEffectSearchTerm);


    if(!this.currentSearch.currentEffectSearchTerm) this.suggestedEffects = this.catalogueDataService.returnAllEffectTags(); 


    if(this.currentSearch.currentCategorySearchTerm) this.suggestedCategories =
      this.catalogueDataService.searchForPossibleCategories(this.currentSearch.currentCategorySearchTerm);


    if(!this.currentSearch.currentCategorySearchTerm) this.suggestedCategories = this.catalogueDataService.returnAllCategoryTags();

    if(this.currentSearch.currentLocationSearchTerm) this.suggestedLocations = 
    this.catalogueDataService.searchForPossibleLocations(this.currentSearch.currentLocationSearchTerm);
    else this.suggestedLocations = this.catalogueDataService.returnAllLocations();
  }
}
