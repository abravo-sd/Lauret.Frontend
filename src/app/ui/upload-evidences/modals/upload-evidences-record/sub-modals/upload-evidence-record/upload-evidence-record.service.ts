import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SubUploadEvidenceRecordComponent } from './upload-evidence-record.component';
export interface SelfAssessmentExecutionData {
  data: any;
}
@Injectable()
export class SubUploadEvidenceRecordService {
  constructor(private dialog: MatDialog) {}

  open(data?: SelfAssessmentExecutionData): MatDialogRef<SubUploadEvidenceRecordComponent> {
    return this.dialog.open<SubUploadEvidenceRecordComponent, SelfAssessmentExecutionData>(
      SubUploadEvidenceRecordComponent,
      {
        panelClass: '',
        data: data || null,
        maxHeight: '70vh',
        maxWidth: '70vh',
      }
    );
  }
}
