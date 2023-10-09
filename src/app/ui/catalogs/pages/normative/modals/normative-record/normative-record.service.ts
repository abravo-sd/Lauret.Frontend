import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NormativaDTO, NormativaDTOV1 } from 'src/app/utils/models';
import { NormativeRecordComponent } from './normative-record.component';
export interface NormativeData {
    data: NormativaDTOV1;
}
@Injectable({
    providedIn: 'root',
})
export class NormativeRecordService {
    constructor(private dialog: MatDialog) { }
    open(data?: NormativeData): MatDialogRef<NormativeRecordComponent> {
        return this.dialog.open<NormativeRecordComponent, NormativeData>(NormativeRecordComponent, {
            panelClass: '',
            data: data || null,
            minWidth: '49vw',            
            maxHeight: '90vh',
        });
    }
}
