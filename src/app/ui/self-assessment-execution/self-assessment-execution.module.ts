import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfAssessmentExecutionRoutingModule } from './self-assessment-execution-routing.module';
import { SelfAssessmentExecutionComponent } from './self-assessment-execution.component';
import { SharedModule } from 'src/app/shared';
import { SelfAssessmentExecutionRecordComponent, SelfAssessmentExecutionRecordService } from './modals';

const PAGES = [SelfAssessmentExecutionComponent];

const MODALS = [SelfAssessmentExecutionRecordComponent];

const SERVICES = [SelfAssessmentExecutionRecordService];

@NgModule({
  declarations: [PAGES, MODALS],
  imports: [CommonModule, SelfAssessmentExecutionRoutingModule, SharedModule],
  providers: [SERVICES],
})
export class SelfAssessmentExecutionModule {}
