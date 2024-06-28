import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueSearchComponent } from './catalogue-search.component';

describe('CatalogueSearchComponent', () => {
  let component: CatalogueSearchComponent;
  let fixture: ComponentFixture<CatalogueSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogueSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogueSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
