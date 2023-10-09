import { TestBed } from '@angular/core/testing';

import { NormativeRecordService } from './normative-record.service';

describe('NormativeRecordService', () => {
  let service: NormativeRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NormativeRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
