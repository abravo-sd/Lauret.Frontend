import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './profiles.component';
import { ProfileRecordComponent, ProfileRecordService } from './modals';
import { SharedModule } from 'src/app/shared';
import { ReactiveFormsModule } from '@angular/forms';

const PAGES = [ProfilesComponent];

const MODALS = [ProfileRecordComponent];

const SERVICES = [ProfileRecordService];
@NgModule({
  declarations: [PAGES, MODALS],
  imports: [CommonModule, ProfilesRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [SERVICES],
})
export class ProfilesModule {}
