import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CopyProcessModule } from 'src/app/features/copy-process';
import { CopyResultModalModule } from 'src/app/features/copy-result-modal/copy-result-modal.module';
import { SharedModule } from 'src/app/shared';
import { ResponsibilityAreasRecordComponent, ResponsibilityAreasRecordService } from './modals';
import { ResponsibilityAreasRoutingModule } from './responsibility-areas-routing.module';
import { ResponsibilityAreasComponent } from './responsibility-areas.component';

const PAGES = [ResponsibilityAreasComponent];

const MODALS = [ResponsibilityAreasRecordComponent];

const SERVICES = [ResponsibilityAreasRecordService];

@NgModule({
  declarations: [PAGES, MODALS],
  imports: [
    CommonModule,
    ResponsibilityAreasRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CopyProcessModule,
    CopyResultModalModule,
  ],
  providers: [SERVICES],
})
export class ResponsibilityAreasModule {}
