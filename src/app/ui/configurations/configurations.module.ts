import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationsRoutingModule } from './configurations-routing.module';
import { ConfigurationsComponent } from './configurations.component';
import { SharedModule } from 'src/app/shared';

@NgModule({
  declarations: [ConfigurationsComponent],
  imports: [CommonModule, ConfigurationsRoutingModule, SharedModule],
})
export class ConfigurationsModule {}
