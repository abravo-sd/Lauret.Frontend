import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NormativeComponent } from './normative.component';

const routes: Routes = [{ path: '', component: NormativeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NormativeRoutingModule {}
