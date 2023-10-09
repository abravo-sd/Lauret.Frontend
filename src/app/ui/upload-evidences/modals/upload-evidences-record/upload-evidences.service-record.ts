import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UploadEvidencesRecordComponent } from './upload-evidences-record.component';
export interface CapturingGoalsAndResultsData {
  data: any;
}
@Injectable()
export class UploadEvidencesServiceRecord {
  constructor(private dialog: MatDialog) {}
  open(data?: CapturingGoalsAndResultsData): MatDialogRef<UploadEvidencesRecordComponent> {
    return this.dialog.open<UploadEvidencesRecordComponent, CapturingGoalsAndResultsData>(
      UploadEvidencesRecordComponent,
      {
        panelClass: '',
        data: data || null,
        maxHeight: '100vh',
        maxWidth: '120vh',
        width: '120vh',
      }
    );
  }
}
