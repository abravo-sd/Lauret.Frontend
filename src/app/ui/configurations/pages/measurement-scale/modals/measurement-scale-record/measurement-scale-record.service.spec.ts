import { TestBed } from '@angular/core/testing';

import { MeasurementScaleRecordService } from './measurement-scale-record.service';

describe('MeasurementScaleService', () => {
  let service: MeasurementScaleRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeasurementScaleRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
