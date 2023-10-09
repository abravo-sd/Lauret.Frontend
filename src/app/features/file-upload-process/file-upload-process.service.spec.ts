import { TestBed } from '@angular/core/testing';

import { FileUploadProcessService } from './file-upload-process.service';

describe('FileUploadProcessService', () => {
  let service: FileUploadProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUploadProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
