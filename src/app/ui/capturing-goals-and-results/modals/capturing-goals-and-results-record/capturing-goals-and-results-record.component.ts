import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Alert } from 'src/app/utils/helpers';
import { MetaResultadosDTO, TablePaginatorSearch } from 'src/app/utils/models';
import Swal from 'sweetalert2';
import { JustificationDialogService } from './sub-modals/justification-dialog/justification-dialog.service';

@Component({
  selector: 'app-capturing-goals-and-results-record',
  templateUrl: './capturing-goals-and-results-record.component.html',
  styleUrls: ['./capturing-goals-and-results-record.component.scss'],
})
export class CapturingGoalsAndResultsRecordComponent implements OnInit {
  data: MetaResultadosDTO[];
  dataSource: MatTableDataSource<MetaResultadosDTO>;
  selection: SelectionModel<MetaResultadosDTO>;
  disabled: boolean;
  permission: boolean;
  filters: TablePaginatorSearch;

  constructor(
    private readonly ref: MatDialogRef<never>,
    private readonly justificationDialogService: JustificationDialogService
  ) {}

  ngOnInit(): void {
    //RM this.openJustificationDialogService();
  }

  paginatorChange(event: PageEvent): void {
    this.filters.pageSize = event.pageSize;
    this.filters.pageNumber = event.pageIndex + 1;
  }

  openJustificationDialogService(): void {
    this.justificationDialogService.open().afterClosed();
    //  .subscribe(() => this.getAllCampus(this.filters));
  }

  closeModalByConfimation(): void {
    if (true) {
      this.ref.close();
      return;
    }
  }
}
