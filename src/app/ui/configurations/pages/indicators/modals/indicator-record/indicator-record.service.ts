import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfiguracionIndicadorSiacDTO, ConfiguracionIndicadorSiacDTOV1, IndicadorDTO } from 'src/app/utils/models';
import { IndicatorRecordComponent } from './indicator-record.component';

export interface ConfiguracionIndicadorData {
    data: ConfiguracionIndicadorSiacDTOV1;
}

@Injectable()
export class IndicatorRecordService {
    constructor(private dialog: MatDialog) { }
    open(data?: ConfiguracionIndicadorData): MatDialogRef<IndicatorRecordComponent> {
        return this.dialog.open<IndicatorRecordComponent, ConfiguracionIndicadorData>(IndicatorRecordComponent, {
            panelClass: '',
            data: data || null,
            maxHeight: '90vh',
            maxWidth: '95vw',
            minWidth: '70vw',
            width: '90vw'
        });
    }
}
