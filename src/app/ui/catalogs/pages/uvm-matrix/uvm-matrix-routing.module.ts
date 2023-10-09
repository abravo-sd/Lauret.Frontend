import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsUvmComponent } from './pages/components-uvm/components-uvm.component';
import { UvmMatrixComponent } from './uvm-matrix.component';

const routes: Routes = [{ path: '', component: UvmMatrixComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UvmMatrixRoutingModule {}
