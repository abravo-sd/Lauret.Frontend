import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CarreraDTO } from 'src/app/utils/models';
import { SchoolCareerRecordComponent } from './school-career-record.component';

export interface CareerData {
  data: CarreraDTO;
}

@Injectable()
export class SchoolCareerRecordService {
  constructor(private dialog: MatDialog) {}

  open(data?: CareerData): MatDialogRef<SchoolCareerRecordComponent> {
    return this.dialog.open<SchoolCareerRecordComponent, CareerData>(SchoolCareerRecordComponent, {
      panelClass: '',
      data: data || null,
      maxHeight: '90vh',
    });
  }
}
