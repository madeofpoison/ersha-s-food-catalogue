import { Component, DoCheck, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges, inject } from '@angular/core';
import { SearchExport, SearchItem } from '../search-item';
import { CatalogueDataService } from '../catalogue-data.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-search-suggestions',
  standalone: true,
  imports: [NgFor, NgIf],
  template:`
  <h2> Effects </h2>
  <button *ngFor="let effect of suggestedEffects" (click)="onClickEffect(effect)">{{effect}}</button>
  <h2> Categories </h2>
  <button *ngFor="let category of suggestedCategories" (click)="onClickCategory(category)"> {{category}} </button>
  <h2> {{currentSearch.minBaseDC}} </h2>
  `,
  styleUrl: './search-suggestions.component.css'
})
export class SearchSuggestionsComponent implements DoCheck {
  @Input() currentSearch!: SearchItem;
  @Input() isExclusiveSearch!: boolean;
  catalogueDataService: CatalogueDataService = inject(CatalogueDataService);
  suggestedEffects: string[] = this.catalogueDataService.allEffects;
  suggestedCategories: string[] = this.catalogueDataService.allCategories;
  
  onClickEffect(effectName: string): void {
      this.catalogueDataService.addToSelectedEffects(effectName);
      if(!this.isExclusiveSearch) {
        this.catalogueDataService.reconstructCurrentView();
      }
      else{
        this.catalogueDataService.reconstructCurrentViewExclusive();
      }
  }

  onClickCategory(categoryName: string): void {
    this.catalogueDataService.addToSelectedCategories(categoryName);
    this.catalogueDataService.reconstructCurrentView();
  }
  ngDoCheck(): void {
    if(this.currentSearch.currentEffectSearchTerm) this.suggestedEffects =
     this.catalogueDataService.searchForPossibleEffects(this.currentSearch.currentEffectSearchTerm);


    if(!this.currentSearch.currentEffectSearchTerm) this.suggestedEffects = this.catalogueDataService.returnAllEffectTags(); 


    if(this.currentSearch.currentCategorySearchTerm) this.suggestedCategories =
      this.catalogueDataService.searchForPossibleCategories(this.currentSearch.currentCategorySearchTerm);


    if(!this.currentSearch.currentCategorySearchTerm) this.suggestedCategories = this.catalogueDataService.returnAllCategoryTags();


   
  }
}
