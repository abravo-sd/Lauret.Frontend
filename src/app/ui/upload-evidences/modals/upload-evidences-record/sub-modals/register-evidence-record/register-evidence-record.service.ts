import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisterEvidenceRecordComponent } from './register-evidence-record.component';
export interface SelfAssessmentExecutionData {
  data: any;
}
@Injectable()
export class RegisterEvidenceRecordService {
  constructor(private dialog: MatDialog) {}

  open(data?: SelfAssessmentExecutionData): MatDialogRef<RegisterEvidenceRecordComponent> {
    return this.dialog.open<RegisterEvidenceRecordComponent, SelfAssessmentExecutionData>(
      RegisterEvidenceRecordComponent,
      {
        panelClass: '',
        data: data || null,
        maxHeight: '70vh',
        maxWidth: '70vh',
      }
    );
  }
}
