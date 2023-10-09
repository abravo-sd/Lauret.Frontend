import { TestBed } from '@angular/core/testing';

import { ProfileRecordService } from './profile-record.service';

describe('ProfileRecordService', () => {
  let service: ProfileRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
