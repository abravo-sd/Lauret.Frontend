import { TestBed } from '@angular/core/testing';

import { CapturingGoalsAndResultsRecordService } from './capturing-goals-and-results-record.service';

describe('CapturingGoalsAndResultsRecordService', () => {
  let service: CapturingGoalsAndResultsRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapturingGoalsAndResultsRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
