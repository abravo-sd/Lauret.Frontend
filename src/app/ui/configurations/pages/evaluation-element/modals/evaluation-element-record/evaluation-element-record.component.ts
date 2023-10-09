import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {
    EvaluationElementService,
    CyclesServiceV1,
    ResponsibilityAreasService,
    LevelModalityService,
    EvaluationElementCatalogService,
    ComponentsService,
    CorporateAreaService,
    CorporateSubAreaService,
    IndicatorSiacService,
    ComponentUvmService,
    IndicatorUvmService,
    SubindicatorUvmService,
    NormativeService,
    EvidencesService,
    EvidencesCatalogService,
    UsersService
} from 'src/app/core/services';
import { ValidatorService } from 'src/app/shared/validators';
import { Alert, clearForm } from 'src/app/utils/helpers';
import {
    ElementoEvaluacionDTOV1,
    ElementoEvaluacionAddUpdateDTO,
    ElementoEvaluacionAnio,
    ElementoEvaluacionCycle,
    ElementoEvaluacionProccess,
    AreaResponsableDTOV1,
    CatalogoElementoEvaluacionDTOV1,
    ComponenteDTOV1, 
    AreaCorporativaDTOV1,
    RegistroElementoEvaluacionArchivoDTO,
    TablePaginatorSearch,
    ElementoEvaluacionInstitution
} from 'src/app/utils/models';
import { EvaluationElementData } from './evaluation-element-record.service';

export enum ModalTitle {
    NEW = 'Nuevo Elemento de Evaluación',
    EDIT = 'Editar Elemento de Evaluación',
}
@Component({
    templateUrl: './evaluation-element-record.component.html',
    styleUrls: ['./evaluation-element-record.component.scss'],
})
export class EvaluationElementRecordComponent implements OnInit, OnDestroy {
    evaluationElementRecordForm: UntypedFormGroup;
    title: ModalTitle;
    data: ElementoEvaluacionDTOV1;
    yearList: ElementoEvaluacionAnio[];
    cycleList: ElementoEvaluacionCycle[];
    institutionList: ElementoEvaluacionInstitution[];
    proccessList: ElementoEvaluacionProccess[];
    responsibilityAreaList: AreaResponsableDTOV1[];
    levelModalityList: {id: string | number, nombre: string}[];
    evaluationElementCatalogList: CatalogoElementoEvaluacionDTOV1[];
    componentList: ComponenteDTOV1[];
    corporateAreaList: AreaCorporativaDTOV1[];
    subAreaCorporateList: {id: string | number, nombre: string}[];
    edit: boolean;
    subscription: Subscription;
    disabled: boolean;
    permission: boolean;
    generica: boolean;
    dataSource: RegistroElementoEvaluacionArchivoDTO[];

    constructor(
        @Inject(MAT_DIALOG_DATA) public readonly evaluatioElementData: EvaluationElementData,
        public readonly evaluationElement: EvaluationElementService,
        private readonly validator: ValidatorService,        
        public readonly cycles: CyclesServiceV1,
        public readonly responsibilityAreasService: ResponsibilityAreasService,
        public readonly levelModalityService: LevelModalityService,
        private readonly evaluationElementCatalogService: EvaluationElementCatalogService,
        public readonly component: ComponentsService,
        public readonly areaCorporate: CorporateAreaService,
        public readonly subAreaCorporateService: CorporateSubAreaService,
        public readonly indicatorSiacService: IndicatorSiacService,
        public readonly componentUvmService: ComponentUvmService,
        public readonly indicatorUvmService: IndicatorUvmService,
        public readonly subindicatorUvmService: SubindicatorUvmService,
        public readonly normative: NormativeService,
        public readonly evidence: EvidencesService,
        public readonly evidenceService: EvidencesCatalogService,
        private users: UsersService,
        private readonly formBuilder: UntypedFormBuilder,
        private readonly ref: MatDialogRef<never>
    ) {
        this.title = ModalTitle.NEW;
        this.data = new ElementoEvaluacionDTOV1();
        this.institutionList = [];
        this.yearList = [];
        this.cycleList = [];
        this.proccessList = [];
        this.responsibilityAreaList = [];
        this.levelModalityList = [];
        this.evaluationElementCatalogList = [];
        this.componentList = [];
        this.corporateAreaList = [];
        this.subAreaCorporateList = [];
        this.edit = null;
        this.disabled = null;
        this.permission = null;
        this.generica = true;
        this.subscription = new Subscription();

        this.evaluationElementRecordForm = this.formBuilder.group({
            anio: [null, [Validators.required]],
            idCiclo: [null, [Validators.required]],
            idInstitucion: [null, [Validators.required]],
            proceso: [null, [Validators.required]],
            catPeriodoEvaluacionId: [null],
            catAreaResponsableId: [null, [Validators.required]],
            responsibilityAreaType: [{ value: null, disabled: true }],
            catNivelModalidadId: [null, [Validators.required]],
            nivelModalidad: [null],
            catElementoEvaluacionId: [null, [Validators.required]],
            catComponenteId: [null, [Validators.required]],
            catAreaCorporativaId: [null, [Validators.required]],
            catSubAreaCorporativaId: [null, [Validators.required]],
            activo: [true, []]
        });
    }

