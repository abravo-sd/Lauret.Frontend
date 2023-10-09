import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { CorporateAreasRoutingModule } from './corporate-areas-routing.module';
import { CorporateAreasComponent } from './corporate-areas.component';
import { CoporateAreaRecordService, CorporateAreaRecordComponent } from './modals';

const PAGES = [CorporateAreasComponent];

const MODALS = [CorporateAreaRecordComponent];

const SERVICES = [CoporateAreaRecordService];

@NgModule({
  declarations: [PAGES, MODALS],
  imports: [CommonModule, CorporateAreasRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [SERVICES],
})
export class CorporateAreasModule {}
