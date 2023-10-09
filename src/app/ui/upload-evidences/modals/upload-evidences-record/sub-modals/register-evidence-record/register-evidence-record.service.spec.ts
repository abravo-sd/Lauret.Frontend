import { TestBed } from '@angular/core/testing';

import { RegisterEvidenceRecordService } from './register-evidence-record.service';

describe('RegisterEvidenceRecordService', () => {
  let service: RegisterEvidenceRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterEvidenceRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
