import { TestBed } from '@angular/core/testing';

import { AccessTypeService } from './access-type.service';

describe('AccessTypeService', () => {
  let service: AccessTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
