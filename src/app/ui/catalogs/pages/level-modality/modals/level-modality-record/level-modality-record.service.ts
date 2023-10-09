import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NivelModalidadDTO, NivelModalidadDTOV1 } from 'src/app/utils/models';
import { LevelModalityRecordComponent } from './level-modality-record.component';

export interface LevelModalityData {
    data: NivelModalidadDTOV1;
}

@Injectable()
export class LevelModalityRecordService {
    constructor(private dialog: MatDialog) { }

    open(data?: LevelModalityData): MatDialogRef<LevelModalityRecordComponent> {
        return this.dialog.open<LevelModalityRecordComponent, LevelModalityData>(LevelModalityRecordComponent, {
            panelClass: '',
            data: data || null,
            minWidth: '40vw',
            maxHeight: '90vh',
        });
    }
}
