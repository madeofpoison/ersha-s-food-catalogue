import { TestBed } from '@angular/core/testing';

import { CatalogueDataService } from './catalogue-data.service';

describe('CatalogueDataService', () => {
  let service: CatalogueDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogueDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
