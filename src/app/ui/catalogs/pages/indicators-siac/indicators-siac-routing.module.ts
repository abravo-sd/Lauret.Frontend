import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndicatorsSiacComponent } from './indicators-siac.component';

const routes: Routes = [{ path: '', component: IndicatorsSiacComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndicatorsSiacRoutingModule {}
