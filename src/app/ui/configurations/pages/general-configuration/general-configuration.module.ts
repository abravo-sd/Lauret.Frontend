import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralConfigurationRoutingModule } from './general-configuration-routing.module';
import { GeneralConfigurationComponent } from './general-configuration.component';
import { SharedModule } from 'src/app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { GeneralConfigurationRecordComponent, GeneralConfigurationRecordService } from './modals';

const PAGES = [GeneralConfigurationComponent];

const MODALS = [GeneralConfigurationRecordComponent];

const SERVICES = [GeneralConfigurationRecordService];

@NgModule({
  declarations: [PAGES, MODALS],
  imports: [CommonModule, GeneralConfigurationRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [SERVICES],
})
export class GeneralConfigurationModule {}
