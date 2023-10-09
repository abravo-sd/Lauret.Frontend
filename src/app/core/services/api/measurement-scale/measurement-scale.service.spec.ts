import { TestBed } from '@angular/core/testing';

import { MeasurementScaleService } from './measurement-scale.service';

describe('MeasurementScaleService', () => {
  let service: MeasurementScaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeasurementScaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
