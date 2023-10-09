import { TestBed } from '@angular/core/testing';

import { RegionRecordService } from './region-record.service';

describe('RegionRecordService', () => {
  let service: RegionRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegionRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
