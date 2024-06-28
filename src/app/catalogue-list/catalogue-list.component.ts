import { Component, Input } from '@angular/core';
import { CatalogueItem } from '../catalogue-item';
import { NgFor, NgIf } from '@angular/common';
import { IngredientItemComponent } from '../ingredient-item/ingredient-item.component';

@Component({
  selector: 'app-catalogue-list',
  standalone: true,
  imports: [NgFor, IngredientItemComponent, NgIf],
  template: `
  <button (click)="currentPage = currentPage -1" *ngIf="currentPage!=0"> Back </button>
  <app-ingredient-item [catalogueItem]="currentList[currentPage]" />
  <button (click)="currentPage = currentPage +1" *ngIf="currentPage!=(currentList.length-1)"> Forward </button>
  `,
  styleUrl: './catalogue-list.component.css'
})
export class CatalogueListComponent {
 @Input() currentList!: CatalogueItem[];
 currentPage: number = 0;
}
