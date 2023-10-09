import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EvidenceViewerComponent } from './evidence-viewer.component';

export interface DataPDF {
  url: string;
}

export interface DataImage {
  url: string;
}

export interface EvidenceViewerData {
  type: 'image' | 'pdf';
  file?: DataPDF;
  image?: DataImage;
}

@Injectable()
export class EvidenceViewerService {
  constructor(private readonly matDialog: MatDialog) {}

  open(data: EvidenceViewerData): MatDialogRef<EvidenceViewerComponent> {
    return this.matDialog.open<EvidenceViewerComponent>(EvidenceViewerComponent, {
      data,
      maxWidth: '100vw',
      minHeight: '100vh',
      width: '100%',
    });
  }
}
