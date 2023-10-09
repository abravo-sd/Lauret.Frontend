import { TestBed } from '@angular/core/testing';

import { CriteriaRecordService } from './criteria-record.service';

describe('CriteriaRecordService', () => {
  let service: CriteriaRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriteriaRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
