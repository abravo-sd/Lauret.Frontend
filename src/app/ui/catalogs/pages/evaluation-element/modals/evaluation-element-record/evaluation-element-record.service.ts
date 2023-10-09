import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CatalogoElementoEvaluacionDTO, CatalogoElementoEvaluacionDTOV1 } from 'src/app/utils/models';
import { EvaluationElementRecordComponent } from './evaluation-element-record.component';

export interface EvaluationElementCatalogData {
    data: CatalogoElementoEvaluacionDTOV1;
}

@Injectable({
    providedIn: 'root',
})
export class EvaluationElementRecordService {
    constructor(private dialog: MatDialog) { }

    open(data?: EvaluationElementCatalogData): MatDialogRef<EvaluationElementRecordComponent> {
        return this.dialog.open<EvaluationElementRecordComponent, EvaluationElementCatalogData>(
            EvaluationElementRecordComponent,
            {
                panelClass: '',
                data: data || null,
                maxHeight: '900vh',
                minWidth: '40vw',
            }
        );
    }
}
