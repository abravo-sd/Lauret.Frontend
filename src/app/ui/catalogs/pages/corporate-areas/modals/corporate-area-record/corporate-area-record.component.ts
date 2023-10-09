import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { MatChipInputEvent } from '@angular/material/chips/public-api';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/core/services';
import { CorporateAreaService } from 'src/app/core/services/api/coporate-area/corporate-area.service';
import { ValidatorService } from 'src/app/shared/validators';
import { Alert, clearForm } from 'src/app/utils/helpers';
import { AreaCorporativaDTO, AreaCorporativaDTOV1, TablePaginatorSearch, Vista } from 'src/app/utils/models';
import { AreaCorporativaSubAreaDTO } from 'src/app/utils/models/area-corporativ-sub-area.dto';
import { CorporateAreaData } from './coporate-area-record.service';
import { CorporateSubAreaService } from 'src/app/core/services/api/corporate-subarea/corporate-subarea.service';
import { SubAreaCorporativaDTOV1 } from 'src/app/utils/models/subarea-corporativa.dto.v1';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

export enum ModalTitle {
    NEW = 'Nueva área corporativa',
    EDIT = 'Editar área corporativa',
}
@Component({
    templateUrl: './corporate-area-record.component.html',
    styleUrls: ['./corporate-area-record.component.scss'],
})
export class CorporateAreaRecordComponent implements OnInit, OnDestroy {
    corporateAreaRecordForm: FormGroup;
    title: ModalTitle;
    data: AreaCorporativaDTOV1;
    edit: boolean;
    subscription: Subscription;
    disabled: boolean;
    permission: boolean;
    removable: boolean;
    subareascorporativaList: SubAreaCorporativaDTOV1[] = [];
    public separatorKeysCodes = [ENTER, COMMA];
    public corporateAreaSubAreasList: number[] = [];
    thisAccess: Vista;
    permissions: boolean[];

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public readonly coporateAreaData: CorporateAreaData,
        private readonly formBuilder: FormBuilder,
        private readonly corporateArea: CorporateAreaService,
        private readonly ref: MatDialogRef<never>,
        private users: UsersService,
        private readonly validator: ValidatorService,
        private readonly corporateSubArea: CorporateSubAreaService
    ) {
        // this.corporateAreaSubAreasList = [];
        this.title = ModalTitle.NEW;
        this.data = new AreaCorporativaDTOV1();
        this.edit = null;
        this.disabled = null;
        this.permission = null;
        this.subscription = new Subscription();
        this.removable = true;
        this.corporateAreaRecordForm = this.formBuilder.group({
            siglas: [null, [Validators.required, Validators.maxLength(5), this.validator.noWhitespace]],
            nombre: [null, [Validators.required, Validators.maxLength(150), this.validator.noWhitespace]],
            subareas_: [null, []],
            activo: [true, []],
        });
        this.permissions = [false, false, false];
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    
    ngOnInit(): void {
        this.setPermissions();
        this.disabled = !this.checkPermission(2);
        this.title = this.coporateAreaData ? ModalTitle.EDIT : ModalTitle.NEW;
        this.getAllSubAreas();
        if (this.coporateAreaData) {
            this.corporateArea.getCoporateAreaById(this.coporateAreaData.data.id).subscribe((response) => {
                if (!response.output) {
                    return;
                }
                const data = new AreaCorporativaDTOV1().deserialize(response.output[0]);
                this.data = data;
                this.corporateAreaSubAreasList = [];
                const subareas_ = data.subareasIds.split(',');
                subareas_.forEach((x) => {
                    this.corporateAreaSubAreasList.push(Number(x));
                });

                // this.corporateAreaSubAreasList = this.data.areaCorporativaSubAreas;
                this.corporateAreaRecordForm.patchValue(data);
                //this.corporateAreaRecordForm.get('siglas').disable();
                this.corporateAreaRecordForm.get('siglas').updateValueAndValidity();
                
                this.corporateAreaRecordForm.get('nombre').updateValueAndValidity();
                this.corporateAreaRecordForm.get('subareas_').setValue(this.corporateAreaSubAreasList);
                this.corporateAreaRecordForm.get('subareas_').updateValueAndValidity();
                this.trackingStatusForm();
            });
        } else {
            this.trackingStatusForm();
        }
    }

    submit(): void {
        this.corporateAreaRecordForm.markAllAsTouched();
        if (this.corporateAreaRecordForm.invalid) {
            Alert.error('Verifique que los campos sean correctos');
            return;
        }
        clearForm(this.corporateAreaRecordForm);
        const tmp = this.corporateAreaRecordForm.getRawValue();
        const areaCorporativa: AreaCorporativaDTOV1 = new AreaCorporativaDTOV1().deserialize(tmp);

        // areaCorporativa.areaCorporativaSubAreas = this.corporateAreaSubAreasList;
        if (this.data.id) {
            areaCorporativa.id = this.data.id;
            areaCorporativa.fechaCreacion = this.data.fechaCreacion;
            areaCorporativa.usuarioCreacion = this.data.usuarioCreacion;
            areaCorporativa.fechaModificacion = new Date();
            areaCorporativa.usuarioModificacion = this.users.userSession.nombre;
            
            areaCorporativa.listaSubareas = areaCorporativa.subareas_;
            this.corporateArea.updateCorporateArea(areaCorporativa).subscribe(() => {
                Alert.success('', 'Área corporativa actualizada correctamente');
                this.ref.close(true);
            });
        } else {
            areaCorporativa.id = '0';
            areaCorporativa.fechaCreacion = new Date();
            areaCorporativa.usuarioCreacion = this.users.userSession.nombre;
            areaCorporativa.listaSubareas = areaCorporativa.subareas_;
            this.corporateArea.createCorporateArea(areaCorporativa).subscribe(() => {
                Alert.success('', 'Área corporativa creada correctamente');
                this.ref.close(true);
            });
        }
    }

    closeModalByConfimation(): void {
        if (!this.edit) {
            this.ref.close();
            return;
        }
        Alert.confirm('Alerta', '¿Está seguro de que desea salir? Los datos ingresados no serán guardados.').subscribe(
            (result) => {
                if (!result || !result.isConfirmed) {
                    return;
                }
                this.ref.close();
            }
        );
    }

    private trackingStatusForm(): void {
        this.subscription.add(this.corporateAreaRecordForm.statusChanges.subscribe(() => (this.edit = true)));
    }

    /*   addSubAreaList(event: MatChipInputEvent): void {
        const value: string = (event.value || '').trim();
        if (value) {
    
          this.corporateAreaSubAreasList.push(value);
        }
        event.chipInput!.clear();
      }
    
      removeAreaList(item: string): void {
        if (this.corporateAreaSubAreasList.indexOf(item) >= 0) {
          this.corporateAreaSubAreasList.splice(this.corporateAreaSubAreasList.indexOf(item), 1);
        }
      } */


    private getAllSubAreas(): void {
        const filters = new TablePaginatorSearch();
        this.corporateSubArea.getAllCorporateSubAreas(filters).subscribe((response) => {
            if (response.output) {
                this.subareascorporativaList = response.output
                    .map((sub) => new SubAreaCorporativaDTOV1().deserialize(sub))
                    .filter((Y) => Y.activo == true);
            }
        });
    }

    private setPermissions(): void {
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_AREAS_CORP);

        if (this.thisAccess && this.thisAccess.tipoAcceso && this.thisAccess.tipoAcceso.length && this.thisAccess.tipoAcceso.length > 0)   // consulta
        {
            this.thisAccess.tipoAcceso.forEach((element, index) => {
                if (element.id == 1) this.permissions[0] = true;
                if (element.id == 2) this.permissions[1] = true;
                if (element.id == 3) this.permissions[2] = true;
            });
        }
    }

    checkPermission(p: number): boolean {
        return this.permissions[p];
    }
}
