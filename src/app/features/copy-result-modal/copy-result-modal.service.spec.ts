import { TestBed } from '@angular/core/testing';

import { CopyResultModalService } from './copy-result-modal.service';

describe('CopyResultModalService', () => {
  let service: CopyResultModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CopyResultModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
