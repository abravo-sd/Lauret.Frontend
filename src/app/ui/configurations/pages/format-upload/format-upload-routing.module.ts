import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormatUploadComponent } from './format-upload.component';

const routes: Routes = [{ path: '', component: FormatUploadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormatUploadRoutingModule {}
