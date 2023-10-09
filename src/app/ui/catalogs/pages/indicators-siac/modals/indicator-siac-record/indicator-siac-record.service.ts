import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IndicadorSiacDTO, IndicadorSiacDTOV1 } from 'src/app/utils/models';
import { CampusRecordComponent } from '../../../campus/modals/campus-record/campus-record.component';
import { IndicatorsSiacComponent } from '../../indicators-siac.component';
import { IndicatorSiacRecordComponent } from './indicator-siac-record.component';

export interface IndicatorSiacData {
    data: IndicadorSiacDTOV1;
}

@Injectable({
    providedIn: 'root',
})
export class IndicatorSiacRecordService {
    constructor(private dialog: MatDialog) { }

    open(data?: IndicatorSiacData): MatDialogRef<IndicatorSiacRecordComponent> {
        return this.dialog.open<IndicatorSiacRecordComponent, IndicatorSiacData>(IndicatorSiacRecordComponent, {
            panelClass: '',
            data: data || null,
            maxHeight: '100vh',
            minWidth: '40vw'
        });
    }
}
