import { TestBed } from '@angular/core/testing';

import { EvidenceTypeService } from './evidence-type.service';

describe('EvidenceTypeService', () => {
  let service: EvidenceTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvidenceTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
