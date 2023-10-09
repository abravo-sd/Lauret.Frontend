import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MetaResultadosDTO } from 'src/app/utils/models';
import { JustificationDialogComponent } from './justification-dialog.component';

export interface CapturingGoalsAndResultsData {
  data: MetaResultadosDTO;
}
@Injectable({
  providedIn: 'root',
})
export class JustificationDialogService {
  constructor(private dialog: MatDialog) {}

  open(data?: CapturingGoalsAndResultsData): MatDialogRef<JustificationDialogComponent> {
    return this.dialog.open<JustificationDialogComponent, CapturingGoalsAndResultsData>(JustificationDialogComponent, {
      panelClass: '',
      data: data || null,
      maxHeight: '70vh',
      maxWidth: '70vh',
    });
  }
}
