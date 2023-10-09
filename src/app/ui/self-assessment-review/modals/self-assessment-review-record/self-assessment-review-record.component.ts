import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ComponenteDTO, ElementoEvaluacionDTO, MetaResultadosDTO, TablePaginatorSearch } from 'src/app/utils/models';
import Swal from 'sweetalert2';
import { SelfAssessmentExecutionRecordService } from './modals';

@Component({
  selector: 'app-self-assessment-review-record',
  templateUrl: './self-assessment-review-record.component.html',
  styleUrls: ['./self-assessment-review-record.component.scss'],
})
export class SelfAssessmentReviewRecordComponent implements OnInit {
  data: MetaResultadosDTO[];
  dataSource: MatTableDataSource<MetaResultadosDTO>;
  selection: SelectionModel<MetaResultadosDTO>;
  disabled: boolean;
  permission: boolean;
  filters: TablePaginatorSearch;
  justifiText: string;
  componentList: ComponenteDTO[];
  evaluationelementList: ElementoEvaluacionDTO[];

  constructor(
    private readonly ref: MatDialogRef<never>,
    private readonly selfAssessmentExecutionRecord: SelfAssessmentExecutionRecordService
  ) {
    this.componentList = [];
    this.evaluationelementList = [];
  }

  ngOnInit(): void {
    this.justificationModal();
    this.openselfAssessmentExecutionRecord();
  }

  paginatorChange(event: PageEvent): void {
    this.filters.pageSize = event.pageSize;
    this.filters.pageNumber = event.pageIndex + 1;

    //  this.getAllCampus(this.filters);
  }

  openselfAssessmentExecutionRecord(): void {
    this.selfAssessmentExecutionRecord.open().afterClosed();
    //  .subscribe(() => this.getAllCampus(this.filters));
  }
  closeModalByConfimation(): void {
    if (true) {
      this.ref.close();
      return;
    }
  }
  async justificationModal() {
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Justificación',
      title: '',
      titleText: 'Guardar autoevaluación',
      inputPlaceholder: '',
      inputAttributes: {
        'aria-label': 'Type your message here',
      },
      iconColor: '#f44336',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      confirmButtonColor: '#f44336',
      cancelButtonColor: '#e5e7eb',
    });
    if (text) {
      Swal.fire(text);
    }
  }
}
