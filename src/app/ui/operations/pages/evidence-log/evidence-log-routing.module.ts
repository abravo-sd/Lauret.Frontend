import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvidenceLogComponent } from './evidence-log.component';

const routes: Routes = [{ path: '', component: EvidenceLogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvidenceLogRoutingModule {}
