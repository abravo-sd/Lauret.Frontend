import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ComponentUvmService, UsersService } from 'src/app/core/services';
import { ValidatorService } from 'src/app/shared/validators';
import { Alert, clearForm } from 'src/app/utils/helpers';
import { ComponenteUVMDTO, ComponenteUVMDTOV1, Vista } from 'src/app/utils/models';
import { ComponentUVMData } from './component-uvm-record.service';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

export enum ModalTitle {
    NEW = 'Nuevo componente UVM',
    EDIT = 'Editar componente UVM',
}

@Component({
    selector: 'app-component-uvm-record',
    templateUrl: './component-uvm-record.component.html',
    styleUrls: ['./component-uvm-record.component.scss'],
})
export class ComponentUvmRecordComponent implements OnInit, OnDestroy {
    componentUvmRecordForm: FormGroup;
    title: ModalTitle;
    data: ComponenteUVMDTOV1;
    edit: boolean;
    subscription: Subscription;
    disabled: boolean;
    permission: boolean;
    thisAccess: Vista;
    permissions: boolean[];
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public readonly componentUvmData: ComponentUVMData,
        private readonly formBuilder: FormBuilder,
        private readonly ref: MatDialogRef<never>,
        private readonly validator: ValidatorService,
        private readonly componentUvmService: ComponentUvmService,
        private readonly users: UsersService
    ) {
        this.subscription = new Subscription();
        this.title = ModalTitle.NEW;
        this.data = new ComponenteUVMDTOV1();
        this.edit = null;
        this.disabled = null;
        this.permission = null;
        this.componentUvmRecordForm = this.formBuilder.group({
            // clave: [null, [Validators.required, Validators.maxLength(50), this.validator.noWhitespace]],
            nombreComponenteUvm: [null, [Validators.required, Validators.maxLength(200), this.validator.noWhitespace]],
            descripcionComponenteUvm: [null, [Validators.required, Validators.maxLength(500), this.validator.noWhitespace]],
            activo: [true, []],
        });
        this.permissions = [false, false, false];
    }

    ngOnInit(): void {
        this.setPermissions();
        this.disabled = !this.checkPermission(2);
        this.title = this.componentUvmData ? ModalTitle.EDIT : ModalTitle.NEW;
        if (this.componentUvmData) {
            this.componentUvmService.getComponentUvmById(this.componentUvmData.data.id).subscribe((response) => {
                if (!response.output) {
                    return;
                }
                const data = new ComponenteUVMDTOV1().deserialize(response.output[0]);
                this.data = data;
                this.componentUvmRecordForm.patchValue(data);
                // this.componentUvmRecordForm.get('clave').disable();

                this.trackingStatusForm();
            });
        } else {

            this.trackingStatusForm();
        }
    }

    submit(): void {
        this.componentUvmRecordForm.markAllAsTouched();
        if (this.componentUvmRecordForm.invalid) {
            Alert.error('Verifique que los campos sean correctos');
            return;
        }
        clearForm(this.componentUvmRecordForm);
        const tmp = this.componentUvmRecordForm.getRawValue();
        const componenteUvm: ComponenteUVMDTOV1 = new ComponenteUVMDTOV1().deserialize(tmp);

        if (this.data.id) {
            componenteUvm.id = this.data.id;
            componenteUvm.fechaCreacion = this.data.fechaCreacion;
            componenteUvm.usuarioCreacion = this.data.usuarioCreacion;
            componenteUvm.fechaModificacion = new Date();
            componenteUvm.usuarioModificacion = this.users.userSession.nombre;
            this.componentUvmService.updateComponentUvm(componenteUvm).subscribe(() => {
                Alert.success('', 'Componente uvm actualizado correctamente');
                this.ref.close(true);
            });
        } else {
            componenteUvm.id = '0';
            componenteUvm.fechaCreacion = new Date();
            componenteUvm.usuarioCreacion = this.users.userSession.nombre;
            this.componentUvmService.createComponentUvm(componenteUvm).subscribe(() => {
                Alert.success('', 'Componente uvm creado correctamente');
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
        this.subscription.add(this.componentUvmRecordForm.statusChanges.subscribe(() => (this.edit = true)));
    }

    private setPermissions(): void {
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_COMPONENT_UVM);

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
