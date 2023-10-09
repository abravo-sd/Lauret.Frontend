import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluationPeriodComponent } from './evaluation-period.component';

const routes: Routes = [{ path: '', component: EvaluationPeriodComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluationPeriodRoutingModule {}
