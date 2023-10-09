import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponenteUVMDTO, MatrizUvmDTO, MatrizUvmDTOV1 } from 'src/app/utils/models';
import { UvmMatrixRecordComponent } from './uvm-matrix-record.component';

export interface MatrixUvmData {
    data: MatrizUvmDTOV1;
}
@Injectable({
    providedIn: 'root',
})
export class UvmMatrixRecordService {
    constructor(private dialog: MatDialog) { }

    open(data?: MatrixUvmData): MatDialogRef<UvmMatrixRecordComponent> {
        return this.dialog.open<UvmMatrixRecordComponent, MatrixUvmData>(UvmMatrixRecordComponent, {
            panelClass: '',
            data: data || null,
            maxHeight: '60vh',
            maxWidth: '60vh',
        });
    }
}
