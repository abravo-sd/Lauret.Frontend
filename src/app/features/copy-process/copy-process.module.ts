import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { CopyProcessComponent } from './copy-process.component';
import { CopyProcessService } from './copy-process.service';

const MODALS = [CopyProcessComponent];

const SERIVICES = [CopyProcessService];

@NgModule({
  declarations: [MODALS],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  providers: [SERIVICES],
  exports: [MODALS],
})
export class CopyProcessModule {}
