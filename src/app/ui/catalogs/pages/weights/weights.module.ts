import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { WeightRecordComponent, WeightRecordService } from './modals';

import { WeightsRoutingModule } from './weights-routing.module';
import { WeightsComponent } from './weights.component';

const PAGES = [WeightsComponent];

const MODALS = [WeightRecordComponent];

const SERVICES = [WeightRecordService];

@NgModule({
  declarations: [PAGES, MODALS],
  imports: [CommonModule, WeightsRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [SERVICES],
})
export class WeightsModule {}
