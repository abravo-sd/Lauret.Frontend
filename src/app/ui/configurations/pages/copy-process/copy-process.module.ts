import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { CopyProcessRoutingModule } from './copy-process-routing.module';
import { CopyProcessComponent } from './copy-process.component';

@NgModule({
  declarations: [CopyProcessComponent],
  imports: [CommonModule, CopyProcessRoutingModule, SharedModule, ReactiveFormsModule],
})
export class CopyProcessModule {}
