import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CampusDTO, CampusDTOV1 } from 'src/app/utils/models';
import { CampusRecordComponent } from './campus-record.component';

export interface CampusData {
    data: CampusDTOV1;
}

@Injectable()
export class CampusRecordService {
    constructor(private dialog: MatDialog) { }

    open(data?: CampusData): MatDialogRef<CampusRecordComponent> {
        return this.dialog.open<CampusRecordComponent, CampusData>(CampusRecordComponent, {
            panelClass: '',
            data: data || null,
            minWidth: '40vw',
            maxHeight: '90vh',
        });
    }
}
