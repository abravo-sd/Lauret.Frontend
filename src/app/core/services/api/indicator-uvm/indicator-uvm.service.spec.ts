import { TestBed } from '@angular/core/testing';

import { IndicatorUvmService } from './indicator-uvm.service';

describe('IndicatorUvmService', () => {
  let service: IndicatorUvmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicatorUvmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
