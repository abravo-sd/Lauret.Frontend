import { TestBed } from '@angular/core/testing';

import { EvidenceLogService } from './evidence-log.service';

describe('EvidenceLogService', () => {
  let service: EvidenceLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvidenceLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
