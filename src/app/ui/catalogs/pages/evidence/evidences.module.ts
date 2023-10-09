import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { EvidenceRecordService } from './modals';
import { EvidenceRecordComponent } from './modals/evidence-record/evidence-record.component';
import { EvidencesRoutingModule } from './evidences-routing.module';
import { EvidencesComponent } from './evidences.component';

const PAGES = [EvidencesComponent];

const MODALS = [EvidenceRecordComponent];

const SERVICES = [EvidenceRecordService];

@NgModule({
    declarations: [PAGES, MODALS],
    imports: [CommonModule, EvidencesRoutingModule, SharedModule, ReactiveFormsModule],
    providers: [SERVICES],
})
export class EvidencesModule {}
