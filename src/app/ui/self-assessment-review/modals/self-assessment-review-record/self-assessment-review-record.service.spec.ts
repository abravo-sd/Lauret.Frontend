import { TestBed } from '@angular/core/testing';

import { SelfAssessmentReviewRecordService } from './self-assessment-review-record.service';

describe('SelfAssessmentReviewRecordService', () => {
  let service: SelfAssessmentReviewRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelfAssessmentReviewRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