    ngOnInit(): void {
        this.title = this.evaluatioElementData ? ModalTitle.EDIT : ModalTitle.NEW;
        this.getYears();
        this.getAllResponsibilityAreas();
        this.getAllEvaluationElementsCatalogs();
        this.getAllComponents();
        this.getAllCorporateAreas();
        if (this.evaluatioElementData) {
            this.evaluationElement
                .getEvaluationElementById(this.evaluatioElementData.data.id)
                .subscribe((response) => {
                    if (!response.output) {
                        return;
                    }
                    const data: ElementoEvaluacionDTOV1 = new ElementoEvaluacionDTOV1().deserialize(response.output[0]);
                    this.data = data;
                    this.getCycles(data.anio);
                    this.getInstitutions(data.anio, data.idCiclo);
                    Promise.all([this.getProccess(this.data.anio, this.data.idCiclo, this.data.idInstitucion)]).then(() => { });
                    this.getResponsibilityAreaById(data.catAreaResponsableId);
                    this.getCorporateAreaById(data.catAreaCorporativaId);
                    this.evaluationElementRecordForm.patchValue(data);
                    this.evaluationElementRecordForm.updateValueAndValidity();
                    this.evaluationElementRecordForm.get('anio').disable();
                    this.evaluationElementRecordForm.get('idCiclo').disable();
                    this.evaluationElementRecordForm.get('idInstitucion').disable();
                    this.evaluationElementRecordForm.get('proceso').disable();
                    this.evaluationElementRecordForm.get('catAreaResponsableId').disable();  
                    this.evaluationElementRecordForm.get('nivelModalidad').disable();
                    this.evaluationElementRecordForm.get('catElementoEvaluacionId').disable();
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
        this.saveEvaluationItemConfiguration();
    }

    private async saveEvaluationItemConfiguration(): Promise<void> {
        this.evaluationElementRecordForm.markAllAsTouched();
        if (this.evaluationElementRecordForm.invalid) {
            Alert.error('Verifique que los campos sean correctos');
            return;
        }
        clearForm(this.evaluationElementRecordForm);
        const tmp = this.evaluationElementRecordForm.getRawValue();
        const elementoEvaluacion: ElementoEvaluacionAddUpdateDTO = new ElementoEvaluacionAddUpdateDTO().deserialize(tmp);
        elementoEvaluacion.catNivelModalidadId = null;
        if (this.data.id) {
            elementoEvaluacion.id = this.data.id;
            elementoEvaluacion.catNivelModalidadId = this.data.catNivelModalidadId;
            elementoEvaluacion.fechaCreacion = this.data.fechaCreacion;
            elementoEvaluacion.usuarioCreacion = this.data.usuarioCreacion;
            elementoEvaluacion.fechaModificacion = new Date();
            elementoEvaluacion.usuarioModificacion = this.users.userSession.nombre;
            this.evaluationElement.updateEvaluationElement(elementoEvaluacion).subscribe(() => {
                Alert.success('', 'Elemento de evaluacón actualizado correctamente');
                this.ref.close(true);
            });
        } else {
            const levelModalityOptionsSelected: (string | number)[] = tmp.catNivelModalidadId;
            elementoEvaluacion.id = '0';
            elementoEvaluacion.fechaCreacion = new Date();
            elementoEvaluacion.usuarioCreacion = this.users.userSession.nombre;
            for (let index in levelModalityOptionsSelected) {
                elementoEvaluacion.catNivelModalidadId = levelModalityOptionsSelected[index];
                const data = await this.createEvaluationElement(elementoEvaluacion);
                console.log(data);
            }
            Alert.success('', 'Elementos de evaluacón creados correctamente');
            this.ref.close(true);
            // let index: number = 1;
            // for (const item of levelModalityOptionsSelected) {
            //     elementoEvaluacion.catNivelModalidadId = item;
            //     const data = await this.createEvaluationElement(elementoEvaluacion);
            //     if (index == levelModalityOptionsSelected.length) {
            //         Alert.success('', 'Elementos de evaluacón creados correctamente');
            //         this.ref.close(true);
            //     }
            //     index++;
            // }
        }
    }

    private async createEvaluationElement (params: ElementoEvaluacionAddUpdateDTO) {
        return this.evaluationElement.createEvaluationElementPromise(params);
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

    onYearChange(event: MatSelectChange): void {
        this.evaluationElementRecordForm.get('idCiclo').setValue(null);
        this.evaluationElementRecordForm.get('idInstitucion').setValue(null);
        this.evaluationElementRecordForm.get('proceso').setValue(null);
        this.getCycles(event.value);
    }

    onCycleChange(anio: string | number, event: MatSelectChange): void {
        this.evaluationElementRecordForm.get('idInstitucion').setValue(null);
        this.evaluationElementRecordForm.get('proceso').setValue(null);
        this.getInstitutions(anio, event.value);
    }

    onInstitutionChange(anio: string | number, cycle: string | number, event: MatSelectChange): void {
        this.evaluationElementRecordForm.get('proceso').setValue(null);
        Promise.all([this.getProccess(anio, cycle, event.value)]).then(() => { });
    }

    onProccessChange(event: MatSelectChange): void {
        const idPeriodoEvaluacion: string | number = this.proccessList.find((item) => item.proceso == event.value).idPeriodoEvaluacion;
        this.evaluationElementRecordForm.get('catPeriodoEvaluacionId').setValue(idPeriodoEvaluacion);
    }

    onResponsibilityAreaChange(event: MatSelectChange): void {
        this.getResponsibilityAreaById(event.value);
    }

    onCorporateAreaChange(event: MatSelectChange): void {
        this.getCorporateAreaById(event.value);
    }

    private getYears(): void {
        const filters = new TablePaginatorSearch();
        this.evaluationElement.getYears(filters).subscribe((response) => {
            if (response.output) {
                this.yearList = response.output.map((item) => new ElementoEvaluacionAnio().deserialize(item));
            }
            // if (this.yearList.length > 0) {
            //     this.evaluationElementRecordForm.get('anio').enable();
            // }
        });
    }

    private getCycles(anio?: string | number): void {
        this.cycleList = [];
        this.institutionList = [];
        this.proccessList = [];
        const filters = new TablePaginatorSearch();
        this.evaluationElement.getCycles(anio, filters).subscribe((response) => {
            if (response.output) {
                this.cycleList = response.output.map((item) => new ElementoEvaluacionCycle().deserialize(item));
            }
            // if (this.cycleList.length > 0) {
            //     this.evaluationElementRecordForm.get('idCiclo').enable();
            // }
        });
    }

    private getInstitutions(anio?: string | number, cycle?: string | number): void {
        this.institutionList = [];
        this.proccessList = [];
        const filters = new TablePaginatorSearch();
        this.evaluationElement.getInstitutions(anio, cycle, filters).subscribe((response) => {
            if (response.output) {
                this.institutionList = response.output.map((item) => new ElementoEvaluacionInstitution().deserialize(item));
            }
            // if (this.institutionList.length > 0) {
            //     this.evaluationElementRecordForm.get('idInstitucion').enable();
            // }
        });
    }

    private getProccess(anio?: string | number, cycle?: string | number, institution?: string | number): Promise<boolean> {
        this.proccessList = [];
        const filters = new TablePaginatorSearch();
        return new Promise<boolean>((resolve, reject) => {
            this.evaluationElement.getProccess(anio, cycle, institution, filters).subscribe((response) => {
                if (response.output) {
                    this.proccessList = response.output.map((item) =>
                        new ElementoEvaluacionProccess().deserialize(item)
                    );
                }
                // if (this.proccessList.length > 0) {
                //     this.evaluationElementRecordForm.get('proceso').enable();
                // } 
                resolve(true);
            });
        });
    }

    private getAllResponsibilityAreas(): void {
        const filters = new TablePaginatorSearch();
        this.responsibilityAreasService.getAllResponsibilityAreas(filters).subscribe((response) => {
            if (response.output) {
                this.responsibilityAreaList = response.output.map((item) => new AreaResponsableDTOV1().deserialize(item));
                // if (this.responsibilityAreaList.length > 0) {
                //     this.evaluationElementRecordForm.get('catAreaResponsableId').enable();
                // }
            }
        });
    }

    private getResponsibilityAreaById(responsibilityAreaId?: string | number): void {
        this.levelModalityList = [];
        this.evaluationElementRecordForm.get('catNivelModalidadId').patchValue(null);
        if (responsibilityAreaId) {
            this.responsibilityAreasService.getResponsibilityAreaById(responsibilityAreaId).subscribe((response) => {
                if (response.output) {
                    const data = new AreaResponsableDTOV1().deserialize(response.output[0]);
                    this.generica = data.generica;
                    this.evaluationElementRecordForm.get('responsibilityAreaType').patchValue(this.getResponsibilityAreaTypeString(data.generica), { emitEvent: false });
                    const levelModalityIds: (string | number)[] = data.nivelModalidadIds ? data.nivelModalidadIds.trim().length > 0 ? data.nivelModalidadIds.split(',') : [] : [];
                    const levelModality: string[] = data.nivelModalidad ? data.nivelModalidad.trim().length > 0 ? data.nivelModalidad.split(',') : [] : [];
                    levelModalityIds.forEach((item: string | number, index) => {
                        this.levelModalityList.push({ id: item, nombre: levelModality[index].trim() });
                    });
                    if (this.generica) {
                        // this.evaluationElementRecordForm.get('catNivelModalidadId').disable();
                        this.evaluationElementRecordForm.get('catNivelModalidadId').patchValue(levelModalityIds);
                    }
                    // else {
                    //     this.evaluationElementRecordForm.get('catNivelModalidadId').enable();
                    // }
                }
            });
        }
    }

    getResponsibilityAreaTypeString(type: boolean): string {
        return type ? 'Genérica' : 'Área de campus';
    }

    private getAllEvaluationElementsCatalogs(): void {
        const filters: TablePaginatorSearch = new TablePaginatorSearch();
        filters.pageSize = -1;
        this.evaluationElementCatalogService.getAllEvaluationElementsCatalogs(filters).subscribe((response) => {
            if (response.output) {
                this.evaluationElementCatalogList = response.output.map((item) =>
                    new CatalogoElementoEvaluacionDTOV1().deserialize(item)
                );
                // if (this.evaluationElementCatalogList.length > 0) {
                //     this.evaluationElementRecordForm.get('catElementoEvaluacionId').enable();
                // }                
            }
        });
    }

    private getAllComponents(): void {
        const filters: TablePaginatorSearch = new TablePaginatorSearch();
        filters.pageSize = -1;
        this.component.getAllComponents(filters).subscribe((response) => {
            if (response.output) {
                this.componentList = response.output.map((item) => new ComponenteDTOV1().deserialize(item));
            }
            // if (this.componentList.length > 0) {
            //     this.evaluationElementRecordForm.get('catComponenteId').enable();
            // }  
        });
    }

    private getAllCorporateAreas(): void {
        const filters: TablePaginatorSearch = new TablePaginatorSearch();
        filters.pageSize = -1;
        this.areaCorporate.getAllCorporateAreas(filters).subscribe((response) => {
            if (response.output) {
                this.corporateAreaList = response.output.map((item) => new AreaCorporativaDTOV1().deserialize(item));
                // if (this.corporateAreaList.length > 0) {
                //     this.evaluationElementRecordForm.get('catAreaCorporativaId').enable();
                // } 
            }
        });
    }

    getCorporateAreaById(corporateAreaId?: string | number) {
        if (!corporateAreaId) {
            // this.evaluationElementRecordForm.get('catSubAreaCorporativaId').disable();
            return;
        }
        this.subAreaCorporateList = [];
        this.evaluationElementRecordForm.get('catSubAreaCorporativaId').patchValue(null);
        this.areaCorporate.getCoporateAreaById(corporateAreaId).subscribe((response) => {
            if (response.output) {
                const data = new AreaCorporativaDTOV1().deserialize(response.output[0]);
                if (!data.subCorporateAreas || !data.subCorporateAreas.length || data.subCorporateAreas.length == 0) {
                    // this.evaluationElementRecordForm.get('catSubAreaCorporativaId').disable();
                    return;
                }
                data.subCorporateAreas.forEach((item) => {
                    this.subAreaCorporateList.push( {id: item.id, nombre: item.nombre } )
                });
                if (this.subAreaCorporateList.length > 0) {
                    // this.evaluationElementRecordForm.get('catSubAreaCorporativaId').enable();
                }
            }
        });
    }

    private trackingStatusForm(): void {
        this.subscription.add(this.evaluationElementRecordForm.statusChanges.subscribe(() => (this.edit = true)));
    }
}
