import { Component, Input } from '@angular/core';
import { CatalogueItem } from '../catalogue-item';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-ingredient-item',
  standalone: true,
  imports: [NgIf, NgFor],
  template:`
    <section class="ingredient-component">
      <h1 class="title"> {{ catalogueItem.name}} </h1>
      <div class="type-container">
        <h2><span class="ingredient-header">Source:</span> {{catalogueItem.ingredientSource}}</h2>
        <h2><span class="ingredient-header">Category:</span>   {{catalogueItem.categoryTag}}</h2>
      </div>
      <h2 class="location"><span class="ingredient-header">Location:</span>   {{catalogueItem.location}}</h2>
      <div class="description-container">
        <h3>Description</h3>
        <p>{{catalogueItem.flavourDescription}}</p>
      </div>
      <div class="base-effect-container" >
        <h3>Base Effect</h3>
        <p>{{catalogueItem.baseEffectDescription}} </p>
      </div>
      <div class="base-dc-container">
        <h3>Base DC</h3>
        <p>{{catalogueItem.baseDc}}</p>
      </div>
      <div class="boost-effect-container">
        <h3>Boost Effect</h3>
        <p> {{catalogueItem.boostEffectDescription}} </p>
      </div>
      <div class="boost-dc-container">
        <h2> Boost DC </h2>
        <p> {{catalogueItem.boostDc}} </p>  
      </div>
      <div class="price-container">
        <h3>Market Price</h3>
        <p> {{catalogueItem.marketPrice ?? "-"}}</p>
      </div>
      <div class="tags-container">
        <h1>Effect Tags</h1>
        <p *ngFor="let tag of catalogueItem.effectTags; last as isLast"> {{tag}} <span *ngIf="!isLast">,</span></p>
      </div>
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
