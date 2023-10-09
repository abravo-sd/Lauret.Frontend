import { TestBed } from '@angular/core/testing';

import { ChapterRecordService } from './chapter-record.service';

describe('ChapterRecordService', () => {
  let service: ChapterRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChapterRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
