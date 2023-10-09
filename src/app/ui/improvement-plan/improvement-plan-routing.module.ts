import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImprovementPlanComponent } from './improvement-plan.component';

const routes: Routes = [{ path: '', component: ImprovementPlanComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImprovementPlanRoutingModule {}
