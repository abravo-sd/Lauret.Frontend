import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResponsibilityAreasComponent } from './responsibility-areas.component';

const routes: Routes = [{ path: '', component: ResponsibilityAreasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponsibilityAreasRoutingModule {}
