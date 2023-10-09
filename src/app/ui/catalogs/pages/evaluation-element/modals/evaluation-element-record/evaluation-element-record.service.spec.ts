import { TestBed } from '@angular/core/testing';

import { EvaluationElementRecordService } from './evaluation-element-record.service';

describe('EvaluationElementRecordService', () => {
  let service: EvaluationElementRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationElementRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
