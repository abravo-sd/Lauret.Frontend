import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PeriodoEvaluacionDTO, PeriodoEvaluacionDTOV1 } from 'src/app/utils/models';
import { EvaluationPeriodRecordComponent } from './evaluation-period-record.component';

export interface EvaluationPeriodData {
    data: PeriodoEvaluacionDTOV1;
}
@Injectable()
export class EvaluationPreiodRecordService {
    constructor(private dialog: MatDialog) { }

    open(data?: EvaluationPeriodData): MatDialogRef<EvaluationPeriodRecordComponent> {
        return this.dialog.open<EvaluationPeriodRecordComponent, EvaluationPeriodData>(EvaluationPeriodRecordComponent, {
            panelClass: '',
            data: data || null,
            maxHeight: '90vh',
            minWidth: '40vw'
        });
    }
}
