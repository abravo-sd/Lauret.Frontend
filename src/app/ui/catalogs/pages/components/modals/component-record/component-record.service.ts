import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponenteDTO, ComponenteDTOV1 } from 'src/app/utils/models';
import { ComponentsRecordComponent } from './component-record.component';
export interface ComponentData {
    data: ComponenteDTOV1;
}
@Injectable()
export class ComponentsRecordService {

    constructor(private dialog: MatDialog) { }

    open(data?: ComponentData): MatDialogRef<ComponentsRecordComponent> {
        return this.dialog.open<ComponentsRecordComponent, ComponentData>(ComponentsRecordComponent, {
            panelClass: '',
            data: data || null,
            maxWidth: '40vw',
            maxHeight: '90vh',
        });
    }
}
