import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { CatalogueItem } from '../catalogue-item';
import { NgFor, NgIf } from '@angular/common';
import { IngredientItemComponent } from '../ingredient-item/ingredient-item.component';

@Component({
  selector: 'app-catalogue-list',
  standalone: true,
  imports: [NgFor, IngredientItemComponent, NgIf],
  template: `
  <section *ngIf="!isScrollView; else scrollView">
    <button (click)="currentPage = currentPage -1" *ngIf="currentPage!=0"> Back </button>
      <app-ingredient-item [catalogueItem]="currentList[currentPage]" />
    <button (click)="currentPage = currentPage +1" *ngIf="currentPage!=(currentList.length-1)"> Forward </button>
  </section>
  <ng-template #scrollView>
    <section  class="ingredient-scroll-view">
      <app-ingredient-item *ngFor="let currentItem of currentList" [catalogueItem]="currentItem" /> 
    </section>
  </ng-template>
  `,
  styleUrl: './catalogue-list.component.css'
})
export class CatalogueListComponent implements OnChanges{
 @Input() currentList!: CatalogueItem[];
 @Input() isScrollView!: boolean;
 currentPage: number = 0; 

 ngOnChanges(changes: SimpleChanges): void {
     this.currentPage = 0;
 }
}
