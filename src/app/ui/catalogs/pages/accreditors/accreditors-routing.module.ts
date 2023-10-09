import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccreditorsComponent } from './accreditors.component';

const routes: Routes = [{ path: '', component: AccreditorsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccreditorsRoutingModule {}
