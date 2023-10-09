import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AreaCorporativaDTO, AreaCorporativaDTOV1 } from 'src/app/utils/models';

import { SubAreaCorporativaDTOV1 } from 'src/app/utils/models/subarea-corporativa.dto.v1';
import { CorporateSubAreaRecordComponent } from './corporate-subarea-record.component';
export interface CorporateSubAreaData {
  data: SubAreaCorporativaDTOV1;
}

@Injectable({
  providedIn: 'root',
})
export class CorporateSubAreaRecordService {
  constructor(private dialog: MatDialog) {}
  open(data?: CorporateSubAreaData): MatDialogRef<CorporateSubAreaRecordComponent> {
    return this.dialog.open<CorporateSubAreaRecordComponent, CorporateSubAreaData>(CorporateSubAreaRecordComponent, {
      panelClass: '',
      data: data || null,
      minWidth: '60vw',
      maxHeight: '90vh',
    });
  }
}
