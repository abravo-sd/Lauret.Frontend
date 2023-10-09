import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationElementRoutingModule } from './evaluation-element-routing.module';
import { EvaluationElementComponent } from './evaluation-element.component';

import { SharedModule } from 'src/app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { EvaluationElementRecordComponent } from './modals';
import { EvaluationElementRecordService } from './modals/evaluation-element-record/evaluation-element-record.service';
import { FileUploadProcessService } from 'src/app/features/file-upload-process';
import { FileUploadService } from 'src/app/core/services';

const PAGES = [EvaluationElementComponent];
const MODALS = [EvaluationElementRecordComponent];
const SERVICES = [EvaluationElementRecordService];

@NgModule({
    declarations: [PAGES, MODALS],
    imports: [CommonModule, EvaluationElementRoutingModule, SharedModule, ReactiveFormsModule],
    providers: [SERVICES]
})

export class EvaluationElementModule { }
