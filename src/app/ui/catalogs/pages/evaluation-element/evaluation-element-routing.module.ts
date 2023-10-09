import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluationElementComponent } from './evaluation-element.component';

const routes: Routes = [{ path: '', component: EvaluationElementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluationElementRoutingModule {}
