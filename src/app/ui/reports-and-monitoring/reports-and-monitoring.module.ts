import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsAndMonitoringRoutingModule } from './reports-and-monitoring-routing.module';
import { ReportsAndMonitoringComponent } from './reports-and-monitoring.component';

@NgModule({
  declarations: [ReportsAndMonitoringComponent],
  imports: [CommonModule, ReportsAndMonitoringRoutingModule],
})
export class ReportsAndMonitoringModule {}
