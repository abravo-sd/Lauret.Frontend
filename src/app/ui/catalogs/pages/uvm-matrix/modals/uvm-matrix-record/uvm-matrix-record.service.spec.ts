import { TestBed } from '@angular/core/testing';

import { UvmMatrixRecordService } from './uvm-matrix-record.service';

describe('UvmMatrixRecordService', () => {
  let service: UvmMatrixRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UvmMatrixRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
