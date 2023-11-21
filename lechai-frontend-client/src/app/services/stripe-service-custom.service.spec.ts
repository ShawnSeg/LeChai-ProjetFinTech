import { TestBed } from '@angular/core/testing';

import { StripeServiceCustomService } from './stripe-service-custom.service';

describe('StripeServiceCustomService', () => {
  let service: StripeServiceCustomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StripeServiceCustomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
