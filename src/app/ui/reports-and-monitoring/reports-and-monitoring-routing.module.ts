import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsAndMonitoringComponent } from './reports-and-monitoring.component';

const routes: Routes = [{ path: '', component: ReportsAndMonitoringComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsAndMonitoringRoutingModule {}
