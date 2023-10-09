import { TestBed } from '@angular/core/testing';

import { IndicatorUvmRecordService } from './indicator-uvm-record.service';

describe('IndicatorUvmRecordService', () => {
  let service: IndicatorUvmRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicatorUvmRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
