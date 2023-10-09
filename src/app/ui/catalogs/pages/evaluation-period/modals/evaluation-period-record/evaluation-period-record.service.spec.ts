import { TestBed } from '@angular/core/testing';

import { EvaluationPreiodRecordService } from './evaluation-period-record.service';

describe('EvaluationPreiodRecordService', () => {
  let service: EvaluationPreiodRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationPreiodRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
