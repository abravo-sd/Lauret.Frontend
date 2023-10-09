import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CopiadoResult } from 'src/app/utils/models';
import { CopyResultModalComponent } from './copy-result-modal.component';

@Injectable()
export class CopyResultModalService {
  constructor(private dialog: MatDialog) {}

  open(data: CopiadoResult): MatDialogRef<CopyResultModalComponent> {
    return this.dialog.open<CopyResultModalComponent, CopiadoResult>(CopyResultModalComponent, {
      data,
      disableClose: true,
    });
  }
}
