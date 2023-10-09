import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProgressService } from 'src/app/core/modules/progress';
import { Alert } from 'src/app/utils/helpers';
import { EvidenceViewerData } from './evidence-viewer.service';

@Component({
  templateUrl: './evidence-viewer.component.html',
  styleUrls: ['./evidence-viewer.component.scss'],
})
export class EvidenceViewerComponent {
  urlPDF: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: EvidenceViewerData,
    private readonly progress: ProgressService
  ) {
    this.urlPDF = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  }

  onProgress(): void {
    this.progress.setProgress(true);
  }

  afterLoadedComplete(): void {
    this.progress.setProgress(false);
  }

  error(): void {
    Alert.error('Error al cargar el PDF.');
  }
}
