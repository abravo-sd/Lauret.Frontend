import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SharedModule } from 'src/app/shared';

import { EvidenceViewerComponent } from './evidence-viewer.component';
import { EvidenceViewerService } from './evidence-viewer.service';

const MODALS = [EvidenceViewerComponent];

const SERIVICES = [EvidenceViewerService];

@NgModule({
  declarations: [MODALS],
  imports: [CommonModule, SharedModule, PdfViewerModule],
  providers: [SERIVICES],
  exports: [MODALS],
})
export class EvidenceViewerModule {}
