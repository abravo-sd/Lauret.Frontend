import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { IndicatorsRoutingModule } from './indicators-routing.module';
import { IndicatorsComponent } from './indicators.component';
import { IndicatorRecordComponent } from './modals';
import { IndicatorRecordService } from './modals/indicator-record/indicator-record.service';

const PAGES = [IndicatorsComponent];

const MODALS = [IndicatorRecordComponent];

const SERVICES = [IndicatorRecordService];

@NgModule({
  declarations: [PAGES, MODALS],
  imports: [CommonModule, IndicatorsRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [SERVICES],
})
export class IndicatorsModule {}
