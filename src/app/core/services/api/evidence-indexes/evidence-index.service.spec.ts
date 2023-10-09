import { TestBed } from '@angular/core/testing';

import { EvidenceIndexService } from './evidence-index.service';

describe('EvidenceIndexService', () => {
  let service: EvidenceIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvidenceIndexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
