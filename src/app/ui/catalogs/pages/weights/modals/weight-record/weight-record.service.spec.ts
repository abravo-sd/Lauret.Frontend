import { TestBed } from '@angular/core/testing';

import { WeightRecordService } from './weight-record.service';

describe('WeightRecordService', () => {
  let service: WeightRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeightRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
