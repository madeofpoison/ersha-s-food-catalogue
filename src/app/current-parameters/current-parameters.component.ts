import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CatalogueDataService } from '../catalogue-data.service';

@Component({
  selector: 'app-current-parameters',
  standalone: true,
  imports: [NgFor],
  template:`
  <h1>Selected Effects</h1>
  <div *ngFor="let effect of selectedEffectTags">
    <p>{{effect}}</p>
    <button (click)="onClick(effect, false)"> X </button>
  </div>
  <h1>Selected Categories</h1>
  <div *ngFor="let category of selectedCategoryTags">
    <p>{{category}}</p>
    <button (click)="onClick(category, true)"> X </button>
  </div>
  `, 
  styleUrl: './current-parameters.component.css'
})
export class CurrentParametersComponent {
  catalogueDataService: CatalogueDataService = inject(CatalogueDataService);
  selectedEffectTags: string[] = this.catalogueDataService.selectedEffects;
  selectedCategoryTags: string[] = this.catalogueDataService.selectedCategories;
  
  onClick(name: string, isCategory: boolean): void {
    if(isCategory) {
      this.catalogueDataService.removeCategory(name);
      return;
    } 
    this.catalogueDataService.removeEffect(name);
    this.catalogueDataService.reconstructCurrentView();
    return;
  }

}
