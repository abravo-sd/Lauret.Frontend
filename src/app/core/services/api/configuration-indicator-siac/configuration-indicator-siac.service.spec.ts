import { TestBed } from '@angular/core/testing';

import { ConfigurationIndicatorSiacService } from './configuration-indicator-siac.service';

describe('ConfigurationIndicatorSiacService', () => {
  let service: ConfigurationIndicatorSiacService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigurationIndicatorSiacService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
