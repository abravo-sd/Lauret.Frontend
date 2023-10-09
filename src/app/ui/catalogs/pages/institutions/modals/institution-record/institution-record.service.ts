import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InstitucionDTOV1 } from 'src/app/utils/models';
import { InstitutionRecordComponent } from './institution-record.component';

export interface InstitutionData {
  data: InstitucionDTOV1;
}

@Injectable()
export class InstitutionRecordService {
  constructor(private dialog: MatDialog) {}

  open(data?: InstitutionData): MatDialogRef<InstitutionRecordComponent> {
    return this.dialog.open<InstitutionRecordComponent, InstitutionData>(InstitutionRecordComponent, {
      panelClass: '',
      data: data || null,
      // width: '40vw',
      minWidth: '40vw',
      maxHeight: '90vh',
    });
  }
}
