import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { EvidenceViewerModule } from 'src/app/features/evidence-viewer';
import { SharedModule } from 'src/app/shared';
import { EvidenceSearchPageRoutingModule } from './evidence-search-page-routing.module';
import { EvidenceSearchPageComponent } from './evidence-search-page.component';

@NgModule({
  declarations: [EvidenceSearchPageComponent],
  imports: [CommonModule, EvidenceSearchPageRoutingModule, SharedModule, ReactiveFormsModule, EvidenceViewerModule],
})
export class EvidenceSearchPageModule {}
