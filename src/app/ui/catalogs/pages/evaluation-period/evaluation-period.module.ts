import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { EvaluationPeriodRoutingModule } from './evaluation-period-routing.module';
import { EvaluationPeriodComponent } from './evaluation-period.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { EvaluationPeriodRecordComponent, EvaluationPreiodRecordService } from './modals';

const PAGES = [EvaluationPeriodComponent];

const MODALS = [EvaluationPeriodRecordComponent];

const SERVICES = [EvaluationPreiodRecordService];

@NgModule({
  declarations: [PAGES, MODALS],
  imports: [CommonModule, EvaluationPeriodRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [SERVICES, DatePipe],
})
export class EvaluationPeriodModule {}
