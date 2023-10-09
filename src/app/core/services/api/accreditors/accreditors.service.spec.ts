import { TestBed } from '@angular/core/testing';

import { AccreditorsService } from './accreditors.service';

describe('AccreditorsService', () => {
  let service: AccreditorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccreditorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
