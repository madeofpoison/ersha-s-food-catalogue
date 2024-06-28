import { Component, Input } from '@angular/core';
import { CatalogueItem } from '../catalogue-item';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-ingredient-item',
  standalone: true,
  imports: [NgIf, NgFor],
  template:`
    <section class="ingredient-component">
      <h1> {{ catalogueItem.name}} </h1>
      <h2><span class="ingredient-header">Source:</span> {{catalogueItem.ingredientSource}}</h2>
      <h2><span class="ingredient-header">Category:</span>   {{catalogueItem.categoryTag}}</h2>
      <h2><span class="ingredient-header">Location:</span>   {{catalogueItem.location}}</h2>
      <h3>Description</h3>
      <p>{{catalogueItem.flavourDescription}}</p>
      <h3>Base Effect</h3>
      <p>{{catalogueItem.baseEffectDescription}}
      <h3>Base DC</h3>
      <p>{{catalogueItem.baseDc}}</p>
      <h3>Boost Effect</h3>
      <p> {{catalogueItem.boostEffectDescription}} </p>
      <h2> Boost DC </h2>
      <p> {{catalogueItem.boostDc}} </p>
      <h3>Market Price</h3>
      <p> {{catalogueItem.marketPrice ?? "-"}}</p>
      <h1>Effect Tags (Debugging purposes)</h1>
      <p *ngFor="let tag of catalogueItem.effectTags; last as isLast"> {{tag}} <span *ngIf="!isLast">,</span></p>
      <div class="ingredient-image-container">
        <img [src]="catalogueItem.imageUrl">
      </div>
    </section>
  `,
  styleUrl: './ingredient-item.component.css'
})
export class IngredientItemComponent {
  @Input() catalogueItem!: CatalogueItem;
  isCollapsed: boolean = false;
}
