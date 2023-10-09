import { TestBed } from '@angular/core/testing';

import SettingsWelcomeService from './settings-welcome.service';

describe('UsersService', () => {
  let service: SettingsWelcomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsWelcomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
