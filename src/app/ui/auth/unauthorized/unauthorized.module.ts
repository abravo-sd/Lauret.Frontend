import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnauthorizedRoutingModule } from './unauthorized-routing.module';
import { UnauthorizedComponent } from './unauthorized.component';
import { SharedModule } from 'src/app/shared';

@NgModule({
  declarations: [UnauthorizedComponent],
  imports: [CommonModule, UnauthorizedRoutingModule, SharedModule],
})
export class UnauthorizedModule {}
