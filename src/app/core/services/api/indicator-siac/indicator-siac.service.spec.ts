import { TestBed } from '@angular/core/testing';

import { IndicatorSiacService } from './indicator-siac.service';

describe('IndicatorSiacService', () => {
  let service: IndicatorSiacService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicatorSiacService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
