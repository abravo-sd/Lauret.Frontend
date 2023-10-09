import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { MeasurementScaleRoutingModule } from './measurement-scale-routing.module';
import { MeasurementScaleComponent } from './measurement-scale.component';
import { MeasurementScaleRecordComponent, MeasurementScaleService } from './modals';

const PAGES = [MeasurementScaleComponent];

const MODALS = [MeasurementScaleRecordComponent];

const SERVICES = [MeasurementScaleService];

@NgModule({
  declarations: [PAGES, MODALS],
  imports: [CommonModule, MeasurementScaleRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [SERVICES],
})
export class MeasurementScaleModule {}
