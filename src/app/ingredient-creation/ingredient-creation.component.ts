import { Component, inject } from '@angular/core';
import { CatalogueDataService } from '../catalogue-data.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-ingredient-creation',
  standalone: true,
  imports: [NgFor],
  template: `
    <h1> Enter your ingredient details! </h1>
    <form class="ingredient-creation-form">
      <label>
        Name
        <input type="text" />
      </label> 
      <label>
        Flavour Description:
        <input type="text" />
      </label> 
      <label>
        Source:
        <input type="text" />
      </label>
      <label>
        Category
        <input type="text" />
      </label>
      <label>
        Base DC
        <input type="text" />
      </label>
      <label>
        Base Effect
        <input type="text" />
      </label>
      <label>
        Boost DC 
        <input type="text" />
      </label>
      <label>
        Boost Effect
        <input type="text" />
      </label>
      <label>
        Location
        <input type="text" />
      </label>
      <label>
        Average Market Price
        <input type="text" />
      </label>
      <label>
        Rarity
        <select>
          <option value="1"> 1 </option>
          <option value="2"> 2 </option>
          <option value="3"> 3 </option>
          <option value="4"> 4 </option>
        </select>
      </label>
      <label>
        Add effect tags
        <button *ngFor="let effect of existingEffectTags"> {{effect}} </button>
      </label> 
    </form>
  `,
  styleUrl: './ingredient-creation.component.css'
})
export class IngredientCreationComponent {
  catalogueDataService: CatalogueDataService = inject(CatalogueDataService);
  existingEffectTags: string[] = this.catalogueDataService.returnAllEffectTags();
}
