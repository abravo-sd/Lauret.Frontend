import { TestBed } from '@angular/core/testing';

import { SubindicatorUvmService } from './subindicator-uvm.service';

describe('SubindicatorUvmService', () => {
  let service: SubindicatorUvmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubindicatorUvmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
