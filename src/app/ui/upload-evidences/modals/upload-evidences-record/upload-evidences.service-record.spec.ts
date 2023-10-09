import { TestBed } from '@angular/core/testing';

import { UploadEvidencesServiceRecord } from './upload-evidences.service-record';

describe('UploadEvidencesService', () => {
  let service: UploadEvidencesServiceRecord;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadEvidencesServiceRecord);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
