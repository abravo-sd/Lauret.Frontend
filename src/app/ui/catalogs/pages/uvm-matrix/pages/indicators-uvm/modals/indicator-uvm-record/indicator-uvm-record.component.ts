import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IndicatorService, IndicatorUvmService, ComponentUvmService, UsersService } from 'src/app/core/services';
import { ValidatorService } from 'src/app/shared/validators';
//import { IndicatorData } from 'src/app/ui/configurations/pages/indicators/modals/indicator-record/indicator-record.service';
import { Alert, clearForm } from 'src/app/utils/helpers';
import { IndicadorUVMDTO, IndicadorUVMDTOV1, ComponenteUVMDTOV1, Vista } from 'src/app/utils/models';
import { IndicatorUVMData } from './indicator-uvm-record.service';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

export enum ModalTitle {
    NEW = 'Nuevo indicador UVM',
    EDIT = 'Editar indicador UVM',
}
@Component({
    selector: 'app-indicator-uvm-record',
    templateUrl: './indicator-uvm-record.component.html',
    styleUrls: ['./indicator-uvm-record.component.scss'],
})
export class IndicatorUvmRecordComponent implements OnInit, OnDestroy {
    indicatorUvmRecordForm: UntypedFormGroup;
    title: ModalTitle;
    data: IndicadorUVMDTOV1;
    componenteUVMList: ComponenteUVMDTOV1[];
    edit: boolean;
    subscription: Subscription;
    disabled: boolean;
    permission: boolean;
    thisAccess: Vista;
    permissions: boolean[];
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public readonly indicatorData: IndicatorUVMData,
        private readonly formBuilder: UntypedFormBuilder,
        private readonly ref: MatDialogRef<never>,
        private readonly validator: ValidatorService,
        private readonly indicatorUvmService: IndicatorUvmService,
        private readonly componentUvmService: ComponentUvmService,
        private readonly users: UsersService
    ) {
        this.subscription = new Subscription();
        this.title = ModalTitle.NEW;
        this.data = new IndicadorUVMDTOV1();
        this.componenteUVMList = [];
        this.edit = null;
        this.disabled = null;
        this.permission = null;
        this.indicatorUvmRecordForm = this.formBuilder.group({
            // clave: [null, [Validators.required, Validators.maxLength(50), this.validator.noWhitespace]],
            nombreIndicadorUvm: [null, [Validators.required, Validators.maxLength(500), this.validator.noWhitespace]],
            componenteUvmId: [null, [Validators.required]],
            activo: [true, []],
        });
        this.permissions = [false, false, false];
    }

    ngOnInit(): void {
        this.setPermissions();
        this.disabled = !this.checkPermission(2);
        this.title = this.indicatorData ? ModalTitle.EDIT : ModalTitle.NEW;
        Promise.all([this.componentUvmService.setAllComponentsUvm()]).then(() => {
            this.componenteUVMList = this.componentUvmService.componentUvmList;
        });
        if (this.indicatorData) {
            this.indicatorUvmService.getIndicatorsUvmById(this.indicatorData.data.id).subscribe((response) => {
                if (!response.output) {
                    return;
                }
                const data = new IndicadorUVMDTOV1().deserialize(response.output[0]);
                this.data = data;
                this.indicatorUvmRecordForm.patchValue(data);
                // this.indicatorUvmRecordForm.get('clave').disable();
                this.trackingStatusForm();
            });
        } else {
            this.trackingStatusForm();
        }
    }

    submit(): void {
        this.indicatorUvmRecordForm.markAllAsTouched();
        if (this.indicatorUvmRecordForm.invalid) {
            Alert.error('Verifique que los campos sean correctos');
            return;
        }
        clearForm(this.indicatorUvmRecordForm);
        const tmp = this.indicatorUvmRecordForm.getRawValue();
        const indicadorUvm: IndicadorUVMDTOV1 = new IndicadorUVMDTOV1().deserialize(tmp);

        if (this.data.id) {
            indicadorUvm.id = this.data.id;
            indicadorUvm.fechaCreacion = this.data.fechaCreacion;
            indicadorUvm.usuarioCreacion = this.data.usuarioCreacion;
            indicadorUvm.fechaModificacion = new Date();
            indicadorUvm.usuarioModificacion = this.users.userSession.nombre;
            this.indicatorUvmService.updateIndicatorUvm(indicadorUvm).subscribe(() => {
                Alert.success('', 'Indicador uvm actualizado correctamente');
                this.ref.close(true);
            });
        } else {
            indicadorUvm.id = '0';
            indicadorUvm.fechaCreacion = new Date();
            indicadorUvm.usuarioCreacion = this.users.userSession.nombre;
            this.indicatorUvmService.createIndicatorUvm(indicadorUvm).subscribe(() => {
                Alert.success('', 'Indicador uvm creado correctamente');
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

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private trackingStatusForm(): void {
        this.subscription.add(this.indicatorUvmRecordForm.statusChanges.subscribe(() => (this.edit = true)));
    }

    private setPermissions(): void {
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_INDICADOR_UVM);

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
