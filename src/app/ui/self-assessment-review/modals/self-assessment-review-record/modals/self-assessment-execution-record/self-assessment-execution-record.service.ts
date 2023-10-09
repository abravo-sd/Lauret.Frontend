import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MetaResultadosDTO } from 'src/app/utils/models';
import { SelfAssessmentExecutionRecordComponent } from './self-assessment-execution-record.component';
export interface SelfAssessmentExecutionData {
  data: MetaResultadosDTO;
}

@Injectable()
export class SelfAssessmentExecutionRecordService {
  constructor(private dialog: MatDialog) {}

  open(data?: SelfAssessmentExecutionData): MatDialogRef<SelfAssessmentExecutionRecordComponent> {
    return this.dialog.open<SelfAssessmentExecutionRecordComponent, SelfAssessmentExecutionData>(
      SelfAssessmentExecutionRecordComponent,
      {
        panelClass: '',
        data: data || null,
        maxHeight: '100vh',
        maxWidth: '125vh',
        width: '125vh',
      }
    );
  }
}
