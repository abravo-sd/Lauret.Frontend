import { TestBed } from '@angular/core/testing';

import { ComponentUvmRecordService } from './component-uvm-record.service';

describe('ComponentUvmRecordService', () => {
  let service: ComponentUvmRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentUvmRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
