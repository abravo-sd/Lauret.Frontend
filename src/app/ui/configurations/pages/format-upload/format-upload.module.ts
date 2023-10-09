import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared';
import { FormatUploadRoutingModule } from './format-upload-routing.module';
import { FormatUploadComponent } from './format-upload.component';

@NgModule({
  declarations: [FormatUploadComponent],
  imports: [CommonModule, FormatUploadRoutingModule, SharedModule],
})
export class FormatUploadModule {}
