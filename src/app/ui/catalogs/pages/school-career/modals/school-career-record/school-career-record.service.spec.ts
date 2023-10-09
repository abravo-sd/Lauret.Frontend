import { TestBed } from '@angular/core/testing';

import { SchoolCareerRecordService } from './school-career-record.service';

describe('SchoolCareerRecordService', () => {
  let service: SchoolCareerRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolCareerRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
