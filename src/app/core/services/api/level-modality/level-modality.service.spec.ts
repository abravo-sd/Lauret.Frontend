import { TestBed } from '@angular/core/testing';

import { LevelModalityService } from './level-modality.service';

describe('LevelModalityService', () => {
  let service: LevelModalityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevelModalityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
