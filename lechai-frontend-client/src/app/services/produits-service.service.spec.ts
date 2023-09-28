import { TestBed } from '@angular/core/testing';

import { ProduitsServiceService } from './produits-service.service';

describe('ProduitsServiceService', () => {
  let service: ProduitsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduitsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
