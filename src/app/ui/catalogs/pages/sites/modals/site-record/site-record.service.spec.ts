import { TestBed } from '@angular/core/testing';

import { SiteRecordService } from './site-record.service';

describe('SiteRecordService', () => {
  let service: SiteRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
