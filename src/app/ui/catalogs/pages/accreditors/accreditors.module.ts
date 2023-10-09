import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccreditorsRoutingModule } from './accreditors-routing.module';
import { AccreditorsComponent } from './accreditors.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { AccreditorRecordComponent, AccreditorRecordService } from './modals';

const PAGES = [AccreditorsComponent];

const MODALS = [AccreditorRecordComponent];

const SERVICES = [AccreditorRecordService];

@NgModule({
  declarations: [PAGES, MODALS],
  imports: [CommonModule, AccreditorsRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [SERVICES],
})
export class AccreditorsModule {}
