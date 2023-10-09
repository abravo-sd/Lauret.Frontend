import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PerfilDTO, PerfilDTOV1 } from 'src/app/utils/models';
import { ProfileRecordComponent } from './profile-record.component';

export interface ProfileData {
    data: PerfilDTOV1;
}

@Injectable()
export class ProfileRecordService {
    constructor(private dialog: MatDialog) { }

    open(data?: ProfileData): MatDialogRef<ProfileRecordComponent> {
        return this.dialog.open<ProfileRecordComponent, ProfileData>(ProfileRecordComponent, {
            panelClass: '',
            data: data || null,
            maxHeight: '90vh',
            minWidth: '90vw',
            maxWidth: 'unset'
        });
    }
}
