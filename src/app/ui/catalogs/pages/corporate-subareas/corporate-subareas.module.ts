import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';

import { CorporateSubAreasRoutingModule } from './corporate-subareas-routing.module';
import { CorporateSubAreasComponent } from './corporate-subareas.component';
import { CorporateSubAreaRecordComponent } from './modals/corporate-subarea-record/corporate-subarea-record.component';
import { CorporateSubAreaRecordService } from './modals/corporate-subarea-record/corporate-subarea-record.service';

const PAGES = [CorporateSubAreasComponent];

const MODALS = [CorporateSubAreaRecordComponent];

const SERVICES = [CorporateSubAreaRecordService];

@NgModule({
  declarations: [PAGES, MODALS],
  imports: [CommonModule, CorporateSubAreasRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [SERVICES],
})
export class CorporateSubAreasModule {}
