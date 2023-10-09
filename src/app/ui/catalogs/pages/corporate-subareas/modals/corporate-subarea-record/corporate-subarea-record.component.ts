import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
//import { MatChipInputEvent } from '@angular/material/chips/public-api';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/core/services';
import { CorporateAreaService } from 'src/app/core/services/api/coporate-area/corporate-area.service';
import { ValidatorService } from 'src/app/shared/validators';
import { Alert, clearForm } from 'src/app/utils/helpers';
import { AreaCorporativaDTO, Vista } from 'src/app/utils/models';
import { AreaCorporativaSubAreaDTO } from 'src/app/utils/models/area-corporativ-sub-area.dto';
import { CorporateSubAreaData } from './corporate-subarea-record.service';
import { SubAreaCorporativaDTOV1 } from 'src/app/utils/models/subarea-corporativa.dto.v1';
import { CorporateSubAreaService } from 'src/app/core/services/api/corporate-subarea/corporate-subarea.service';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

export enum ModalTitle {
    NEW = 'Nueva sub área corporativa',
    EDIT = 'Editar sub área corporativa',
}
@Component({
    templateUrl: './corporate-subarea-record.component.html',
    styleUrls: ['./corporate-subarea-record.component.scss'],
})
export class CorporateSubAreaRecordComponent implements OnInit, OnDestroy {
    corporateSubAreaRecordForm: UntypedFormGroup;
    title: ModalTitle;
    data: SubAreaCorporativaDTOV1;
    edit: boolean;
    subscription: Subscription;
    disabled: boolean;
    permission: boolean;
    removable: boolean;
    public separatorKeysCodes = [ENTER, COMMA];
    thisAccess: Vista;
    permissions: boolean[];

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public readonly coporateAreaData: CorporateSubAreaData,
        private readonly formBuilder: UntypedFormBuilder,
        private readonly corporateArea: CorporateSubAreaService,
        private readonly ref: MatDialogRef<never>,
        private users: UsersService,
        private readonly validator: ValidatorService
    ) {
        // this.corporateAreaSubAreasList = [];
        this.title = ModalTitle.NEW;
        this.data = new SubAreaCorporativaDTOV1();
        this.edit = null;
        this.disabled = null;
        this.permission = null;
        this.subscription = new Subscription();
        this.removable = true;
        this.corporateSubAreaRecordForm = this.formBuilder.group({
            siglas: [null, [Validators.required, Validators.maxLength(5), this.validator.noWhitespace]],
            nombre: [null, [Validators.required, Validators.maxLength(150), this.validator.noWhitespace]],
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
        if (this.coporateAreaData) {
            this.corporateArea.getCoporateSubAreaById(this.coporateAreaData.data.id).subscribe((response) => {
                if (!response.output) {
                    return;
                }
                const data = new SubAreaCorporativaDTOV1().deserialize(response.output[0]);
                this.data = data;
                // this.corporateAreaSubAreasList = this.data.areaCorporativaSubAreas;
                this.corporateSubAreaRecordForm.patchValue(data);
                this.corporateSubAreaRecordForm.get('siglas').disable();
                this.corporateSubAreaRecordForm.get('nombre').updateValueAndValidity();
                this.trackingStatusForm();
            });
        } else {
            this.trackingStatusForm();
        }
    }

    submit(): void {
        this.corporateSubAreaRecordForm.markAllAsTouched();
        if (this.corporateSubAreaRecordForm.invalid) {
            Alert.error('Verifique que los campos sean correctos');
            return;
        }
        clearForm(this.corporateSubAreaRecordForm);
        const tmp = this.corporateSubAreaRecordForm.getRawValue();
        const areaCorporativa: SubAreaCorporativaDTOV1 = new SubAreaCorporativaDTOV1().deserialize(tmp);

        // areaCorporativa.areaCorporativaSubAreas = this.corporateAreaSubAreasList;
        if (this.data.id) {
            areaCorporativa.id = this.data.id;
            areaCorporativa.fechaCreacion = this.data.fechaCreacion;
            areaCorporativa.usuarioCreacion = this.data.usuarioCreacion;
            areaCorporativa.fechaModificacion = new Date();
            areaCorporativa.usuarioModificacion = this.users.userSession.nombre;
            this.corporateArea.updateCorporateSubArea(areaCorporativa).subscribe(() => {
                Alert.success('', 'Sub Área corporativa actualizada correctamente');
                this.ref.close(true);
            });
        } else {
            areaCorporativa.id = '0';
            areaCorporativa.fechaCreacion = new Date();
            areaCorporativa.usuarioCreacion = this.users.userSession.nombre;
            this.corporateArea.createCorporateSubArea(areaCorporativa).subscribe(() => {
                Alert.success('', 'Sub Área corporativa creada correctamente');
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
        this.subscription.add(this.corporateSubAreaRecordForm.statusChanges.subscribe(() => (this.edit = true)));
    }

    private setPermissions(): void {
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_SUBAREAS_CORP);

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
