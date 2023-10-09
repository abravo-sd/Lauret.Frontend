import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvidenceSearchPageComponent } from './evidence-search-page.component';

const routes: Routes = [{ path: '', component: EvidenceSearchPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvidenceSearchPageRoutingModule {}
