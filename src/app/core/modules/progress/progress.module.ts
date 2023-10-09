import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProgressComponent } from './progress.component';
import { ProgressInterceptor } from './progress.interceptor';
import { ProgressService } from './progress.service';

const COMPONENTS = [ProgressComponent];

const PROVIDERS = [ProgressService];

@NgModule({
  declarations: COMPONENTS,
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: COMPONENTS,
  providers: [PROVIDERS, { provide: HTTP_INTERCEPTORS, useClass: ProgressInterceptor, multi: true }],
})
export class ProgressModule {
  static forRoot(): ModuleWithProviders<ProgressModule> {
    return {
      ngModule: ProgressModule,
      providers: PROVIDERS,
    };
  }
}
