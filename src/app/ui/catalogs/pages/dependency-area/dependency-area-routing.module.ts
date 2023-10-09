import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DependencyAreaComponent } from './dependency-area.component';

const routes: Routes = [{ path: '', component: DependencyAreaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DependyAreaRoutingModule {}
