import { TestBed } from '@angular/core/testing';

import { CriteriaCopyService } from './criteria-copy.service';

describe('CriteriaCopyService', () => {
  let service: CriteriaCopyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriteriaCopyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
