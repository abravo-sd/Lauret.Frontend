import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ElementoEvaluacionDTO, ElementoEvaluacionDTOV1 } from 'src/app/utils/models';
import { EvaluationElementRecordComponent } from './evaluation-element-record.component';

export interface EvaluationElementData {
    data: ElementoEvaluacionDTOV1;
}
@Injectable({
    providedIn: 'root',
})
export class EvaluationElementRecordService {
    constructor(private dialog: MatDialog) { }

    open(data?: EvaluationElementData): MatDialogRef<EvaluationElementRecordComponent> {
        return this.dialog.open<EvaluationElementRecordComponent, EvaluationElementData>(EvaluationElementRecordComponent, {
            panelClass: '',
            data: data || null,
            maxHeight: '100vh',
            maxWidth: '100vw'
            // width: '90vw'
        });
    }
}

