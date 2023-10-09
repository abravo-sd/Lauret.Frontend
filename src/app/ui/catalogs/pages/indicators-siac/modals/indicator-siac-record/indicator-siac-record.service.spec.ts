import { TestBed } from '@angular/core/testing';

import { IndicatorSiacRecordService } from './indicator-siac-record.service';

describe('IndicatorSiacRecordService', () => {
  let service: IndicatorSiacRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicatorSiacRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
