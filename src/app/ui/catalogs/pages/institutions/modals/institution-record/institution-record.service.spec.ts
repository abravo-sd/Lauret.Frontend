import { TestBed } from '@angular/core/testing';

import { InstitutionRecordService } from './institution-record.service';

describe('InstitutionRecordService', () => {
  let service: InstitutionRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstitutionRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
