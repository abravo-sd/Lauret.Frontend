import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelfAssessmentExecutionComponent } from './self-assessment-execution.component';

const routes: Routes = [{ path: '', component: SelfAssessmentExecutionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfAssessmentExecutionRoutingModule {}
