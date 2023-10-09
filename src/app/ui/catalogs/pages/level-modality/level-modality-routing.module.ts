import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LevelModalityComponent } from './level-modality.component';

const routes: Routes = [{ path: '', component: LevelModalityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LevelModalityRoutingModule {}
