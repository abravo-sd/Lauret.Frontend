import { TestBed } from '@angular/core/testing';

import { EvidenceViewerService } from './evidence-viewer.service';

describe('EvidenceViewerService', () => {
  let service: EvidenceViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvidenceViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
