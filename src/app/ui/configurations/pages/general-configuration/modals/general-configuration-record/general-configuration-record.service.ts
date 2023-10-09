import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfNivelAreaResponsableDTO } from 'src/app/utils/models';
import { GeneralConfigurationComponent } from '../../general-configuration.component';
import { GeneralConfigurationRecordComponent } from './general-configuration-record.component';

export interface GeneralConfigurationData {
  data: ConfNivelAreaResponsableDTO;
}
@Injectable()
export class GeneralConfigurationRecordService {
  constructor(private dialog: MatDialog) {}

  open(data?: GeneralConfigurationData): MatDialogRef<GeneralConfigurationRecordComponent> {
    return this.dialog.open<GeneralConfigurationRecordComponent, GeneralConfigurationData>(
      GeneralConfigurationRecordComponent,
      {
        panelClass: '',
        data: data || null,
        maxHeight: '100vh',
        maxWidth: '70vh',
      }
    );
  }
}
