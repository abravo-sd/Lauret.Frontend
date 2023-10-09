import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolCareerRoutingModule } from './school-career-routing.module';
import { SchoolCareerComponent } from './school-career.component';
import { SchoolCareerRecordComponent } from './modals/school-career-record/school-career-record.component';
import { SharedModule } from 'src/app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { SchoolCareerRecordService } from './modals';

const PAGES = [SchoolCareerComponent];

const MODALS = [SchoolCareerRecordComponent];

const SERVICES = [SchoolCareerRecordService];

@NgModule({
  declarations: [PAGES, MODALS],
  imports: [CommonModule, SchoolCareerRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [SERVICES],
})
export class SchoolCareerModule {}
