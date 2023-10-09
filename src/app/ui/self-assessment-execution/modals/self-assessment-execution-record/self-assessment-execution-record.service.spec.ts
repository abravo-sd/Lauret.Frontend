import { TestBed } from '@angular/core/testing';

import { SelfAssessmentExecutionRecordService } from './self-assessment-execution-record.service';

describe('SelfAssessmentExecutionRecordService', () => {
  let service: SelfAssessmentExecutionRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelfAssessmentExecutionRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
