import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UvmMatrixRoutingModule } from './uvm-matrix-routing.module';
import { UvmMatrixComponent } from './uvm-matrix.component';
import { ComponentsUvmComponent } from './pages/components-uvm/components-uvm.component';
import { IndicatorsUvmComponent } from './pages/indicators-uvm/indicators-uvm.component';
import { SubIndicatorsUvmComponent } from './pages/sub-indicators-uvm/sub-indicators-uvm.component';
import { SharedModule } from 'src/app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentUvmRecordComponent } from './pages/components-uvm/modals/component-uvm-record/component-uvm-record.component';
import { ComponentUvmRecordService } from './pages/components-uvm/modals';
import { IndicatorUvmRecordComponent } from './pages/indicators-uvm/modals/indicator-uvm-record/indicator-uvm-record.component';
import { IndicatorUvmRecordService } from './pages/indicators-uvm/modals';

import { SubIndicatorUvmRecordComponent, SubIndicatorUvmRecordService } from './pages/sub-indicators-uvm/modals';
import { UvmMatrixRecordComponent } from './modals/uvm-matrix-record/uvm-matrix-record.component';
import { UvmMatrixRecordService } from './modals/uvm-matrix-record/uvm-matrix-record.service';

const PAGES = [ComponentsUvmComponent, IndicatorsUvmComponent, SubIndicatorsUvmComponent, UvmMatrixComponent];

const MODALS = [
    ComponentUvmRecordComponent,
    IndicatorUvmRecordComponent,
    SubIndicatorUvmRecordComponent,
    UvmMatrixRecordComponent,
];

const SERVICES = [
    ComponentUvmRecordService,
    IndicatorUvmRecordService,
    SubIndicatorUvmRecordService,
    UvmMatrixRecordService,
];

@NgModule({
    declarations: [PAGES, MODALS],
    imports: [CommonModule, UvmMatrixRoutingModule, SharedModule, ReactiveFormsModule],
    providers: [SERVICES],
})
export class UvmMatrixModule { }
