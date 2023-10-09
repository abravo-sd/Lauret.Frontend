import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
//import { RegionDTO, RegionDTOV1, SettingsWelcomeDTO } from 'src/app/utils/models';

import { SettingsWelcomeDTO } from 'src/app/utils/models';
import { WelcomeSettingsRecordComponent } from './welcome-settings-record.component';

export interface ConfiguracionData {
  data: SettingsWelcomeDTO;
}

@Injectable()
export class WelcomeSettingsRecordService {
  constructor(private dialog: MatDialog) {}

  open(data?: ConfiguracionData): MatDialogRef<WelcomeSettingsRecordComponent> {
    return this.dialog.open<WelcomeSettingsRecordComponent, ConfiguracionData>(WelcomeSettingsRecordComponent, {
      panelClass: '',
      data: data || null,
      // width: '40vw',
      minWidth: '40vw',
      maxHeight: '90vh',
    });
  }
}
