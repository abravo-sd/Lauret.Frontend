import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';

import { AuditRoutingModule } from './audit-routing.module';
import { AuditComponent } from './audit.component';

@NgModule({
  declarations: [AuditComponent],
  imports: [CommonModule, AuditRoutingModule, SharedModule, ReactiveFormsModule],
})
export class AuditModule {}
