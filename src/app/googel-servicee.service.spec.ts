import { TestBed } from '@angular/core/testing';

import { GoogelServiceeService } from './googel-servicee.service';

describe('GoogelServiceeService', () => {
  let service: GoogelServiceeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogelServiceeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
