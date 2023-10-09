import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/core/services';
import { EvaluationElementCatalogService } from 'src/app/core/services/api/evaluation-element-catalog/evaluation-element-catalog.service';
import { ValidatorService } from 'src/app/shared/validators';
import { Alert, clearForm } from 'src/app/utils/helpers';
import { CatalogoElementoEvaluacionDTO, CatalogoElementoEvaluacionDTOV1, ComponenteDTO, NormativaDTO, AreaCorporativaDTO } from 'src/app/utils/models';
import { EvaluationElementCatalogData } from './evaluation-element-record.service';

export enum ModalTitle {
    NEW = 'Nuevo elemento',
    EDIT = 'Editar elemento',
}
@Component({
    selector: 'app-evaluation-element-record',
    templateUrl: './evaluation-element-record.component.html',
    styleUrls: ['./evaluation-element-record.component.scss'],
})
export class EvaluationElementRecordComponent implements OnInit, OnDestroy {
    evaluationElementeRecordForm: FormGroup;
    title: ModalTitle;
    data: CatalogoElementoEvaluacionDTOV1;
    edit: boolean;
    subscription: Subscription;
    disabled: boolean;
    permission: boolean;

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public readonly EvaluationElementCatalogData: EvaluationElementCatalogData,

        public readonly evaluationElementCatalogService: EvaluationElementCatalogService,
        private readonly formBuilder: FormBuilder,
        private readonly ref: MatDialogRef<never>,
        private users: UsersService,
        private readonly validator: ValidatorService
    ) {
        this.title = ModalTitle.NEW;
        this.data = new CatalogoElementoEvaluacionDTOV1();
        this.edit = null;
        this.disabled = null;
        this.permission = null;

        this.subscription = new Subscription();
        this.evaluationElementeRecordForm = this.formBuilder.group({
            clave: [null, [Validators.required, Validators.maxLength(5), this.validator.noWhitespace]],
            nombre: [null, [Validators.required, Validators.maxLength(150), this.validator.noWhitespace]],
            // nombreEvidencia: [null, [Validators.required, Validators.maxLength(150), this.validator.noWhitespace]],
            // descripcionEvidencia: [null, [Validators.required, Validators.maxLength(200), this.validator.noWhitespace]],
            // cantidadEvidencia: [null, [Validators.required, Validators.max(999), this.validator.noWhitespace]],
            activo: [true, []],
        });
    }

    ngOnInit(): void {
        this.title = this.EvaluationElementCatalogData ? ModalTitle.EDIT : ModalTitle.NEW;
        if (this.EvaluationElementCatalogData) {
            this.evaluationElementCatalogService
                .getEvaluationElementCatalogById(this.EvaluationElementCatalogData.data.id)
                .subscribe((response) => {
                    if (!response.output) {
                        return;
                    }
                    const data = new CatalogoElementoEvaluacionDTOV1().deserialize(response.output[0]);
                    this.data = data;
                    this.evaluationElementeRecordForm.patchValue(data);
                    this.evaluationElementeRecordForm.get('clave').disable();
                    this.checkPermission();
                    this.trackingStatusForm();
                });
        } else {
            this.checkPermission();
            this.trackingStatusForm();
        }
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    submit(): void {
        this.evaluationElementeRecordForm.markAllAsTouched();
        if (this.evaluationElementeRecordForm.invalid) {
            Alert.error('Verifique que los campos sean correctos');
            return;
        }
        clearForm(this.evaluationElementeRecordForm);
        const tmp = this.evaluationElementeRecordForm.getRawValue();
        const elementoEvaluacion: CatalogoElementoEvaluacionDTOV1 = new CatalogoElementoEvaluacionDTOV1().deserialize(tmp);
        if (this.data.id) {
            elementoEvaluacion.id = this.data.id;
            elementoEvaluacion.fechaCreacion = this.data.fechaCreacion;
            elementoEvaluacion.usuarioCreacion = this.data.usuarioCreacion;
            elementoEvaluacion.fechaModificacion = new Date();
            elementoEvaluacion.usuarioModificacion = this.users.userSession.nombre;
            this.evaluationElementCatalogService.updateEvaluationElementCatalog(elementoEvaluacion).subscribe(() => {
                Alert.success('', 'Elemento actualizado correctamente');
                this.ref.close(true);
            });
        } else {
            elementoEvaluacion.id = '0';
            elementoEvaluacion.fechaCreacion = new Date();
            elementoEvaluacion.usuarioCreacion = this.users.userSession.nombre;
            this.evaluationElementCatalogService.createEvaluationElementCatalog(elementoEvaluacion).subscribe(() => {
                Alert.success('', 'Elemento creado correctamente');
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
        this.subscription.add(this.evaluationElementeRecordForm.statusChanges.subscribe(() => (this.edit = true)));
    }

    private checkPermission(): void {
        /* this.permission = this.users.checkPermission(Modules.REGION, true);
        if (!this.permission) {
          this.regionRecordForm.disable();
        } */
    }
}
