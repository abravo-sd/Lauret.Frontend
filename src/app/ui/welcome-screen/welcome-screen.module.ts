import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SettingdRoutingModule } from './welcome-screen-routing.module';
import { WelcomeScreenComponent } from './welcome-screen.component';
import { SettingsWelcomeService } from 'src/app/core/services';
import { SharedModule } from 'src/app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { NoSanitize2Pipe } from './no-sanitizer.pipe';

const PAGES = [WelcomeScreenComponent];
const SERVICES = [SettingsWelcomeService];

@NgModule({
  declarations: [PAGES, NoSanitize2Pipe],
  imports: [CommonModule, SettingdRoutingModule, SharedModule, ReactiveFormsModule, QuillModule],
  providers: [SERVICES],
})
export class WelcomeScreenModule {}
