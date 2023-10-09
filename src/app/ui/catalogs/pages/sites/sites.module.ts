import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { SiteRecordService } from './modals';
import { SiteRecordComponent } from './modals/site-record/site-record.component';
import { SitesRoutingModule } from './sites-routing.module';
import { SitesComponent } from './sites.component';

const PAGES = [SitesComponent];

const MODALS = [SiteRecordComponent];

const SERVICES = [SiteRecordService];

@NgModule({
  declarations: [PAGES, MODALS],
  imports: [CommonModule, SitesRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [SERVICES],
})
export class SitesModule {}
