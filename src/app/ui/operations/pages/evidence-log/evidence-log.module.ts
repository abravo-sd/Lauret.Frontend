import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvidenceLogRoutingModule } from './evidence-log-routing.module';
import { EvidenceLogComponent } from './evidence-log.component';
import { SharedModule } from 'src/app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { EvidenceLogRecordComponent, EvidenceLogRecordService } from './modals';

const PAGES = [EvidenceLogComponent];

const MODALS = [EvidenceLogRecordComponent];

const SERVICES = [EvidenceLogRecordService];

@NgModule({
  declarations: [PAGES, MODALS],
  imports: [CommonModule, EvidenceLogRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [SERVICES],
})
export class EvidenceLogModule {}
