import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadProcessRoutingModule } from './file-upload-process-routing.module';
import { FileUploadProcessComponent } from './file-upload-process.component';
import { SharedModule } from 'src/app/shared';
import { FileUploadProcessService } from './file-upload-process.service';

const COMPONENTS = [FileUploadProcessComponent];

const SERVICES = [FileUploadProcessService];

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule, FileUploadProcessRoutingModule, SharedModule],
  providers: [SERVICES],
  exports: [COMPONENTS],
})
export class FileUploadProcessModule {}
