import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/core/services';
import { IndicatorSiacService } from 'src/app/core/services/api/indicator-siac/indicator-siac.service';
import { ValidatorService } from 'src/app/shared/validators';
import { Alert, clearForm } from 'src/app/utils/helpers';
import { CampusDTO, IndicadorSiacDTO, IndicadorSiacDTOV1,Vista } from 'src/app/utils/models';
import { IndicatorSiacData } from './indicator-siac-record.service';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

export enum ModalTitle { 
    NEW = 'Nuevo indicador SIAC',
    EDIT = 'Editar indicador SIAC',
}
@Component({
    selector: 'app-indicator-siac-record',
    templateUrl: './indicator-siac-record.component.html',
    styleUrls: ['./indicator-siac-record.component.scss'],
})
export class IndicatorSiacRecordComponent implements OnInit, OnDestroy {
    indicatorSiacRecordForm: UntypedFormGroup;
    title: ModalTitle;
    data: IndicadorSiacDTOV1;
    edit: boolean;
    subscription: Subscription;
    disabled: boolean;
    permission: boolean;
    thisAccess: Vista;
    permissions: boolean[];
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public readonly indicatorSiacData: IndicatorSiacData,
        public readonly indicatorSiacService: IndicatorSiacService,
        private readonly formBuilder: UntypedFormBuilder,
        private readonly ref: MatDialogRef<never>,
        private users: UsersService,
        private readonly validator: ValidatorService
    ) {
        this.title = ModalTitle.NEW;
        this.data = new IndicadorSiacDTOV1();
        this.edit = null;
        this.disabled = null;
        this.permission = null;

        this.subscription = new Subscription();
        this.indicatorSiacRecordForm = this.formBuilder.group({
            clave: [null, [Validators.required, Validators.maxLength(10), this.validator.noWhitespace]],
            nombre: [null, [Validators.required, Validators.maxLength(500), this.validator.noWhitespace]],
            descripcion: [null, [Validators.required, Validators.maxLength(500), this.validator.noWhitespace]],
            activo: [true, []],
        });
        this.permissions = [false, false, false];
    }

    ngOnInit() {
        this.setPermissions();
        this.disabled=!this.checkPermission(2);
        this.title = this.indicatorSiacData ? ModalTitle.EDIT : ModalTitle.NEW;

        if (this.indicatorSiacData) {
            this.indicatorSiacService
                .getIndicatorSiacById(this.indicatorSiacData.data.id)
                .subscribe((response) => {
                    if (!response.output) {
                        return;
                    }
                    const data = new IndicadorSiacDTOV1().deserialize(response.output[0]);
                    this.data = data;
                    this.indicatorSiacRecordForm.patchValue(data);
                    this.indicatorSiacRecordForm.get('clave').disable();
                    this.trackingStatusForm();
                });
        } else {
            this.trackingStatusForm();
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    submit(): void {
        this.indicatorSiacRecordForm.markAllAsTouched();
        if (this.indicatorSiacRecordForm.invalid) {
            Alert.error('Verifique que los campos sean correctos');
            return;
        }
        clearForm(this.indicatorSiacRecordForm);
        const tmp = this.indicatorSiacRecordForm.getRawValue();
        const indicadorSiac: IndicadorSiacDTOV1 = new IndicadorSiacDTOV1().deserialize(tmp);
        if (this.data.id) {
            indicadorSiac.id = this.data.id;
            indicadorSiac.fechaCreacion = this.data.fechaCreacion;
            indicadorSiac.usuarioCreacion = this.data.usuarioCreacion;
            indicadorSiac.fechaModificacion = new Date();
            indicadorSiac.usuarioModificacion = this.users.userSession.nombre;
            this.indicatorSiacService.updateIndicatorSiac(indicadorSiac).subscribe(() => {
                Alert.success('', 'Indicador siac actualizado correctamente');
                this.ref.close(true);
            });
        } else {
            indicadorSiac.id = '0';
            indicadorSiac.fechaCreacion = new Date();
            indicadorSiac.usuarioCreacion = this.users.userSession.nombre;
            this.indicatorSiacService.createIndicatorSiac(indicadorSiac).subscribe(() => {
                Alert.success('', 'Indicador siac creado correctamente');
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
        this.subscription.add(this.indicatorSiacRecordForm.statusChanges.subscribe(() => (this.edit = true)));
    }

    private setPermissions(): void {
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_INDICADOR_SIAC);

        if (this.thisAccess && this.thisAccess.tipoAcceso && this.thisAccess.tipoAcceso.length && this.thisAccess.tipoAcceso.length >0)   // consulta
        {
            this.thisAccess.tipoAcceso.forEach((element, index) => {
                if (element.id == 1) this.permissions[0] =  true ;
                if (element.id == 2) this.permissions[1] =  true ;
                if (element.id == 3) this.permissions[2] =  true ;
            });
        }
    }

    checkPermission(p: number): boolean {
        return this.permissions[p];
    }
}
