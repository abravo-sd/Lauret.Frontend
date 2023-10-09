import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { InstitutionRecordService } from './modals';
import { InstitutionRecordComponent } from './modals/institution-record/institution-record.component';
import { InstitutionsRoutingModule } from './institutions-routing.module';
import { InstitutionsComponent } from './institutions.component';

const PAGES = [InstitutionsComponent];

const MODALS = [InstitutionRecordComponent];

const SERVICES = [InstitutionRecordService];

@NgModule({
    declarations: [PAGES, MODALS],
    imports: [CommonModule, InstitutionsRoutingModule, SharedModule, ReactiveFormsModule],
    providers: [SERVICES],
})
export class InstitutionsModule { }
