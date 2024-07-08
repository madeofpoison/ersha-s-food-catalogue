import { NgFor } from '@angular/common';
import { Component, DoCheck, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CatalogueDataService } from '../catalogue-data.service';

@Component({
  selector: 'app-current-parameters',
  standalone: true,
  imports: [NgFor],
  template:`
  <h1>Selected Effects</h1>
  <div *ngFor="let effect of this.catalogueDataService.selectedEffects">
    <p>{{effect}}</p>
    <button (click)="onClick(effect, false)"> X </button>
  </div>
  <h1>Selected Categories</h1>
  <div *ngFor="let category of catalogueDataService.selectedCategories">
    <p>{{category}}</p>
    <button (click)="onClick(category, true)"> X </button>
  </div>
  <h1>Selected Locations</h1>
  <div *ngFor="let location of this.catalogueDataService.selectedLocations">
    <p>{{location}}</p>
    <button (click)="onClick(location, true)"> X </button>
  </div>
  `, 
  styleUrl: './current-parameters.component.css'
})
export class CurrentParametersComponent {
  catalogueDataService: CatalogueDataService = inject(CatalogueDataService);


  
  onClick(name: string, isCategory: boolean): void {
    if(isCategory) {
      this.catalogueDataService.removeCategory(name);
      this.catalogueDataService.reconstructCurrentView();
      return;
    } 
    this.catalogueDataService.removeEffect(name);
    this.catalogueDataService.reconstructCurrentView();
    return;
  }
  /*
  ngDoCheck(): void {
      if(this.filterReset) {
        //Please remove later;
        console.log('i am in great pain.');
        this.selectedCategoryTags = [];
        this.selectedEffectTags = [];
        this.selectedLocationTags = [];
      }
  }
      */
}
