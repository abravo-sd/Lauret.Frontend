import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelfAssessmentReviewComponent } from './self-assessment-review.component';

const routes: Routes = [{ path: '', component: SelfAssessmentReviewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfAssessmentReviewRoutingModule {}
