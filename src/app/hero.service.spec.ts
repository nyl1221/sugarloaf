import { TestBed } from '@angular/core/testing';

import { YieldFormulaService } from './hero.service';

describe('YieldFormulaService', () => {
  let service: YieldFormulaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YieldFormulaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
