import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ComponenteDTO, ElementoEvaluacionDTO, MetaResultadosDTO } from 'src/app/utils/models';
import { ESCENARIOLIST } from 'src/app/utils/constants';
@Component({
  selector: 'app-self-assessment-execution-record',
  templateUrl: './self-assessment-execution-record.component.html',
  styleUrls: ['./self-assessment-execution-record.component.scss'],
})
export class SelfAssessmentExecutionRecordComponent implements OnInit {
  componentList: ComponenteDTO[];
  evaluationelementList: ElementoEvaluacionDTO[];
  dataSource: any;
  constructor(private readonly ref: MatDialogRef<never>) {
    this.componentList = [];
    this.evaluationelementList = [];
  }

  ngOnInit(): void {
    this.dataSource = ESCENARIOLIST;
  }

  closeModalByConfimation(): void {
    if (true) {
      this.ref.close();
      return;
    }
  }
}
