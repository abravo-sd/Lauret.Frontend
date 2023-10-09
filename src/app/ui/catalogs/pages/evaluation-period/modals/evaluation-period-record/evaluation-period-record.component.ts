import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { CyclesService, CyclesServiceV1, EvaluationPeriodService, InstitutionService, UsersService } from 'src/app/core/services';
import { ValidatorService } from 'src/app/shared/validators';
import { Alert, clearForm, DateHelper, YearHelp } from 'src/app/utils/helpers';
import {
    Anio,
    Ciclo,
    CicloV1,
    InstitucionDTOV1,
    PeriodoEvaluacionDTO,
    PeriodoEvaluacionDTOV1,
    PeriodoEvaluacionAddUpdateDTOV1,
    PeriodoEvaluacionEtapaAddUpdateDTOV1, 
    TablePaginatorSearch,
    PeriodoEvaluacionEtapaDTOV1,
    Vista
} from 'src/app/utils/models';
import { EvaluationPeriodData } from './evaluation-period-record.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';
import { ProgressService } from 'src/app/core/modules/progress';

export enum ModalTitle {
    NEW = 'Nuevo Periodo de Evaluación',
    EDIT = 'Editar Periodo de Evaluación',
}
@Component({
    templateUrl: './evaluation-period-record.component.html',
    styleUrls: ['./evaluation-period-record.component.scss'],
})
export class EvaluationPeriodRecordComponent implements OnInit, OnDestroy {
    evaluationPeriodRecordForm: UntypedFormGroup;
    title: ModalTitle;
    data: PeriodoEvaluacionDTOV1;
    edit: boolean;
    subscription: Subscription;
    disabled: boolean;
    permission: boolean;
    cycleList: CicloV1[];
    institutionList: InstitucionDTOV1[];
    yearList: Anio[];
    today: Date;
    // proccess: string | number;
    thisAccess: Vista;
    permissions: boolean[];
    @ViewChild('fInicialMeta') fInicialMeta!: ElementRef;
    @ViewChild('fFinMeta') fFinMeta!: ElementRef;
    @ViewChild('fInicialResultados') fInicialResultados!: ElementRef;
    @ViewChild('fFinResultados') fFinResultados!: ElementRef;
    @ViewChild('fInicialAutoevaluacion') fInicialAutoevaluacion!: ElementRef;
    @ViewChild('fFinAutoevaluacion') fFinAutoevaluacion!: ElementRef;
    @ViewChild('fInicialRevision') fInicialRevision!: ElementRef;
    @ViewChild('fFinRevision') fFinRevision!: ElementRef;
    @ViewChild('fInicialEvidencia') fInicialEvidencia!: ElementRef;
    @ViewChild('fFinalEvidencia') fFinalEvidencia!: ElementRef;
    @ViewChild('fInicialMejora') fInicialMejora!: ElementRef;
    @ViewChild('fFinPlanMejora') fFinPlanMejora!: ElementRef;
    @ViewChild('fInicialAuditoria') fInicialAuditoria!: ElementRef;
    @ViewChild('fFinAuditoria') fFinAuditoria!: ElementRef;    

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public readonly evaluationPeriodData: EvaluationPeriodData,
        public readonly cycles: CyclesServiceV1,
        private readonly formBuilder: UntypedFormBuilder,
        private readonly evaluationPeriod: EvaluationPeriodService,
        private readonly ref: MatDialogRef<never>,
        private users: UsersService,
        private institutions: InstitutionService,
        private readonly validator: ValidatorService
    ) {
        this.today = new Date();
        this.title = ModalTitle.NEW;
        this.data = new PeriodoEvaluacionDTOV1();
        this.edit = null;
        this.disabled = null;
        this.permission = null;
        this.cycleList = [];
        this.institutionList = [];
        this.yearList = [];
        this.subscription = new Subscription();
        // this.proccess = null;
        this.evaluationPeriodRecordForm = this.formBuilder.group({
            // idPeriodoEvaluacion: [null, [Validators.required, Validators.maxLength(50), this.validator.noWhitespace]],
            idInstitucion: [null, [Validators.required, this.validator.noWhitespace]],
            anio: [null, [Validators.required, this.validator.noWhitespace]],
            idCiclo: [null, [Validators.required, this.validator.noWhitespace]],
            proceso: [{ value: null, disabled: true }],
            fechaInicialMeta: [{ value: null, disabled: true }, [Validators.required, this.validator.noWhitespace]],
            fechaFinMeta: [{ value: null, disabled: true }, [Validators.required, this.validator.noWhitespace]],
            fechaInicialCapturaResultados: [{ value: null, disabled: true }, [Validators.required, this.validator.noWhitespace]],
            fechaFinCapturaResultados: [{ value: null, disabled: true }, [Validators.required, this.validator.noWhitespace]],
            fechaInicialAutoEvaluacion: [{ value: null, disabled: true }, [Validators.required, this.validator.noWhitespace]],
            fechaFinAutoEvaluacion: [{ value: null, disabled: true }, [Validators.required, this.validator.noWhitespace]],
            fechaInicialRevision: [{ value: null, disabled: true }, [Validators.required, this.validator.noWhitespace]],
            fechaFinRevision: [{ value: null, disabled: true }, [Validators.required, this.validator.noWhitespace]],
            fechaInicialCargaEvidencia: [{ value: null, disabled: true }, [Validators.required, this.validator.noWhitespace]],
            fechaFinCargaEvidencia: [{ value: null, disabled: true }, [Validators.required, this.validator.noWhitespace]],
            fechaInicialPlanMejora: [{ value: null, disabled: true }, [Validators.required, this.validator.noWhitespace]],
            fechaFinPlanMejora: [{ value: null, disabled: true }, [Validators.required, this.validator.noWhitespace]],
            fechaInicialAuditoria: [{ value: null, disabled: true }, [Validators.required, this.validator.noWhitespace]],
            fechaFinAuditoria: [{ value: null, disabled: true }, [Validators.required, this.validator.noWhitespace]],
            activo: [true, []],
        });
        this.permissions = [false, false, false];
    }

    ngOnInit(): void {
        this.setPermissions();
        this.disabled=!this.checkPermission(2);
        this.title = this.evaluationPeriodData ? ModalTitle.EDIT : ModalTitle.NEW;
        this.getAllCycles();
        this.getAllInstitution();
        this.yearList = YearHelp.getListAnio();
        if (this.evaluationPeriodData) {
            this.evaluationPeriod
                .getPeriodEvaluationById(this.evaluationPeriodData.data.idPeriodoEvaluacion)
                .subscribe((response) => {
                    if (!response.output) {
                        return;
                    }
                    const data: PeriodoEvaluacionDTOV1 = new PeriodoEvaluacionDTOV1().deserialize(response.output[0]);
                    this.data = data;
                    this.evaluationPeriodRecordForm.patchValue(data);
                    this.evaluationPeriodRecordForm.get('proceso').patchValue(data.getProccessString());
                    // Promise.all([this.getProccess(this.data.anio, this.data.idCiclo, this.data.idInstitucion)]).then(() => {});
                    // this.institutionList = this.data.etapas.map((item) => new InstitucionDTOV1().deserialize(item));
                    const etapa = this.data.etapas.filter((i) => (i.idEtapa == 1));
                    // this.today = new Date(etapa[0].fechaInicio);
                    this.data.etapas.forEach((item) => {
                        if (item.idEtapa == 1) {
                            this.evaluationPeriodRecordForm.get('fechaInicialMeta').patchValue(item.fechaInicio);
                            this.evaluationPeriodRecordForm.get('fechaFinMeta').patchValue(item.fechaFin);
                        }
                        if (item.idEtapa == 2) {
                            this.evaluationPeriodRecordForm.get('fechaInicialCapturaResultados').patchValue(item.fechaInicio);
                            this.evaluationPeriodRecordForm.get('fechaFinCapturaResultados').patchValue(item.fechaFin);
                        }
                        if (item.idEtapa == 3) {
                            this.evaluationPeriodRecordForm.get('fechaInicialAutoEvaluacion').patchValue(item.fechaInicio);
                            this.evaluationPeriodRecordForm.get('fechaFinAutoEvaluacion').patchValue(item.fechaFin);
                        }
                        if (item.idEtapa == 4) {
                            this.evaluationPeriodRecordForm.get('fechaInicialRevision').patchValue(item.fechaInicio);
                            this.evaluationPeriodRecordForm.get('fechaFinRevision').patchValue(item.fechaFin);
                        }
                        if (item.idEtapa == 5) {
                            this.evaluationPeriodRecordForm.get('fechaInicialCargaEvidencia').patchValue(item.fechaInicio);
                            this.evaluationPeriodRecordForm.get('fechaFinCargaEvidencia').patchValue(item.fechaFin);
                        }
                        if (item.idEtapa == 6) {
                            this.evaluationPeriodRecordForm.get('fechaInicialPlanMejora').patchValue(item.fechaInicio);
                            this.evaluationPeriodRecordForm.get('fechaFinPlanMejora').patchValue(item.fechaFin);
                        }
                        if (item.idEtapa == 7) {
                            this.evaluationPeriodRecordForm.get('fechaInicialAuditoria').patchValue(item.fechaInicio);
                            this.evaluationPeriodRecordForm.get('fechaFinAuditoria').patchValue(item.fechaFin);
                        }
                    });
                    this.evaluationPeriodRecordForm.updateValueAndValidity();
                    // this.evaluationPeriodRecordForm.get('idPeriodoEvaluacion').disable();
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
        // if (!this.evaluationPeriodRecordForm.get('proccess').value) {
        //     return;
        // }
        this.evaluationPeriodRecordForm.markAllAsTouched();
        if (this.evaluationPeriodRecordForm.invalid) {
            Alert.error('Verifique que los campos sean correctos');
            return;
        }
        clearForm(this.evaluationPeriodRecordForm);
        const tmp = this.evaluationPeriodRecordForm.getRawValue();
        // const tmpPeriodoEvaluacion: PeriodoEvaluacionAddUpdateDTOV1 = new PeriodoEvaluacionAddUpdateDTOV1().deserialize(tmp);
        const periodoEvaluacion: PeriodoEvaluacionAddUpdateDTOV1 = new PeriodoEvaluacionAddUpdateDTOV1();
        periodoEvaluacion.anio = this.evaluationPeriodRecordForm.get('anio').value;
        periodoEvaluacion.cicloId = this.evaluationPeriodRecordForm.get('idCiclo').value;
        periodoEvaluacion.catInstitucionId = this.evaluationPeriodRecordForm.get('idInstitucion').value;
        periodoEvaluacion.proceso = '00000';
        periodoEvaluacion.activo = this.evaluationPeriodRecordForm.get('activo').value;
        const idPeriodoEvaluacion: string | number = this.data.idPeriodoEvaluacion ? this.data.idPeriodoEvaluacion : 0;
        let etapa: PeriodoEvaluacionEtapaAddUpdateDTOV1 = new PeriodoEvaluacionEtapaAddUpdateDTOV1();
        etapa.id = 0;
        etapa.catPeriodoEvaluacionId = idPeriodoEvaluacion;

        etapa.catEtapaId = 1;
        etapa.fechaInicio = this.evaluationPeriodRecordForm.get('fechaInicialMeta').value;
        etapa.fechaFin = this.evaluationPeriodRecordForm.get('fechaFinMeta').value;
        periodoEvaluacion.etapas.push(new PeriodoEvaluacionEtapaAddUpdateDTOV1().deserialize(etapa));

        etapa.catEtapaId = 2;
        etapa.fechaInicio = this.evaluationPeriodRecordForm.get('fechaInicialCapturaResultados').value;
        etapa.fechaFin = this.evaluationPeriodRecordForm.get('fechaFinCapturaResultados').value;
        periodoEvaluacion.etapas.push(new PeriodoEvaluacionEtapaAddUpdateDTOV1().deserialize(etapa));

        etapa.catEtapaId = 3;
        etapa.fechaInicio = this.evaluationPeriodRecordForm.get('fechaInicialAutoEvaluacion').value;
        etapa.fechaFin = this.evaluationPeriodRecordForm.get('fechaFinAutoEvaluacion').value;
        periodoEvaluacion.etapas.push(new PeriodoEvaluacionEtapaAddUpdateDTOV1().deserialize(etapa));

        etapa.catEtapaId = 4;
        etapa.fechaInicio = this.evaluationPeriodRecordForm.get('fechaInicialRevision').value;
        etapa.fechaFin = this.evaluationPeriodRecordForm.get('fechaFinRevision').value;
        periodoEvaluacion.etapas.push(new PeriodoEvaluacionEtapaAddUpdateDTOV1().deserialize(etapa));

        etapa.catEtapaId = 5;
        // etapa.fechaInicio = this.evaluationPeriodRecordForm.get('fechaInicialCargaEvidencia').value;
        etapa.fechaInicio = this.stringToDate(this.fInicialEvidencia.nativeElement.value);
        // etapa.fechaFin = this.evaluationPeriodRecordForm.get('fechaFinCargaEvidencia').value;
        etapa.fechaFin = this.stringToDate(this.fFinalEvidencia.nativeElement.value);
        periodoEvaluacion.etapas.push(new PeriodoEvaluacionEtapaAddUpdateDTOV1().deserialize(etapa));

        etapa.catEtapaId = 6;
        etapa.fechaInicio = this.evaluationPeriodRecordForm.get('fechaInicialPlanMejora').value;
        etapa.fechaFin = this.evaluationPeriodRecordForm.get('fechaFinPlanMejora').value;
        periodoEvaluacion.etapas.push(new PeriodoEvaluacionEtapaAddUpdateDTOV1().deserialize(etapa));

        etapa.catEtapaId = 7;
        // etapa.fechaInicio = this.evaluationPeriodRecordForm.get('fechaInicialAuditoria').value;
        etapa.fechaInicio = this.stringToDate(this.fInicialAuditoria.nativeElement.value);
        etapa.fechaFin = this.evaluationPeriodRecordForm.get('fechaFinAuditoria').value;
        periodoEvaluacion.etapas.push(new PeriodoEvaluacionEtapaAddUpdateDTOV1().deserialize(etapa));

        if (this.data.idPeriodoEvaluacion) {
            periodoEvaluacion.id = this.data.idPeriodoEvaluacion;
            periodoEvaluacion.fechaCreacion = this.data.fechaCreacion;
            periodoEvaluacion.usuarioCreacion = this.data.usuarioCreacion;
            periodoEvaluacion.fechaModificacion = new Date();
            periodoEvaluacion.usuarioModificacion = this.users.userSession.nombre;
            const tmpPeriodoEvaluacion: PeriodoEvaluacionAddUpdateDTOV1 = new PeriodoEvaluacionAddUpdateDTOV1().deserialize(periodoEvaluacion);

            this.evaluationPeriod.updatePeriodEvaluation(tmpPeriodoEvaluacion).subscribe(() => {
                Alert.success('', 'Periodo de Evaluación actualizado correctamente');
                this.ref.close(true);
            });
        } else {
            periodoEvaluacion.id = 0;
            periodoEvaluacion.fechaCreacion = new Date();
            periodoEvaluacion.usuarioCreacion = this.users.userSession.nombre;
            this.evaluationPeriod.createPeriodEvaluation(periodoEvaluacion).subscribe(() => {
                Alert.success('', 'Periodo de Evaluación creado correctamente');
                this.ref.close(true);
            });
        }
    }

    private getAllCycles(): void {
        const filters = new TablePaginatorSearch();
        this.cycles.getAllCycles(filters).subscribe((response) => {
            if (response.output) {
                this.cycleList = response.output.map((ciclo) => new CicloV1().deserialize(ciclo));
            }
        });
    }

    private getAllInstitution(): void {
        const filters = new TablePaginatorSearch();
        this.institutions.getAllInstitucions(filters).subscribe((response) => {
            if (response.output) {
                this.institutionList = response.output.map((item) => new InstitucionDTOV1().deserialize(item));
            }
        });
    }

    // private setProccess(process: string | number): string {
    //     return (process) ? 'Procedimiento_' + process : null;
    // }

    // onSelectionChange($event: MatSelectChange, selector: string): void {
    //     const anio: string | number = (selector === 'anio') ? $event.value : this.evaluationPeriodRecordForm.get('anio').value;
    //     const ciclo: string | number = (selector === 'ciclo') ? $event.value : this.evaluationPeriodRecordForm.get('idCiclo').value;
    //     const institucion: string | number = (selector === 'institucion') ? $event.value : this.evaluationPeriodRecordForm.get('idInstitucion').value;

    //     if (!anio || !ciclo || !institucion) {
    //         return;
    //     }
    //     Promise.all([this.getProccess(anio, ciclo, institucion)]).then(() => {});
    // }

    // private getProccess(anio: string | number, ciclo: string | number, institucion: string | number): Promise<boolean> {
    //     return new Promise<boolean>((resolve, reject) => {
    //         this.evaluationPeriod.getProccess(anio, ciclo, institucion).subscribe((response) => {
    //             // this.proccess = (response.output) ? response.output + '' : null;
    //             const proc: string = (response && response.output) ? 'procedimiento_' + response.output + '' : null;
    //             // this.evaluationPeriodRecordForm.get('proccess').enable();
    //             this.evaluationPeriodRecordForm.get('proccess').patchValue(proc);
    //             // this.evaluationPeriodRecordForm.get('proccess').disable();
    //             resolve(true);
    //         });
    //     });
    // }

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
        this.subscription.add(this.evaluationPeriodRecordForm.statusChanges.subscribe(() => (this.edit = true)));
    }

    stringToDate(date: string): Date {
        return DateHelper.convertToDate(date);
    }

    addPeriodToDate(date: string, period: any, amount: number): Date {
        return DateHelper.addPeriodToDate(date, period, amount)
    }

    onFechaInicialMetaChange(): void {
        // this.fFinMeta.nativeElement.value = null;
        // this.fInicialResultados.nativeElement.value = null;
        // this.fFinResultados.nativeElement.value = null;
        // this.fInicialAutoevaluacion.nativeElement.value = null;
        // this.fFinAutoevaluacion.nativeElement.value = null;
        // this.fInicialRevision.nativeElement.value = null;
        // this.fFinRevision.nativeElement.value = null;
        // this.fInicialMejora.nativeElement.value = null;
        // this.fFinPlanMejora.nativeElement.value = null;
        // this.fFinAuditoria.nativeElement.value = null;

        this.evaluationPeriodRecordForm.get('fechaFinMeta').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaInicialCapturaResultados').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinCapturaResultados').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaInicialAutoEvaluacion').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinAutoEvaluacion').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaInicialRevision').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinRevision').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinCargaEvidencia').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaInicialPlanMejora').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinPlanMejora').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinAuditoria').setValue(null);
        
    }

    onFechaFinalMetaChange(): void {
        // this.fInicialResultados.nativeElement.value = null;
        // this.fFinResultados.nativeElement.value = null;
        // this.fInicialAutoevaluacion.nativeElement.value = null;
        // this.fFinAutoevaluacion.nativeElement.value = null;
        // this.fInicialRevision.nativeElement.value = null;
        // this.fFinRevision.nativeElement.value = null;
        // this.fInicialMejora.nativeElement.value = null;
        // this.fFinPlanMejora.nativeElement.value = null;
        // this.fFinAuditoria.nativeElement.value = null;

        this.evaluationPeriodRecordForm.get('fechaInicialCapturaResultados').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinCapturaResultados').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaInicialAutoEvaluacion').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinAutoEvaluacion').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaInicialRevision').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinRevision').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaInicialPlanMejora').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinPlanMejora').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinAuditoria').setValue(null);
    }

    onFechaInicialResultadosChange(): void {
        // this.fFinResultados.nativeElement.value = null;
        // this.fInicialAutoevaluacion.nativeElement.value = null;
        // this.fFinAutoevaluacion.nativeElement.value = null;
        // this.fInicialRevision.nativeElement.value = null;
        // this.fFinRevision.nativeElement.value = null;
        // this.fInicialMejora.nativeElement.value = null;
        // this.fFinPlanMejora.nativeElement.value = null;
        // this.fFinAuditoria.nativeElement.value = null;

        this.evaluationPeriodRecordForm.get('fechaFinCapturaResultados').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaInicialAutoEvaluacion').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinAutoEvaluacion').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaInicialRevision').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinRevision').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaInicialPlanMejora').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinPlanMejora').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinAuditoria').setValue(null);
    }

    onFechaFinalResultadosChange(): void {
        // this.fInicialAutoevaluacion.nativeElement.value = null;
        // this.fFinAutoevaluacion.nativeElement.value = null;
        // this.fInicialRevision.nativeElement.value = null;
        // this.fFinRevision.nativeElement.value = null;
        // this.fInicialMejora.nativeElement.value = null;
        // this.fFinPlanMejora.nativeElement.value = null;
        // this.fFinAuditoria.nativeElement.value = null;

        this.evaluationPeriodRecordForm.get('fechaInicialAutoEvaluacion').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinAutoEvaluacion').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaInicialRevision').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinRevision').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaInicialPlanMejora').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinPlanMejora').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinAuditoria').setValue(null);
    }

    onFechaInicialAutoevaluacionChange(): void {
        // this.fFinAutoevaluacion.nativeElement.value = null;
        // this.fInicialRevision.nativeElement.value = null;
        // this.fFinRevision.nativeElement.value = null;
        // this.fInicialMejora.nativeElement.value = null;
        // this.fFinPlanMejora.nativeElement.value = null;
        // this.fFinAuditoria.nativeElement.value = null;

        this.evaluationPeriodRecordForm.get('fechaFinAutoEvaluacion').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaInicialRevision').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinRevision').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaInicialPlanMejora').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinPlanMejora').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinAuditoria').setValue(null);
    }

    onFechaFinalAutoevaluacionChange(): void {
        // this.fInicialRevision.nativeElement.value = null;
        // this.fFinRevision.nativeElement.value = null;
        // this.fInicialMejora.nativeElement.value = null;
        // this.fFinPlanMejora.nativeElement.value = null;
        // this.fFinAuditoria.nativeElement.value = null;

        this.evaluationPeriodRecordForm.get('fechaInicialRevision').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinRevision').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaInicialPlanMejora').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinPlanMejora').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinAuditoria').setValue(null);
    }

    onFechaInicialRevisionChange(): void {
        // this.fFinRevision.nativeElement.value = null;
        // this.fInicialMejora.nativeElement.value = null;
        // this.fFinPlanMejora.nativeElement.value = null;
        // this.fFinAuditoria.nativeElement.value = null;

        this.evaluationPeriodRecordForm.get('fechaFinRevision').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaInicialPlanMejora').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinPlanMejora').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinAuditoria').setValue(null);
    }

    onFechaFinalRevisionChange(): void {
        // this.fInicialMejora.nativeElement.value = null;
        // this.fFinPlanMejora.nativeElement.value = null;
        // this.fFinAuditoria.nativeElement.value = null;

        this.evaluationPeriodRecordForm.get('fechaInicialPlanMejora').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinPlanMejora').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinAuditoria').setValue(null);
    }

    onFechaInicialMejoraChange(): void {
        // this.fFinPlanMejora.nativeElement.value = null;
        // this.fFinAuditoria.nativeElement.value = null;

        this.evaluationPeriodRecordForm.get('fechaFinPlanMejora').setValue(null);
        this.evaluationPeriodRecordForm.get('fechaFinAuditoria').setValue(null);
    }

    onFechaFinalMejoraChange(): void {
        // this.fFinAuditoria.nativeElement.value = null;

        this.evaluationPeriodRecordForm.get('fechaFinAuditoria').setValue(null);
    }

    private setPermissions(): void {
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_PERIOD_EVAL);

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
