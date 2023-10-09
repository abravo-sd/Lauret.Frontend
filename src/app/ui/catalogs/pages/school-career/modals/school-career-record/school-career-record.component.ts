import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SchoolCareerService, UsersService } from 'src/app/core/services';
import { ValidatorService } from 'src/app/shared/validators';
import { Alert, clearForm } from 'src/app/utils/helpers';
import { CarreraDTO, CarreraDTOV1 } from 'src/app/utils/models';
import { CareerData } from './school-career-record.service';

export enum ModalTitle {
    NEW = 'Nueva carrera',
    EDIT = 'Editar carrera',
}

@Component({
    selector: 'app-school-career-record',
    templateUrl: './school-career-record.component.html',
    styleUrls: ['./school-career-record.component.scss'],
})
export class SchoolCareerRecordComponent implements OnInit, OnDestroy {
    schoolCareerRecordForm: FormGroup;
    title: ModalTitle;
    data: CarreraDTOV1;
    edit: boolean;
    subscription: Subscription;
    disabled: boolean;
    permission: boolean;

    constructor(
        @Inject(MAT_DIALOG_DATA) public readonly schoolCareerData: CareerData,
        private readonly formBuilder: FormBuilder,
        private readonly schoolCareers: SchoolCareerService,
        private readonly ref: MatDialogRef<never>,
        private users: UsersService,
        private readonly validator: ValidatorService
    ) {
        this.title = ModalTitle.NEW;
        this.data = new CarreraDTOV1();
        this.edit = null;
        this.disabled = null;
        this.permission = null;
        this.subscription = new Subscription();
        this.schoolCareerRecordForm = this.formBuilder.group({
            carreraId: [null, [Validators.required, Validators.maxLength(50), this.validator.noWhitespace]],
            plan: [null, [Validators.required, Validators.maxLength(15), this.validator.noWhitespace]],
            nombre: [null, [Validators.required, Validators.maxLength(500), this.validator.noWhitespace]],
            activo: [true, []],
        });
    }

    ngOnInit() {
        this.title = this.schoolCareerData ? ModalTitle.EDIT : ModalTitle.NEW;
        if (this.schoolCareerData) {
            this.schoolCareers.getCareerById(this.schoolCareerData.data.carreraId).subscribe((response) => {
                if (!response.output) {
                    return;
                }
                const data = new CarreraDTOV1().deserialize(response.output);
                this.data = data;
                this.schoolCareerRecordForm.patchValue(data);
                this.schoolCareerRecordForm.get('carreraId').disable();
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
        this.schoolCareerRecordForm.markAllAsTouched();
        if (this.schoolCareerRecordForm.invalid) {
            Alert.error('Verifique que los campos sean correctos');
            return;
        }
        clearForm(this.schoolCareerRecordForm);
        const tmp = this.schoolCareerRecordForm.getRawValue();
        const career: CarreraDTOV1 = new CarreraDTOV1().deserialize(tmp);
        if (this.data.carreraId) {
            career.carreraId = this.data.carreraId;
            this.schoolCareers.updateCareer(career).subscribe(() => {
                Alert.success('', 'Carrera actualizada correctamente');
                this.ref.close(true);
            });
        } else {
            this.schoolCareers.createCareer(career).subscribe(() => {
                Alert.success('', 'Carrera creada correctamente');
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
        this.subscription.add(this.schoolCareerRecordForm.statusChanges.subscribe(() => (this.edit = true)));
    }

    private checkPermission(): void {
        /* this.permission = this.users.checkPermission(Modules.REGION, true);
        if (!this.permission) {
          this.schoolCareerRecordForm.disable();
        } */
    }
}
