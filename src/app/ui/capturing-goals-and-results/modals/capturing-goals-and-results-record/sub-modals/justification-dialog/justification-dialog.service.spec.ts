import { TestBed } from '@angular/core/testing';

import { JustificationDialogService } from './justification-dialog.service';

describe('JustificationDialogService', () => {
  let service: JustificationDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JustificationDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
