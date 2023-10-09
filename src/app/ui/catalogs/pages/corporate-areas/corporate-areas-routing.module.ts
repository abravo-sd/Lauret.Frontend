import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateAreasComponent } from './corporate-areas.component';

const routes: Routes = [{ path: '', component: CorporateAreasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorporateAreasRoutingModule {}
