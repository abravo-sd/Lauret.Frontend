import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CopyProcessModule } from 'src/app/features/copy-process';
import { CopyResultModalModule } from 'src/app/features/copy-result-modal/copy-result-modal.module';
import { SharedModule } from 'src/app/shared';
import { ChaptersRoutingModule } from './chapters-routing.module';
import { ChaptersComponent } from './chapters.component';
import { ChapterRecordComponent } from './modals/chapter-record/chapter-record.component';
import { ChapterRecordService } from './modals/chapter-record/chapter-record.service';

const PAGES = [ChaptersComponent];

const MODALS = [ChapterRecordComponent];

const SERVICES = [ChapterRecordService];

@NgModule({
  declarations: [PAGES, MODALS],
  imports: [
    CommonModule,
    ChaptersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CopyProcessModule,
    CopyResultModalModule,
  ],
  providers: [SERVICES],
})
export class ChaptersModule {}
