import { TestBed } from '@angular/core/testing';

import { CyclesServiceV1 } from './cycles.service.v1';

describe('CyclesServiceV1', () => {
  let service: CyclesServiceV1;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CyclesServiceV1);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
