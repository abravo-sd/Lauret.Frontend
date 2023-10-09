import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { CopyResultModalModule } from 'src/app/features/copy-result-modal/copy-result-modal.module';
import { SharedModule } from 'src/app/shared';
import { CriteriaRoutingModule } from './criteria-routing.module';
import { CriteriaComponent } from './criteria.component';
import { CriteriaCopyComponent } from './modals/criteria-copy/criteria-copy.component';
import { CriteriaCopyService } from './modals/criteria-copy/criteria-copy.service';
import { CriteriaRecordComponent } from './modals/criteria-record/criteria-record.component';
import { CriteriaRecordService } from './modals/criteria-record/criteria-record.service';

const PAGES = [CriteriaComponent];

const MODALS = [CriteriaRecordComponent, CriteriaCopyComponent];

const SERVICES = [CriteriaRecordService, CriteriaCopyService];

@NgModule({
  declarations: [PAGES, MODALS],
  imports: [CommonModule, CriteriaRoutingModule, SharedModule, ReactiveFormsModule, CopyResultModalModule],
  providers: [SERVICES],
})
export class CriteriaModule {}
