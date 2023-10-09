import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AreaCorporativaDTO, AreaResponsableDTO, AreaResponsableDTOV1 } from 'src/app/utils/models';
import { ResponsibilityAreasRecordComponent } from './responsibility-areas-record.component';

export interface AreaResponsableData {
    data: AreaResponsableDTOV1;
}
@Injectable()
export class ResponsibilityAreasRecordService {
    constructor(private dialog: MatDialog) { }

    open(data?: AreaResponsableData): MatDialogRef<ResponsibilityAreasRecordComponent, boolean> {
        return this.dialog.open<ResponsibilityAreasRecordComponent, AreaResponsableData>(
            ResponsibilityAreasRecordComponent,
            {
                data,
                disableClose: true,
                minWidth: '40vw',
                maxHeight: '90vh',
            }
        );
    }
}
