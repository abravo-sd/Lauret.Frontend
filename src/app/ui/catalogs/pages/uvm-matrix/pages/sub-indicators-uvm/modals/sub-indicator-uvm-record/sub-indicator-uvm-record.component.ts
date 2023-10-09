import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SubindicatorUvmService, IndicatorUvmService, ComponentUvmService, UsersService } from 'src/app/core/services';
import { ValidatorService } from 'src/app/shared/validators';
import { Alert, clearForm } from 'src/app/utils/helpers';
import { SubIndicadorUVMDTO, SubIndicadorUVMDTOV1, IndicadorUVMDTOV1, ComponenteUVMDTOV1, Vista } from 'src/app/utils/models';
import { SubIndicatorUvmData } from './sub-indicator-uvm-record.service';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

export enum ModalTitle {
    NEW = 'Nuevo subindicador UVM',
    EDIT = 'Editar subindicador UVM',
}
@Component({
    selector: 'app-sub-indicator-uvm-record',
    templateUrl: './sub-indicator-uvm-record.component.html',
    styleUrls: ['./sub-indicator-uvm-record.component.scss'],
})
export class SubIndicatorUvmRecordComponent implements OnInit, OnDestroy {
    SubIndicatorUvmRecordForm: UntypedFormGroup;
    title: ModalTitle;
    data: SubIndicadorUVMDTOV1;
    indicadorUVMList: IndicadorUVMDTOV1[];
    componentUVMList: ComponenteUVMDTOV1[];
    edit: boolean;
    subscription: Subscription;
    disabled: boolean;
    permission: boolean;
    thisAccess: Vista;
    permissions: boolean[];
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public readonly subIndicadorUvmData: SubIndicatorUvmData,
        private readonly formBuilder: UntypedFormBuilder,
        private readonly ref: MatDialogRef<never>,
        private readonly validator: ValidatorService,
        private readonly subindicatorUvmService: SubindicatorUvmService,
        private readonly indicatorUvmService: IndicatorUvmService,
        private readonly ComponentUvmService: ComponentUvmService,
        private users: UsersService
    ) {
        this.subscription = new Subscription();
        this.title = ModalTitle.NEW;
        this.data = new SubIndicadorUVMDTOV1();
        this.indicadorUVMList = [];
        this.componentUVMList = [];
        this.edit = null;
        this.disabled = null;
        this.permission = null;
        this.SubIndicatorUvmRecordForm = this.formBuilder.group({
            // clave: [null, [Validators.required, Validators.maxLength(50), this.validator.noWhitespace]],
            nombreSubIndicadorUvm: [null, [Validators.required, Validators.maxLength(500), this.validator.noWhitespace]],
            indicadorUvmId: [null, [Validators.required]],
            componenteUvmId: [null, [Validators.required]],
            // nombreComponenteUvm: [{ value: null, disabled: true }, []],
            activo: [true, []]
        });
        this.permissions = [false, false, false];
    }

    ngOnInit(): void {
        this.setPermissions();
        this.disabled=!this.checkPermission(2);
        this.title = this.subIndicadorUvmData ? ModalTitle.EDIT : ModalTitle.NEW;
        Promise.all([this.indicatorUvmService.setAllIndicatorsUvm()]).then(() => {
            this.indicadorUVMList = this.indicatorUvmService.indicatorUvmList;
        });
        Promise.all([this.ComponentUvmService.setAllComponentsUvm()]).then(() => {
            this.componentUVMList = this.ComponentUvmService.componentUvmList;
        });
        if (this.subIndicadorUvmData) {
            this.subindicatorUvmService.getSubIndicatorUvmById(this.subIndicadorUvmData.data.id).subscribe((response) => {
                if (!response.output) {
                    return;
                }
                const data = new SubIndicadorUVMDTOV1().deserialize(response.output[0]);
                this.data = data;
                this.SubIndicatorUvmRecordForm.patchValue(data);
                // this.SubIndicatorUvmRecordForm.get('clave').disable();
                this.trackingStatusForm();
            });
        } else {
            this.trackingStatusForm();
        }
    }

    submit(): void {
        this.SubIndicatorUvmRecordForm.markAllAsTouched();
        if (this.SubIndicatorUvmRecordForm.invalid) {
            Alert.error('Verifique que los campos sean correctos');
            return;
        }
        clearForm(this.SubIndicatorUvmRecordForm);
        const tmp = this.SubIndicatorUvmRecordForm.getRawValue();
        const subIndicadorUvm: SubIndicadorUVMDTOV1 = new SubIndicadorUVMDTOV1().deserialize(tmp);

        if (this.data.id) {
            subIndicadorUvm.id = this.data.id;
            subIndicadorUvm.fechaCreacion = this.data.fechaCreacion;
            subIndicadorUvm.usuarioCreacion = this.data.usuarioCreacion;
            subIndicadorUvm.fechaModificacion = new Date();
            subIndicadorUvm.usuarioModificacion = this.users.userSession.nombre;
            this.subindicatorUvmService.updateSubIndicatorUvm(subIndicadorUvm).subscribe(() => {
                Alert.success('', 'Subindicador uvm actualizado correctamente');
                this.ref.close(true);
            });
        } else {
            subIndicadorUvm.id = '0';
            subIndicadorUvm.fechaCreacion = new Date();
            subIndicadorUvm.usuarioCreacion = this.users.userSession.nombre;
            this.subindicatorUvmService.createSubIndicatortUvm(subIndicadorUvm).subscribe(() => {
                Alert.success('', 'Subindicador uvm creado correctamente');
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
        this.subscription.add(this.SubIndicatorUvmRecordForm.statusChanges.subscribe(() => (this.edit = true)));
    }

    private setPermissions(): void {
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_SUBINDICADOR_UVM);

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
