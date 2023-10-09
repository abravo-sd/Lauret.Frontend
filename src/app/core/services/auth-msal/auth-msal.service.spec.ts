import { TestBed } from '@angular/core/testing';

import { AuthMsalService } from './auth-msal.service';

describe('AuthMsalService', () => {
  let service: AuthMsalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthMsalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
