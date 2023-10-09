import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadEvidencesComponent } from './upload-evidences.component';

const routes: Routes = [{ path: '', component: UploadEvidencesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadEvidencesRoutingModule {}
