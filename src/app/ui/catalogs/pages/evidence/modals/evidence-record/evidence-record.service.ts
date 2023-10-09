import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EvidenceDTO } from 'src/app/utils/models';
import { EvidenceRecordComponent } from './evidence-record.component';

export interface EvidenceData {
    data: EvidenceDTO;
}

@Injectable()
export class EvidenceRecordService {
    constructor(private dialog: MatDialog) { }

    open(data?: EvidenceData): MatDialogRef<EvidenceRecordComponent> {
        return this.dialog.open<EvidenceRecordComponent, EvidenceData>(EvidenceRecordComponent, {
            panelClass: '',
            data: data || null,
            // width: '40vw',
            minWidth: '40vw',
            maxHeight: '90vh',
        });
    }
}
