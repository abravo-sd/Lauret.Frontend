import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-improvement-plan-record',
  templateUrl: './improvement-plan-record.component.html',
  styleUrls: ['./improvement-plan-record.component.scss'],
})
export class ImprovementPlanRecordComponent {
  disabled: boolean;
  data: any[];
  dataSource: MatTableDataSource<any>;
  selection: SelectionModel<any>;
  constructor() {
    this.dataSource = new MatTableDataSource<any>([]);
    this.selection = new SelectionModel<any>(true);
    this.disabled = null;
  }
}
