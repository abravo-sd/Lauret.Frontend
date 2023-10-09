import { TestBed } from '@angular/core/testing';

import { CampusRecordService } from './campus-record.service';

describe('CampusRecordService', () => {
  let service: CampusRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampusRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
