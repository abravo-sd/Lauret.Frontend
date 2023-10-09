import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TablePaginatorSearch } from 'src/app/utils/models';
import { RegisterEvidenceRecordService } from './sub-modals/register-evidence-record/register-evidence-record.service';
import { SubUploadEvidenceRecordService } from './sub-modals/upload-evidence-record/upload-evidence-record.service';
import { UploadEvidencesServiceRecord } from './upload-evidences.service-record';

@Component({
  selector: 'app-upload-evidences-record',
  templateUrl: './upload-evidences-record.component.html',
  styleUrls: ['./upload-evidences-record.component.scss'],
})
export class UploadEvidencesRecordComponent implements OnInit {
  data: any[];
  dataSource: MatTableDataSource<any>;
  selection: SelectionModel<any>;
  disabled: boolean;
  permission: boolean;
  filters: TablePaginatorSearch;
  justifiText: string;
  constructor(
    private readonly ref: MatDialogRef<never>,
    private readonly subUploadEvidenceRecordService: SubUploadEvidenceRecordService,
    private readonly registerEvidenceRecordService: RegisterEvidenceRecordService
  ) {}

  ngOnInit(): void {
    this.openSubUploadEvidenceRecordService();
    this.openRegisterEvidenceRecordService();
  }
  closeModalByConfimation(): void {
    if (true) {
      this.ref.close();
      return;
    }
  }
  openSubUploadEvidenceRecordService(): void {
    this.subUploadEvidenceRecordService.open().afterClosed();
    //  .subscribe(() => this.getAllCampus(this.filters));
  }

  openRegisterEvidenceRecordService(): void {
    this.registerEvidenceRecordService.open().afterClosed();
    //  .subscribe(() => this.getAllCampus(this.filters));
  }
}
