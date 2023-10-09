import { TestBed } from '@angular/core/testing';

import { ResponsibilityAreasService } from './responsibility-areas.service';

describe('ResponsibilityAreasService', () => {
  let service: ResponsibilityAreasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsibilityAreasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
