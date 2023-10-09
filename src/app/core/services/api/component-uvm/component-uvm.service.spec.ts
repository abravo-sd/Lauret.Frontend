import { TestBed } from '@angular/core/testing';

import { ComponentUvmService } from './component-uvm.service';

describe('ComponentUvmService', () => {
  let service: ComponentUvmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentUvmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
