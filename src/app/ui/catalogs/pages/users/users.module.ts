import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserRecordComponent } from './modals/user-record/user-record.component';
import { UserRecordService } from './modals/user-record/user-record.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared';

const PAGES = [UsersComponent];

const MODALS = [UserRecordComponent];

const SERVICES = [UserRecordService];

@NgModule({
  declarations: [PAGES, MODALS],
  imports: [CommonModule, UsersRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [SERVICES],
})
export class UsersModule {}
