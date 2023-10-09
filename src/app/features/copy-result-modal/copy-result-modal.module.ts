import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared';
import { CopyResultModalRoutingModule } from './copy-result-modal-routing.module';
import { CopyResultModalComponent } from './copy-result-modal.component';
import { CopyResultModalService } from './copy-result-modal.service';

const MODALS = [CopyResultModalComponent];

const SERVICES = [CopyResultModalService];

@NgModule({
  declarations: [MODALS],
  imports: [CommonModule, CopyResultModalRoutingModule, SharedModule],
  providers: [SERVICES],
})
export class CopyResultModalModule {}
