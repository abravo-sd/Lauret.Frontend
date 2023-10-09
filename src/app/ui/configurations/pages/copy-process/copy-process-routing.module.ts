import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CopyProcessComponent } from './copy-process.component';

const routes: Routes = [{ path: '', component: CopyProcessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CopyProcessRoutingModule {}
