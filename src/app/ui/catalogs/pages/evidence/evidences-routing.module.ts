import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvidencesComponent } from './evidences.component';

const routes: Routes = [{ path: '', component: EvidencesComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EvidencesRoutingModule {}
