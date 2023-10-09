import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AreaCorporativaDTO, AreaCorporativaDTOV1 } from 'src/app/utils/models';
import { CorporateAreaRecordComponent } from './corporate-area-record.component';
export interface CorporateAreaData {
  data: AreaCorporativaDTOV1;
}

@Injectable({
  providedIn: 'root',
})
export class CoporateAreaRecordService {
  constructor(private dialog: MatDialog) {}
  open(data?: CorporateAreaData): MatDialogRef<CorporateAreaRecordComponent> {
    return this.dialog.open<CorporateAreaRecordComponent, CorporateAreaData>(CorporateAreaRecordComponent, {
      panelClass: '',
      data: data || null,
      minWidth: '40vw',
      maxHeight: '90vh',
    });
  }
}
