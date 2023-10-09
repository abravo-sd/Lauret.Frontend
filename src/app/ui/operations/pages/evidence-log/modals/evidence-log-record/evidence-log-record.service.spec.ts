import { TestBed } from '@angular/core/testing';

import { EvidenceLogRecordService } from './evidence-log-record.service';

describe('EvidenceLogRecordService', () => {
  let service: EvidenceLogRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvidenceLogRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
