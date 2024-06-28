import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CatalogueListComponent } from './catalogue-list/catalogue-list.component';
import { CatalogueSearchComponent } from './catalogue-search/catalogue-search.component';
import { CatalogueDataService } from './catalogue-data.service';
import { CatalogueItem } from './catalogue-item';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CatalogueListComponent,CatalogueSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ersha-food-catalogue';
  catalogueData : CatalogueDataService = inject(CatalogueDataService);
  
}
