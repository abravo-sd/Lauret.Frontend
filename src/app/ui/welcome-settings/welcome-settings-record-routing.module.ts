import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeSettingsRecordComponent } from './welcome-settings-record.component';

const routes: Routes = [{ path: '', component: WelcomeSettingsRecordComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeSettingdRecordRoutingModule {}
