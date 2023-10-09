import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CapturingGoalsAndResultsComponent } from './capturing-goals-and-results.component';

const routes: Routes = [{ path: '', component: CapturingGoalsAndResultsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CapturingGoalsAndResultsRoutingModule {}
