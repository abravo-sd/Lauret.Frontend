import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { NormativeRecordComponent } from './modals/normative-record/normative-record.component';
import { NormativeRecordService } from './modals/normative-record/normative-record.service';
import { NormativeRoutingModule } from './normative-routing.module';
import { NormativeComponent } from './normative.component';

const PAGES = [NormativeComponent];

const SERVICES = [NormativeRecordService];

const MODALS = [NormativeRecordComponent];

@NgModule({
  declarations: [PAGES, MODALS],
  imports: [CommonModule, NormativeRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [SERVICES],
})
export class NormativeModule {}
