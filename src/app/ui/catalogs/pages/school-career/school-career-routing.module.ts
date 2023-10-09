import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolCareerComponent } from './school-career.component';

const routes: Routes = [{ path: '', component: SchoolCareerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolCareerRoutingModule {}
