import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SubIndicadorUVMDTO, SubIndicadorUVMDTOV1 } from 'src/app/utils/models';
import { SubIndicatorUvmRecordComponent } from './sub-indicator-uvm-record.component';

export interface SubIndicatorUvmData {
    data: SubIndicadorUVMDTOV1;
}
@Injectable({
    providedIn: 'root',
})
export class SubIndicatorUvmRecordService {
    constructor(private dialog: MatDialog) { }

    open(data?: SubIndicatorUvmData): MatDialogRef<SubIndicatorUvmRecordComponent> {
        return this.dialog.open<SubIndicatorUvmRecordComponent, SubIndicatorUvmData>(SubIndicatorUvmRecordComponent, {
            panelClass: '',
            data: data || null,
            minWidth: '40vw',
            maxHeight: '90vh',
        });
    }
}
