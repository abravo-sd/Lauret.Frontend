import { TestBed } from '@angular/core/testing';

import { GeneralConfigurationRecordService } from './general-configuration-record.service';

describe('GeneralConfigurationRecordService', () => {
  let service: GeneralConfigurationRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralConfigurationRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
