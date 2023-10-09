import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentsRecordComponent } from 'src/app/ui/catalogs/pages/components/modals';
import { ComponenteUVMDTO, ComponenteUVMDTOV1 } from 'src/app/utils/models';
import { ComponentUvmRecordComponent } from './component-uvm-record.component';

export interface ComponentUVMData {
    data: ComponenteUVMDTOV1;
}
@Injectable({
    providedIn: 'root',
})
export class ComponentUvmRecordService {
    constructor(private dialog: MatDialog) { }

    open(data?: ComponentUVMData): MatDialogRef<ComponentUvmRecordComponent> {
        return this.dialog.open<ComponentUvmRecordComponent, ComponentUVMData>(ComponentUvmRecordComponent, {
            panelClass: '',
            data: data || null,
            minWidth: '40vw',
            maxHeight: '90vh'
        });
    }
}
