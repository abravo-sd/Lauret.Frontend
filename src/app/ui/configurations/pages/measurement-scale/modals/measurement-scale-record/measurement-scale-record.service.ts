import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MeasurementScaleRecordComponent } from './measurement-scale-record.component';
import { EscalaMedicionDTO,EscalaMedicionDTOV1 } from 'src/app/utils/models';

export interface MeasurementScaleData {
  data: EscalaMedicionDTOV1;
}

@Injectable()
export class MeasurementScaleRecordService {
  constructor(private dialog: MatDialog) {}

  open(data?: MeasurementScaleData): MatDialogRef<MeasurementScaleRecordComponent> {
    return this.dialog.open<MeasurementScaleRecordComponent, MeasurementScaleData>(MeasurementScaleRecordComponent, {
      panelClass: '',
      data: data || null,
      minHeight: '90vh',
      minWidth: '70vw',
      maxWidth: '95vw',
    });
  }
}
