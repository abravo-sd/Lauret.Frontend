import { TestBed } from '@angular/core/testing';

import { NormativeService } from './normative.service';

describe('NormativeService', () => {
  let service: NormativeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NormativeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
