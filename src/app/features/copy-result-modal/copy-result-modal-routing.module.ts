import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CopyResultModalComponent } from './copy-result-modal.component';

const routes: Routes = [{ path: '', component: CopyResultModalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CopyResultModalRoutingModule {}
