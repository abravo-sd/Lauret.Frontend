import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapturingGoalsAndResultsRoutingModule } from './capturing-goals-and-results-routing.module';
import { SharedModule } from 'src/app/shared';
import { CapturingGoalsAndResultsComponent } from './capturing-goals-and-results.component';
import {
  CapturingGoalsAndResultsRecordComponent,
  CapturingGoalsAndResultsRecordService,
  JustificationDialogService,
} from './modals';
import { ReactiveFormsModule } from '@angular/forms';
import { JustificationDialogComponent } from './modals/capturing-goals-and-results-record/sub-modals/justification-dialog/justification-dialog.component';

const PAGES = [CapturingGoalsAndResultsComponent];

const MODALS = [CapturingGoalsAndResultsRecordComponent, JustificationDialogComponent];

const SERVICES = [CapturingGoalsAndResultsRecordService, JustificationDialogService];

@NgModule({
  declarations: [PAGES, MODALS, JustificationDialogComponent],
  imports: [CommonModule, CapturingGoalsAndResultsRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [SERVICES],
})
export class CapturingGoalsAndResultsModule {}
