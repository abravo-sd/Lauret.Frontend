import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationElementRoutingModule } from './evaluation-element-routing.module';
import { EvaluationElementComponent } from './evaluation-element.component';
import { EvaluationElementRecordComponent } from './modals/evaluation-element-record/evaluation-element-record.component';
import { SharedModule } from 'src/app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { EvaluationElementRecordService } from './modals/evaluation-element-record/evaluation-element-record.service';

const PAGES = [EvaluationElementComponent];

const MODALS = [EvaluationElementRecordComponent];

const SERVICES = [EvaluationElementRecordService];

@NgModule({
  declarations: [PAGES, MODALS],
  imports: [CommonModule, EvaluationElementRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [SERVICES],
})
export class EvaluationElementModule {}
