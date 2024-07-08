import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CatalogueDataService } from '../catalogue-data.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogueItem } from '../catalogue-item';

@Component({
  selector: 'app-ingredient-creation',
  standalone: true,
  imports: [NgFor, FormsModule],
  template: `
    <h1> Enter your ingredient details! </h1>
    <form class="ingredient-creation-form" #entryForm="ngForm" (ngSubmit)="onSubmit()">
      <label>
        Name
        <input type="text" [(ngModel)]="ingredientToCreate.name" [ngModelOptions]="{standalone: true}"/>
      </label> 
      <label>
        Flavour Description:
        <input type="text" [(ngModel)]="ingredientToCreate.flavourDescription" [ngModelOptions]="{standalone: true}"/>
      </label> 
      <label>
        Source:
        <input type="text" [(ngModel)]="ingredientToCreate.ingredientSource" [ngModelOptions]="{standalone: true}"/>
      </label>
      <label>
        Category
        <input type="text" [(ngModel)]="ingredientToCreate.categoryTag" [ngModelOptions]="{standalone: true}"/>
      </label>
      <label>
        Base DC
        <input type="text" [(ngModel)]="ingredientToCreate.baseDc" [ngModelOptions]="{standalone: true}"/>
      </label>
      <label>
        Base Effect
        <input type="text" [(ngModel)]="ingredientToCreate.baseEffectDescription" [ngModelOptions]="{standalone: true}"/>
      </label>
      <label>
        Boost DC 
        <input type="text" [(ngModel)]="ingredientToCreate.boostDc" [ngModelOptions]="{standalone: true}"/>
      </label>
      <label>
        Boost Effect
        <input type="text" [(ngModel)]="ingredientToCreate.boostEffectDescription" [ngModelOptions]="{standalone: true}"/>
      </label>
      <label>
        Location
        <input type="text" [(ngModel)]="ingredientToCreate.location" [ngModelOptions]="{standalone: true}"/>
      </label>
      <label>
        Average Market Price
        <input type="text" [(ngModel)]="ingredientToCreate.marketPrice" [ngModelOptions]="{standalone: true}"/>
      </label>
      <label>
        Rarity
        <select [(ngModel)]="ingredientToCreate.rarity  " [ngModelOptions]="{standalone: true}">
          <option value="1"> 1 </option>
          <option value="2"> 2 </option>
          <option value="3"> 3 </option>
          <option value="4"> 4 </option>
        </select>
      </label>
      <label>
        Add effect tags
        <input type="text" />
        <button *ngFor="let effect of existingEffectTags" (click)="ingredientToCreate.effectTags.push(effect)"> {{effect}} </button>
      </label> 
      <button type="submit"> submit </button> 
    </form>
  `,
  styleUrl: './ingredient-creation.component.css'
})
export class IngredientCreationComponent {

  @Input() isSubmitted!: boolean; 
  @Output() isSubmittedChange = new EventEmitter<boolean>;
  ingredientToCreate: CatalogueItem  = {
    name: "",
    ingredientSource: "",
    flavourDescription: "",
    baseEffectDescription: "",
    baseDc: 0,
    boostEffectDescription: "",
    boostDc: 0,
    rarity: 1,
    marketPrice: 0,
    categoryTag: "",
    effectTags: [],
    location: "",
    imageUrl: "",
  };
  onSubmit() {
    this.catalogueDataService.testData.push(this.ingredientToCreate);
    this.isSubmitted = false;
    this.isSubmittedChange.emit(false);
  }
  catalogueDataService: CatalogueDataService = inject(CatalogueDataService);
  existingEffectTags: string[] = this.catalogueDataService.returnAllEffectTags();
}
