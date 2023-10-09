import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicatorsSiacRoutingModule } from './indicators-siac-routing.module';
import { IndicatorsSiacComponent } from './indicators-siac.component';
import { IndicatorSiacRecordComponent } from './modals/indicator-siac-record/indicator-siac-record.component';
import { IndicatorSiacRecordService } from './modals';
import { SharedModule } from 'src/app/shared';
import { ReactiveFormsModule } from '@angular/forms';

const PAGES = [IndicatorsSiacComponent];

const MODALS = [IndicatorSiacRecordComponent];

const SERVICES = [IndicatorSiacRecordService];

@NgModule({
  declarations: [PAGES, MODALS],
  imports: [CommonModule, IndicatorsSiacRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [SERVICES],
})
export class IndicatorsSiacModule {}
