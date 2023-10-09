import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegionDTOV1 } from 'src/app/utils/models';
import { RegionRecordComponent } from './region-record.component';

export interface RegionData {
  data: RegionDTOV1;
}

@Injectable()
export class RegionRecordService {
  constructor(private dialog: MatDialog) {}

  open(data?: RegionData): MatDialogRef<RegionRecordComponent> {
    return this.dialog.open<RegionRecordComponent, RegionData>(RegionRecordComponent, {
      panelClass: '',
      data: data || null,
      // width: '40vw',
      minWidth: '40vw',
      maxHeight: '90vh',
    });
  }
}
