import { TestBed } from '@angular/core/testing';

import { YieldCalculationService } from './hero.service';

describe('YieldCalculationService', () => {
  let service: YieldCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YieldCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
