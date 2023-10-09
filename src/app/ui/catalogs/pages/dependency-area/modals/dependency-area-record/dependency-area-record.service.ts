import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DependenciaAreaDTOV1 } from 'src/app/utils/models/dependencia-area.dto.v1';
import { DependencyAreaRecordComponent } from './dependency-area-record.component';

export interface DependenciaAreaData {
  data: DependenciaAreaDTOV1;
}

@Injectable()
export class DependencyAreaRecordService {
  constructor(private dialog: MatDialog) {}

  open(data?: DependenciaAreaData): MatDialogRef<DependencyAreaRecordComponent> {
    return this.dialog.open<DependencyAreaRecordComponent, DependenciaAreaData>(DependencyAreaRecordComponent, {
      panelClass: '',
      data: data || null,
      // width: '40vw',
      minWidth: '40vw',
      maxHeight: '90vh',
    });
  }
}
