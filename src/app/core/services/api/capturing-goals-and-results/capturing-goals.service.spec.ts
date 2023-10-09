import { TestBed } from '@angular/core/testing';

import { CapturingGoalService } from './capturing-goals.service';

describe('CapturingGoalsService', () => {
  let service: CapturingGoalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapturingGoalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
