import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { RegionRecordService } from './modals';
import { RegionRecordComponent } from './modals/region-record/region-record.component';
import { RegionsRoutingModule } from './regions-routing.module';
import { RegionsComponent } from './regions.component';

const PAGES = [RegionsComponent];

const MODALS = [RegionRecordComponent];

const SERVICES = [RegionRecordService];

@NgModule({
    declarations: [PAGES, MODALS],
    imports: [CommonModule, RegionsRoutingModule, SharedModule, ReactiveFormsModule],
    providers: [SERVICES],
})
export class RegionsModule { }
