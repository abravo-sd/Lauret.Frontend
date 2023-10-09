import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfAssessmentReviewRoutingModule } from './self-assessment-review-routing.module';
import { SelfAssessmentReviewComponent } from './self-assessment-review.component';
import { SharedModule } from 'src/app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { SelfAssessmentReviewRecordComponent, SelfAssessmentReviewRecordService } from './modals';

import { SelfAssessmentExecutionRecordService } from './modals/self-assessment-review-record/modals';
import { SelfAssessmentExecutionRecordComponent } from './modals/self-assessment-review-record/modals/self-assessment-execution-record/self-assessment-execution-record.component';

const PAGES = [SelfAssessmentReviewComponent];

const MODALS = [SelfAssessmentReviewRecordComponent, SelfAssessmentExecutionRecordComponent];

const SERVICES = [SelfAssessmentReviewRecordService, SelfAssessmentExecutionRecordService];
@NgModule({
  declarations: [PAGES, MODALS],
  imports: [CommonModule, SelfAssessmentReviewRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [SERVICES],
})
export class SelfAssessmentReviewModule {}
