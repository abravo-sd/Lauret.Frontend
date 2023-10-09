import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';
import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsComponent } from './components.component';
import { ComponentsRecordComponent, ComponentsRecordService } from './modals';

const PAGES = [ComponentsComponent];

const SERVICES = [ComponentsRecordService];

const MODALS = [ComponentsRecordComponent];
@NgModule({
  declarations: [PAGES, MODALS],
  imports: [CommonModule, ComponentsRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [SERVICES],
})
export class ComponentsModule {}
