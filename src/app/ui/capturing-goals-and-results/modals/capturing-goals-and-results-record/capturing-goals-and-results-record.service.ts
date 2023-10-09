import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CampusData } from 'src/app/ui/catalogs/pages/campus/modals/campus-record/campus-record.service';
import { MetaResultadosDTO } from 'src/app/utils/models';
import { CapturingGoalsAndResultsComponent } from '../../capturing-goals-and-results.component';
import { CapturingGoalsAndResultsRecordComponent } from './capturing-goals-and-results-record.component';

export interface CapturingGoalsAndResultsData {
  data: MetaResultadosDTO;
}
@Injectable()
export class CapturingGoalsAndResultsRecordService {
  constructor(private dialog: MatDialog) {}

  open(data?: CapturingGoalsAndResultsData): MatDialogRef<CapturingGoalsAndResultsRecordComponent> {
    return this.dialog.open<CapturingGoalsAndResultsRecordComponent, CapturingGoalsAndResultsData>(
      CapturingGoalsAndResultsRecordComponent,
      {
        panelClass: '',
        data: data || null,
        maxHeight: '100vh',
        maxWidth: '100vh',
      }
    );
  }
}
