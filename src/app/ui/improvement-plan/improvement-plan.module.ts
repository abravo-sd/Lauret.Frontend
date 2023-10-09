import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImprovementPlanRoutingModule } from './improvement-plan-routing.module';
import { ImprovementPlanComponent } from './improvement-plan.component';
import { SharedModule } from 'src/app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { ImprovementPlanRecordComponent } from './modals/improvement-plan-record/improvement-plan-record.component';

@NgModule({
  declarations: [ImprovementPlanComponent, ImprovementPlanRecordComponent],
  imports: [CommonModule, ImprovementPlanRoutingModule, SharedModule, ReactiveFormsModule],
})
export class ImprovementPlanModule {}
