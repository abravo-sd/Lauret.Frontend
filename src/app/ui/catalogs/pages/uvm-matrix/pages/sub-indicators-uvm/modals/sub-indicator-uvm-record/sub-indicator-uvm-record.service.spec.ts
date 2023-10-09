import { TestBed } from '@angular/core/testing';

import { SubIndicatorUvmRecordService } from './sub-indicator-uvm-record.service';

describe('SubIndicatorUvmRecordService', () => {
  let service: SubIndicatorUvmRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubIndicatorUvmRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
