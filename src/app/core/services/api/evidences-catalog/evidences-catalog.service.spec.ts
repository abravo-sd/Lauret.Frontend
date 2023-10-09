import { TestBed } from '@angular/core/testing';

import { EvidencesCatalogService } from './evidences-catalog.service';

describe('EvidencesService', () => {
  let service: EvidencesCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvidencesCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
