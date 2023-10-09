import { TestBed } from '@angular/core/testing';

import { CoporateAreaRecordService } from './coporate-area-record.service';

describe('CoporateAreaRecordService', () => {
  let service: CoporateAreaRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoporateAreaRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
