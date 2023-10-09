import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationsComponent } from './operations.component';

const routes: Routes = [
  {
    path: '',
    component: OperationsComponent,
    children: [
      {
        path: 'registro-evidencias',
        loadChildren: () => import('./pages/evidence-log/evidence-log.module').then((m) => m.EvidenceLogModule),
      },
      { path: '**', redirectTo: 'registro-evidencias' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationsRoutingModule {}
