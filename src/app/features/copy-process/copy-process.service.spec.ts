import { TestBed } from '@angular/core/testing';

import { CopyProcessService } from './copy-process.service';

describe('CopyProcessService', () => {
  let service: CopyProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CopyProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
