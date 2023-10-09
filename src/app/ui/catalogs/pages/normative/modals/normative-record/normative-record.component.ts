import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { NormativeService, UsersService } from 'src/app/core/services';
import { ValidatorService } from 'src/app/shared/validators';
import { Alert, clearForm } from 'src/app/utils/helpers';
import { NormativaDTO, NormativaDTOV1, Vista } from 'src/app/utils/models';
import { NormativeData } from './normative-record.service';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

export enum ModalTitle {
    NEW = 'Nueva normativa',
    EDIT = 'Editar normativa',
}

@Component({
    templateUrl: './normative-record.component.html',
    styleUrls: ['./normative-record.component.scss'],
})
export class NormativeRecordComponent implements OnInit, OnDestroy {
    normativeRecordForm: FormGroup;
    title: ModalTitle;
    data: NormativaDTOV1;
    edit: boolean;
    subscription: Subscription;
    disabled: boolean;
    permission: boolean;
    thisAccess: Vista;
    permissions: boolean[];
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public readonly normativeData: NormativeData,
        private readonly formBuilder: FormBuilder,
        private readonly ref: MatDialogRef<never>,
        private users: UsersService,
        private normative: NormativeService,
        private readonly validator: ValidatorService
    ) {
        this.title = ModalTitle.NEW;
        this.data = new NormativaDTOV1();
        this.edit = null;
        this.disabled = null;
        this.permission = null;
        this.subscription = new Subscription();
        this.normativeRecordForm = this.formBuilder.group({
            clave: [null, [Validators.required, Validators.maxLength(10), this.validator.noWhitespace]],
            nombre: [null, [Validators.required, Validators.maxLength(500), this.validator.noWhitespace]],
            activo: [true, []],
        });
        this.permissions = [false, false, false];
    }

    ngOnInit(): void {
        this.setPermissions();
        this.disabled=!this.checkPermission(2);
        this.title = this.normativeData ? ModalTitle.EDIT : ModalTitle.NEW;
        if (this.normativeData) {
            // const data = new NormativaDTOV1().deserialize(this.normativeData.data);
            // this.data = data;
            // this.normativeRecordForm.patchValue(data);
            // this.normativeRecordForm.get('clave').disable();
            // this.checkPermission();
            // this.trackingStatusForm();

            this.normative.getnormativeById(this.normativeData.data.id).subscribe((response) => {
                if (!response.output) {
                    return;
                }
                const data: NormativaDTOV1 = new NormativaDTOV1().deserialize(response.output[0]);
                this.data = data;
                this.normativeRecordForm.patchValue(data);
                //this.normativeRecordForm.get('normativaId').disable();
                this.normativeRecordForm.get('clave').disable();
                this.trackingStatusForm();
            });
        } else {
            this.trackingStatusForm();
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
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

    submit(): void {
        this.normativeRecordForm.markAllAsTouched();
        if (this.normativeRecordForm.invalid) {
            Alert.error('Verifique que los campos sean correctos');
            return;
        }
        clearForm(this.normativeRecordForm);
        const tmp = this.normativeRecordForm.getRawValue();
        const normativa: NormativaDTOV1 = new NormativaDTOV1().deserialize(tmp);
        if (this.data.id) {
            normativa.id = this.data.id;
            normativa.fechaCreacion = this.data.fechaCreacion;
            normativa.usuarioCreacion = this.data.usuarioCreacion;
            normativa.fechaModificacion = new Date();
            normativa.usuarioModificacion = this.users.userSession.nombre;
            this.normative.updateNormative(normativa).subscribe(() => {
                Alert.success('', 'Normativa actualizada correctamente');
                this.ref.close(true);
            });
        } else {
            normativa.id = '0';
            normativa.fechaCreacion = new Date();
            normativa.usuarioCreacion = this.users.userSession.nombre;
            this.normative.createNormative(normativa).subscribe(() => {
                Alert.success('', 'Normativa creada correctamente');
                this.ref.close(true);
            });
        }
    }

    private trackingStatusForm(): void {
        this.subscription.add(this.normativeRecordForm.statusChanges.subscribe(() => (this.edit = true)));
    }

    private setPermissions(): void {
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_NORMATIVA);

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
