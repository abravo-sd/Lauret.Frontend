import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EvidencesCatalogService,  UsersService } from 'src/app/core/services';
import { ValidatorService } from 'src/app/shared/validators';
import { Alert, clearForm } from 'src/app/utils/helpers';
import { EvidenceDTO, RegionDTO, RegionDTOV1, TablePaginatorSearch, UsuarioDTOV1,Vista } from 'src/app/utils/models';
import { EvidenceData } from './evidence-record.service';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

export enum ModalTitle {
    NEW = 'Nueva Evidencia',
    EDIT = 'Editar Evidencia',
}

@Component({
    selector: 'app-evidence-record',
    templateUrl: './evidence-record.component.html',
    styleUrls: ['./evidence-record.component.scss'],
})
export class EvidenceRecordComponent implements OnInit, OnDestroy {
    evidenceRecordForm: UntypedFormGroup;
    title: ModalTitle;
    data: EvidenceDTO;
    edit: boolean;
    subscription: Subscription;
    disabled: boolean;
    permission: boolean;
    thisAccess: Vista;
    permissions: boolean[];
  //  usuariosList: UsuarioDTOV1[];

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public readonly evidenceData: EvidenceData,
        private readonly formBuilder: UntypedFormBuilder,
        private readonly evidenceServ: EvidencesCatalogService,
        private readonly ref: MatDialogRef<never>,
        private users: UsersService,
        private readonly validator: ValidatorService
    ) {
        this.title = ModalTitle.NEW;
        this.data = new EvidenceDTO();
        this.edit = null;
        this.disabled = null;
        this.permission = null;
        this.subscription = new Subscription();
        this.evidenceRecordForm = this.formBuilder.group({
            clave: [null, [Validators.required, Validators.maxLength(10), this.validator.noWhitespace]],
            nombre: [null, [Validators.required, Validators.maxLength(150), this.validator.noWhitespace]],
            descripcion: [null, [Validators.required, Validators.maxLength(250), this.validator.noWhitespace]],
            cantidad: [null, [Validators.required, Validators.maxLength(3), this.validator.noWhitespace]],
            activo: [true, []],
            // direccionRegional: [null, [Validators.maxLength(150)]],
        });
        this.permissions = [false, false, false];
    }

    ngOnInit() {
        this.setPermissions();
        this.disabled=!this.checkPermission(2);
        // this.getAllUsers();
        this.title = this.evidenceData ? ModalTitle.EDIT : ModalTitle.NEW;
        if (this.evidenceData) {
            this.evidenceServ.getEvidenceById(this.evidenceData.data.id).subscribe((response) => {
                if (!response.output) {
                    return;
                }
                const data = new EvidenceDTO().deserialize(response.output[0]);
                this.data = data;
                this.evidenceRecordForm.patchValue(data);
                this.evidenceRecordForm.get('clave').disable();
        
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
        this.evidenceRecordForm.markAllAsTouched();
        if (this.evidenceRecordForm.invalid) {
            Alert.error('Verifique que los campos sean correctos');
            return;
        }
        clearForm(this.evidenceRecordForm);
        const tmp = this.evidenceRecordForm.getRawValue();
        const evidence: EvidenceDTO = new EvidenceDTO().deserialize(tmp);
        if (this.data.id) {
            evidence.id = this.data.id;
            evidence.nombre = evidence.nombre;
            evidence.descripcion = evidence.descripcion;
            evidence.cantidad = evidence.cantidad;
            
            evidence.fechaCreacion = this.data.fechaCreacion;
            evidence.usuarioCreacion = this.data.usuarioCreacion;
            evidence.fechaModificacion = new Date();
            evidence.usuarioModificacion = this.users.userSession.nombre;
          
            this.evidenceServ.updateEvidence(evidence).subscribe(() => {
                Alert.success('', 'Evidencia actualizada correctamente');
                this.ref.close(true);
            });
        } else {
            evidence.id = '0';
            evidence.nombre = evidence.nombre;
            evidence.descripcion = evidence.descripcion;
            evidence.cantidad = evidence.cantidad;            
            evidence.fechaCreacion = new Date();
            evidence.usuarioCreacion = this.users.userSession.nombre;         
            this.evidenceServ.createEvidence(evidence).subscribe(() => {
                Alert.success('', 'Evidencia creada correctamente');
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
                this.ref.close(result);
            }
        );
    }

    private trackingStatusForm(): void {
        this.subscription.add(this.evidenceRecordForm.statusChanges.subscribe(() => (this.edit = true)));
    }

    private setPermissions(): void {
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_EVIDENCE);

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
