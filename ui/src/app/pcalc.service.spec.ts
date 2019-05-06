import { TestBed } from '@angular/core/testing';

import { PCalcService } from './pcalc.service';

describe('PCalcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PCalcService = TestBed.get(PCalcService);
    expect(service).toBeTruthy();
  });
});
