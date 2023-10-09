import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AccreditorRecordComponent } from './accreditor-record.component';
import { AcreditadoraDTO, AcreditadoraDTOV1 } from 'src/app/utils/models';

export interface AccreditorData {
    data: AcreditadoraDTOV1;
}


@Injectable()
export class  AccreditorRecordService {
    constructor(private dialog: MatDialog) { }

    open(data?: AccreditorData): MatDialogRef<AccreditorRecordComponent, boolean> {
        return this.dialog.open<AccreditorRecordComponent, AccreditorData>(AccreditorRecordComponent, {
            panelClass: '',
            data: data || null,
            disableClose: true,
            minWidth: '40vw',
            maxHeight: '90vh',
        });
    }
}
