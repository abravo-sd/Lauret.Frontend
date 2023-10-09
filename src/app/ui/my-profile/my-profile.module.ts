import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared';
import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile.component';

@NgModule({
  declarations: [MyProfileComponent],
  imports: [CommonModule, MyProfileRoutingModule, SharedModule],
})
export class MyProfileModule {}
