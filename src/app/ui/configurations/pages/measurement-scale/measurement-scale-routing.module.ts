import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeasurementScaleComponent } from './measurement-scale.component';

const routes: Routes = [{ path: '', component: MeasurementScaleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeasurementScaleRoutingModule {}
