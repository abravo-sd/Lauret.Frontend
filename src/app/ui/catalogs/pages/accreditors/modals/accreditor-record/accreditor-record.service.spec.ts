import { TestBed } from '@angular/core/testing';

import { AccreditorRecordService } from './accreditor-record.service';

describe('AccreditorRecordService', () => {
  let service: AccreditorRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccreditorRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
