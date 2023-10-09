import { TestBed } from '@angular/core/testing';

import { UvmMatrixService } from './uvm-matrix.service';

describe('UvmMatrixService', () => {
  let service: UvmMatrixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UvmMatrixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
