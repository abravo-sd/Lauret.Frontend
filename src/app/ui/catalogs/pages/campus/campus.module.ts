import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { CampusRoutingModule } from './campus-routing.module';
import { CampusComponent } from './campus.component';
import { CampusRecordComponent } from './modals/campus-record/campus-record.component';
import { CampusRecordService } from './modals/campus-record/campus-record.service';

const PAGES = [CampusComponent];

const MODALS = [CampusRecordComponent];

const SERVICES = [CampusRecordService];

@NgModule({
  declarations: [PAGES, MODALS],
  imports: [CommonModule, CampusRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [SERVICES],
})
export class CampusModule {}
