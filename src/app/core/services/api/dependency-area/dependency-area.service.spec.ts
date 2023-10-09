/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DependencyAreaService } from './dependency-area.service';

describe('Service: DependencyArea', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DependencyAreaService]
    });
  });

  it('should ...', inject([DependencyAreaService], (service: DependencyAreaService) => {
    expect(service).toBeTruthy();
  }));
});
