
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WelcomeSettingdRecordRoutingModule } from './welcome-settings-record-routing.module';
import { WelcomeSettingsRecordComponent } from './welcome-settings-record.component';
import { SettingsWelcomeService } from 'src/app/core/services';
import { SharedModule } from 'src/app/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { QuillModule } from 'ngx-quill';
import { NoSanitizePipe } from './no-sanitizer.pipe';

const PAGES = [WelcomeSettingsRecordComponent];
const SERVICES = [SettingsWelcomeService];

@NgModule({
    declarations: [PAGES, NoSanitizePipe],
    imports: [
        CommonModule,
        WelcomeSettingdRecordRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        AngularEditorModule,
        QuillModule.forRoot({ suppressGlobalRegisterWarning: true })
    ],
    providers: [SERVICES],
})
export class WelcomeSettingsRecordModule { }
