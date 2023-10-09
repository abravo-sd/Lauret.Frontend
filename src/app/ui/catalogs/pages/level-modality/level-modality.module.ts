import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LevelModalityRecordComponent } from './modals/level-modality-record/level-modality-record.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { LevelModalityRoutingModule } from './level-modality-routing.module';
import { LevelModalityComponent } from './level-modality.component';
import { LevelModalityRecordService } from './modals';

const PAGES = [LevelModalityComponent];

const MODALS = [LevelModalityRecordComponent];

const SERVICES = [LevelModalityRecordService];

@NgModule({
  declarations: [PAGES, MODALS],
  imports: [CommonModule, LevelModalityRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [SERVICES],
})
export class LevelModalityModule {}
