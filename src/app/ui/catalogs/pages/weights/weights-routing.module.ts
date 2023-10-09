import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeightsComponent } from './weights.component';

const routes: Routes = [{ path: '', component: WeightsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeightsRoutingModule {}
