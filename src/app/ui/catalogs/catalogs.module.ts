import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogsRoutingModule } from './catalogs-routing.module';
import { CatalogsComponent } from './catalogs.component';
import { SharedModule } from 'src/app/shared';

@NgModule({
    declarations: [CatalogsComponent],
    imports: [CommonModule, CatalogsRoutingModule, SharedModule],
})
export class CatalogsModule { }
