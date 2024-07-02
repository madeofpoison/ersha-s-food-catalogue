import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SearchExport, SearchItem } from '../search-item';
import { CurrentParametersComponent } from '../current-parameters/current-parameters.component';
import { SearchSuggestionsComponent } from '../search-suggestions/search-suggestions.component';
import { CatalogueDataService } from '../catalogue-data.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-catalogue-search',
  standalone: true,
  imports: [FormsModule, CurrentParametersComponent, SearchSuggestionsComponent, NgIf],
  template:`
  <form #catalogueForm="ngForm" >
    <label>
      Name:
      <input type="text" [(ngModel)]="searchItem.nameToSearch" name="nameToSearch"/>
    </label>
    <label>
      Effects:
    <input type="text" [(ngModel)]="searchItem.currentEffectSearchTerm" name="effectsToSearch"/>
    </label>
    <label>
      Categories:
      <input type="text" [(ngModel)]="searchItem.currentCategorySearchTerm" name="categoriesToSearch"/>
    </label>
    <label>
      Location
      <input type="text" [(ngModel)]="searchItem.currentLocationSearchTerm" name="locationsToSearch">
    </label>
    <section *ngIf="isExclusiveSearch">
      <label>
        Base DC:
        <input type="text" [(ngModel)]="searchItem.minBaseDC" name="'minBaseDC"/>
        <input type="text" [(ngModel)]="searchItem.maxBaseDC" name="maxBaseDC" />
        <button (click)="rangeClick()" > Add range </button>
      </label>
      <label>
        Boost DC:
        <input type="text" [(ngModel)]="searchItem.minBoostedDC" name="minBoostedDC" />
        <input type="text" [(ngModel)]="searchItem.maxBoostedDC" name="maxBoostedDC" />
        <button (click)="rangeClick()"> Add range </button>
      </label>
      <label >
        Max Rarity:
        <select name="maxRarity" [(ngModel)]="searchItem.maxRarity">
          <option value="1"> 1 </option>
          <option value="2"> 2 </option>
          <option value="3"> 3 </option>
          <option value="4"> 4 </option>
        </select>
      </label>
      <label>
        Min Rarity:
        <select name="maxRarity" [(ngModel)]="searchItem.minRarity">
          <option value="1"> 1 </option>
          <option value="2"> 2 </option>
          <option value="3"> 3 </option>
          <option value="4"> 4 </option>
        </select>
      </label>
      <button (click)="rarityClick()"> Add rarity range </button>
    </section>
    <button (click)="isExclusiveSearch = !isExclusiveSearch"> Exclusive search toggle </button>

  </form> 
  <app-search-suggestions [currentSearch]="searchItem" [isExclusiveSearch]="isExclusiveSearch"/>
  <app-current-parameters />
  `,
  styleUrl: './catalogue-search.component.css'
})
export class CatalogueSearchComponent  {
  @Input() searchItem : SearchItem = new SearchItem();
  catalogueData: CatalogueDataService = inject(CatalogueDataService);
  isExclusiveSearch: boolean = false;
  rangeClick(): void {
    if(this.isExclusiveSearch) {
      this.catalogueData.reconstructCurrentViewExclusive(this.searchItem.minBaseDC, this.searchItem.maxBaseDC, this.searchItem.minBoostedDC, this.searchItem.maxBoostedDC);
    } else{
      this.catalogueData.reconstructCurrentView(this.searchItem.minBaseDC, this.searchItem.maxBaseDC, this.searchItem.minBoostedDC, this.searchItem.maxBoostedDC);
    }
  }

  rarityClick(): void {
    this.catalogueData.minSearchRarity = this.searchItem.minRarity;
    this.catalogueData.maxSearchRarity = this.searchItem.maxRarity;
    if(this.isExclusiveSearch) {
      this.catalogueData.reconstructCurrentViewExclusive();
    }
    else{
      this.catalogueData.reconstructCurrentView();
    }
  }

}