import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SedeDTO } from 'src/app/utils/models';
import { SedeDTOV1 } from 'src/app/utils/models';
import { SiteRecordComponent } from './site-record.component';

export interface SiteData {
    data: SedeDTOV1;
}

@Injectable()
export class SiteRecordService {
    constructor(private dialog: MatDialog) { }

    open(data?: SiteData): MatDialogRef<SiteRecordComponent> {
        return this.dialog.open<SiteRecordComponent, SiteData>(SiteRecordComponent, {
            panelClass: '',
            data: data || null,
            minWidth: '40vw',
            maxHeight: '90vh',
        });
    }
}
