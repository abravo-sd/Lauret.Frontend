import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PonderacionDTO, PonderacionDTOV1 } from 'src/app/utils/models';
import { WeightRecordComponent } from './weight-record.component';
export interface PonderacionData {
    data: PonderacionDTOV1;
}
@Injectable()
export class WeightRecordService {
    constructor(private dialog: MatDialog) { }
    open(data?: PonderacionData): MatDialogRef<WeightRecordComponent> {
        return this.dialog.open<WeightRecordComponent, PonderacionData>(WeightRecordComponent, {
            panelClass: '',
            data: data || null,
            minWidth: '40vw',
            maxHeight: '90vh',
        });
    }
}
