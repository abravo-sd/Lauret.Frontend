import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IndicadorUVMDTO, IndicadorUVMDTOV1 } from 'src/app/utils/models';
import { IndicatorUvmRecordComponent } from './indicator-uvm-record.component';

export interface IndicatorUVMData {
    data: IndicadorUVMDTOV1;
}
@Injectable({
    providedIn: 'root',
})
export class IndicatorUvmRecordService {
    constructor(private dialog: MatDialog) { }

    open(data?: IndicatorUVMData): MatDialogRef<IndicatorUvmRecordComponent> {
        return this.dialog.open<IndicatorUvmRecordComponent, IndicatorUVMData>(IndicatorUvmRecordComponent, {
            panelClass: '',
            data: data || null,
            minWidth: '40vw',
            maxHeight: '90vh',
        });
    }
}
