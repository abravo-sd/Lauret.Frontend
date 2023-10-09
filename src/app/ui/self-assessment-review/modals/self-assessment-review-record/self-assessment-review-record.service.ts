import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MetaResultadosDTO } from 'src/app/utils/models';
import { SelfAssessmentReviewRecordComponent } from './self-assessment-review-record.component';
export interface CapturingGoalsAndResultsData {
  data: MetaResultadosDTO;
}
@Injectable()
export class SelfAssessmentReviewRecordService {
  constructor(private dialog: MatDialog) {}

  open(data?: CapturingGoalsAndResultsData): MatDialogRef<SelfAssessmentReviewRecordComponent> {
    return this.dialog.open<SelfAssessmentReviewRecordComponent, CapturingGoalsAndResultsData>(
      SelfAssessmentReviewRecordComponent,
      {
        panelClass: '',
        data: data || null,
        maxHeight: '100vh',
        maxWidth: '100vh',
      }
    );
  }
}
