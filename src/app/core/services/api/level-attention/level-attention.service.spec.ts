import { TestBed } from '@angular/core/testing';

import { LevelAttentionService } from './level-attention.service';

describe('LevelAttentionService', () => {
  let service: LevelAttentionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevelAttentionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
