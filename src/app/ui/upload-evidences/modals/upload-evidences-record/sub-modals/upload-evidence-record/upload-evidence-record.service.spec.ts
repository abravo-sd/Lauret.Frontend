import { TestBed } from '@angular/core/testing';

import { UploadEvidenceRecordService } from './upload-evidence-record.service';

describe('UploadEvidenceRecordService', () => {
  let service: UploadEvidenceRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadEvidenceRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
