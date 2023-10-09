import { TestBed } from '@angular/core/testing';

import { EvaluationPeriodService } from './evaluation-period.service';

describe('EvaluationPeriodService', () => {
  let service: EvaluationPeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationPeriodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
