import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadEvidencesRoutingModule } from './upload-evidences-routing.module';
import { UploadEvidencesComponent } from './upload-evidences.component';
import { SharedModule } from 'src/app/shared';
import {
  RegisterEvidenceRecordService,
  SubUploadEvidenceRecordService,
  UploadEvidencesRecordComponent,
} from './modals';
import { UploadEvidencesServiceRecord } from './modals/upload-evidences-record/upload-evidences.service-record';
import { RegisterEvidenceRecordComponent } from './modals/upload-evidences-record/sub-modals/register-evidence-record/register-evidence-record.component';
import { SubUploadEvidenceRecordComponent } from './modals/upload-evidences-record/sub-modals/upload-evidence-record/upload-evidence-record.component';

const PAGES = [UploadEvidencesComponent, SubUploadEvidenceRecordComponent, RegisterEvidenceRecordComponent];

const MODALS = [UploadEvidencesRecordComponent];

const SERVICES = [UploadEvidencesServiceRecord, SubUploadEvidenceRecordService, RegisterEvidenceRecordService];

@NgModule({
  declarations: [PAGES, MODALS, RegisterEvidenceRecordComponent, SubUploadEvidenceRecordComponent],
  imports: [CommonModule, UploadEvidencesRoutingModule, SharedModule],
  providers: [SERVICES],
})
export class UploadEvidencesModule {}
