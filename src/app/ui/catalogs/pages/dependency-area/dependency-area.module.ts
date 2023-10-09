import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DependencyAreaComponent } from './dependency-area.component';
import { DependencyAreaRecordComponent } from './modals/dependency-area-record/dependency-area-record.component';
import { DependencyAreaRecordService } from './modals/dependency-area-record/dependency-area-record.service';
import { DependyAreaRoutingModule } from './dependency-area-routing.module';
import { SharedModule } from 'src/app/shared';
import { ReactiveFormsModule } from '@angular/forms';

const PAGES = [DependencyAreaComponent];

const MODALS = [DependencyAreaRecordComponent];

const SERVICES = [DependencyAreaRecordService];

@NgModule({
  declarations: [PAGES, MODALS],
  imports: [CommonModule, DependyAreaRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [SERVICES],
})
export class DependencyAreaModule {}
