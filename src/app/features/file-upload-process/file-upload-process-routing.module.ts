import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadProcessComponent } from './file-upload-process.component';

const routes: Routes = [{ path: '', component: FileUploadProcessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileUploadProcessRoutingModule {}
