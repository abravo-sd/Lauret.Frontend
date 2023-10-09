import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AccreditorsService } from 'src/app/core/services';
import { ValidatorService } from 'src/app/shared/validators';
import { Alert } from 'src/app/utils/helpers';
import { AcreditadoraDTO, AcreditadoraDTOV1, AcreditadoraProcesoDTO, AcreditadoraProcesoDTOV1 } from 'src/app/utils/models';
import { AccreditorData } from './accreditor-record.service';

@Component({
    templateUrl: './accreditor-record.component.html',
    styleUrls: ['./accreditor-record.component.scss'],
})
export class AccreditorRecordComponent implements OnInit, OnDestroy {
    @ViewChild(MatPaginator, { static: true }) readonly paginator: MatPaginator;
    dataAccreditor: AcreditadoraDTOV1;
    data: AcreditadoraProcesoDTOV1[];
    accreditorRecordForm: UntypedFormGroup;
    accreditorTableForm: UntypedFormGroup;
    dataSource: MatTableDataSource<AcreditadoraProcesoDTOV1>;
    processindex: number;
    actionEditProcess: boolean;
    subscription: Subscription;
    status: boolean;

    constructor(
        @Inject(MAT_DIALOG_DATA) public readonly accreditorData: AccreditorData,
        private readonly matDialogRef: MatDialogRef<boolean>,
        private readonly formBuilder: UntypedFormBuilder,
        private readonly accreditors: AccreditorsService,
        private readonly validator: ValidatorService
    ) {
        this.dataAccreditor = new AcreditadoraDTOV1();
        this.data = [];
        this.dataSource = new MatTableDataSource<AcreditadoraProcesoDTOV1>([]);
        this.processindex = null;
        this.actionEditProcess = false;
        this.subscription = new Subscription();
        this.accreditorRecordForm = this.formBuilder.group({
            acreditadoraId: [null, [Validators.required, Validators.maxLength(50), this.validator.noWhitespace]],
            nombre: [null, [Validators.required, Validators.maxLength(500), this.validator.noWhitespace]],
            activo: [true],
        });
        this.accreditorTableForm = this.formBuilder.group({
            acreditadoraProcesoId: [0],
            nombre: [null, [Validators.required, Validators.maxLength(500), this.validator.noWhitespace]],
            fechaInicio: [null, [Validators.required]],
            fechaFin: [null, [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.dataSource.paginator = this.paginator;
        this.accreditorRecordForm.disable();
        if (this.accreditorData) {
            const data = new AcreditadoraDTOV1().deserialize(this.accreditorData.data);
            this.dataAccreditor = data;
            this.accreditorRecordForm.patchValue(this.dataAccreditor);
            this.accreditorRecordForm.get('acreditadoraId').disable();
            this.getAllAccreditorsProccess(this.accreditorData.data.acreditadoraId);
        } else {
            this.trackingStatusForm();
        }
        // if (this.dataId) {
        //     this.getAccreditorById(this.dataId);
        // } else {
        //     this.trackingStatusForm();
        // }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    addProcess(): void {
        this.status = true;
        const value = this.accreditorTableForm.value;

        if (!this.actionEditProcess) {
            value.acreditadoraProcesoId = 0;
            if (this.validaProcess(value)) {
                Alert.error('El proceso con ese nombre y fecha ya existe');
                return;
            }

            this.dataSource.data.push(new AcreditadoraProcesoDTOV1().deserialize(value));
            this.dataSource._updateChangeSubscription();
            this.accreditorTableForm.reset();
            return;
        }

        if (this.validaProcess(value)) {
            Alert.error('El proceso con ese nombre y fecha ya existe');
            return;
        }

        this.dataSource.data.map((item, index) => {
            if (index === this.processindex) {
                item.nombre = value.nombre;
                item.fechaInicio = value.fechaInicio;
                item.fechaFin = value.fechaFin;
            }
        });
        this.dataSource._updateChangeSubscription();
        this.actionEditProcess = false;
        this.processindex = null;
        this.accreditorTableForm.reset();
    }

    editProcess(data: AcreditadoraProcesoDTOV1, processIndex: number): void {
        this.processindex = processIndex;
        this.actionEditProcess = true;
        this.accreditorTableForm.patchValue(data);
        this.status = true;
    }

    deleteProcess(index: number): void {
        Alert.confirm('Eliminar proceso', '¿Deseas eliminar este proceso?').subscribe((result) => {
            if (!result || !result.isConfirmed) {
                return;
            }
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
            this.status = true;
        });
    }

    submit(): void {
        const body: AcreditadoraDTOV1 = this.accreditorRecordForm.value;
        body.acreditadoraProcesos = this.dataSource.data;

        if (!this.accreditorData.data.acreditadoraId) {
            this.accreditors.createAccreditor(body).subscribe((response) => {
                if (response.exito) {
                    Alert.success('', 'Acreditadora creada correctamente');
                    this.matDialogRef.close(true);
                }
            });
            return;
        }

        this.accreditors.updateAccreditor(body).subscribe((response) => {
            if (response.exito) {
                Alert.success('', 'Acreditadora editada correctamente');
                this.matDialogRef.close(true);
            }
        });
    }

    closeModalByConfimation(): void {
        if (!this.status) {
            this.matDialogRef.close();
            return;
        }
        Alert.confirm('Alerta', '¿Está seguro de que desea salir? Los datos ingresados no serán guardados.').subscribe(
            (result) => {
                if (!result || !result.isConfirmed) {
                    return;
                }
                this.matDialogRef.close();
            }
        );
    }

    get minDate(): Date {
        return this.accreditorTableForm.get('fechaInicio').value;
    }

    get maxDate(): Date {
        return this.accreditorTableForm.get('fechaFin').value;
    }

    private validaProcess(value: AcreditadoraProcesoDTOV1): boolean {
        const find = this.dataSource.data.find((item, index) => {
            if (this.actionEditProcess) {
                return (
                    item.nombre === value.nombre &&
                    new Date(item.fechaFin).getTime() === new Date(value.fechaFin).getTime() &&
                    new Date(item.fechaInicio).getTime() === new Date(value.fechaInicio).getTime() &&
                    index !== this.processindex
                );
            }

            return (
                item.nombre === value.nombre &&
                new Date(item.fechaFin).getTime() === new Date(value.fechaFin).getTime() &&
                new Date(item.fechaInicio).getTime() === new Date(value.fechaInicio).getTime()
            );
        });
        return find ? true : false;
    }

    private getAllAccreditorsProccess(accreditorId: string): void {
        this.dataSource.data = [];
        this.data = [];
        this.accreditors.getAllAccreditorsProccess(accreditorId).subscribe((response) => {
            if (response.output) {
                this.data = response.output.map((accreditorProccess) => new AcreditadoraProcesoDTOV1().deserialize(accreditorProccess));
                this.dataSource.data = this.data;
            }
            // this.data = response.output;
            // this.accreditorRecordForm.patchValue(this.data);
            // this.dataSource.data = this.data.acreditadoraProcesos.map((item) =>
            //     new AcreditadoraProcesoDTOV1().deserialize(item)
            // );
            this.trackingStatusForm();
        });
    }

    private trackingStatusForm(): void {
        this.subscription.add(this.accreditorRecordForm.statusChanges.subscribe(() => (this.status = true)));
    }
}
