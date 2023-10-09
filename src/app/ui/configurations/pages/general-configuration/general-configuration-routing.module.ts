import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralConfigurationComponent } from './general-configuration.component';

const routes: Routes = [{ path: '', component: GeneralConfigurationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralConfigurationRoutingModule {}
