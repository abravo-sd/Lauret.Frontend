import { TestBed } from '@angular/core/testing';

import { LevelModalityRecordService } from './level-modality-record.service';

describe('LevelModalityRecordService', () => {
  let service: LevelModalityRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevelModalityRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
