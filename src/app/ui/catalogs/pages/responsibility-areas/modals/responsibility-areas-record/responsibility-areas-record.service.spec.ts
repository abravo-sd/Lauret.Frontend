import { TestBed } from '@angular/core/testing';

import { ResponsibilityAreasRecordService } from './responsibility-areas-record.service';

describe('ResponsibilityAreasRecordService', () => {
  let service: ResponsibilityAreasRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsibilityAreasRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
