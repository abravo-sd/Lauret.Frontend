import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CopyProcess } from 'src/app/utils/models';
import { CriteriaCopyComponent } from './criteria-copy.component';

@Injectable()
export class CriteriaCopyService {
  constructor(private dialog: MatDialog) {}

  open(): MatDialogRef<CriteriaCopyComponent, CopyProcess> {
    return this.dialog.open<CriteriaCopyComponent>(CriteriaCopyComponent, {});
  }
}
