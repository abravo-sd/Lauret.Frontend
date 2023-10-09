import { TestBed } from '@angular/core/testing';

import { ImprovementPlanRecordService } from './improvement-plan-record.service';

describe('ImprovementPlanRecordService', () => {
  let service: ImprovementPlanRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImprovementPlanRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
