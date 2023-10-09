import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CampusData } from 'src/app/ui/catalogs/pages/campus/modals/campus-record/campus-record.service';
import { ImprovementPlanRecordComponent } from './improvement-plan-record.component';
export interface ImprovementPlanData {
  data: any;
}
@Injectable({
  providedIn: 'root',
})
export class ImprovementPlanRecordService {
  constructor(private dialog: MatDialog) {}

  open(data?: ImprovementPlanData): MatDialogRef<ImprovementPlanRecordComponent> {
    return this.dialog.open<ImprovementPlanRecordComponent, ImprovementPlanData>(ImprovementPlanRecordComponent, {
      panelClass: '',
      data: data || null,
      maxHeight: '100vh',
    });
  }
}
