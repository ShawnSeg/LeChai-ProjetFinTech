import { TestBed } from '@angular/core/testing';

import { TokenHandlingService } from './token-handling.service';

describe('TokenHandlingService', () => {
  let service: TokenHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
