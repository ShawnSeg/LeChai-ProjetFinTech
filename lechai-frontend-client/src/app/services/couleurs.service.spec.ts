import { TestBed } from '@angular/core/testing';

import { CouleursService } from './couleurs.service';

describe('CouleursService', () => {
  let service: CouleursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouleursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
