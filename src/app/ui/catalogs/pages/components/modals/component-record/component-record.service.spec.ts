import { TestBed } from '@angular/core/testing';

import { ComponentsRecordService } from './component-record.service';

describe('ComponentsRecordService', () => {
  let service: ComponentsRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentsRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
