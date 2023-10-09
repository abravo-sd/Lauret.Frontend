import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ComponenteDTO, ElementoEvaluacionDTO } from 'src/app/utils/models';

@Component({
  selector: 'app-upload-evidence-record',
  templateUrl: './upload-evidence-record.component.html',
  styleUrls: ['./upload-evidence-record.component.scss'],
})
export class SubUploadEvidenceRecordComponent implements OnInit {
  componentList: ComponenteDTO[];
  evaluationelementList: ElementoEvaluacionDTO[];
  dataSource: any;
  constructor(private readonly ref: MatDialogRef<never>) {
    this.componentList = [];
    this.evaluationelementList = [];
  }

  ngOnInit(): void {
    // console.log('');
  }

  closeModalByConfimation(): void {
    if (true) {
      this.ref.close();
      return;
    }
  }

  async uploadFile(files: File[]): Promise<void> {}
}
