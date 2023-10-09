import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CatalogoUsuarioDTO, CatalogoUsuarioDTOV1, UsuarioDTO, UsuarioDTOV1 } from 'src/app/utils/models';
import { UserRecordComponent } from './user-record.component';

export interface UserData {
    data: CatalogoUsuarioDTOV1;
}

@Injectable()
export class UserRecordService {
    constructor(private dialog: MatDialog) { }

    open(data?: UserData): MatDialogRef<UserRecordComponent> {
        return this.dialog.open<UserRecordComponent, UserData>(UserRecordComponent, {
            panelClass: '',
            data: data || null,
            minWidth: '60vw',
            maxHeight: '90vh',
            maxWidth: '70vh'
        });
    }
}
