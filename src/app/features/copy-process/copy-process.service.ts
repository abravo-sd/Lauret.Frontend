import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CopyProcess } from 'src/app/utils/models';
import { CopyProcessComponent } from './copy-process.component';

@Injectable()
export class CopyProcessService {
  constructor(private dialog: MatDialog) {}

  open(): MatDialogRef<CopyProcessComponent, CopyProcess> {
    return this.dialog.open<CopyProcessComponent>(CopyProcessComponent, {
      disableClose: true,
    });
  }
}
