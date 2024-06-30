import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SearchExport, SearchItem } from '../search-item';
import { CurrentParametersComponent } from '../current-parameters/current-parameters.component';
import { SearchSuggestionsComponent } from '../search-suggestions/search-suggestions.component';
import { CatalogueDataService } from '../catalogue-data.service';

@Component({
  selector: 'app-catalogue-search',
  standalone: true,
  imports: [FormsModule, CurrentParametersComponent, SearchSuggestionsComponent],
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
}