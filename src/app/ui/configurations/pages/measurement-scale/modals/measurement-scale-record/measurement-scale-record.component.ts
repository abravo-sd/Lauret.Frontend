import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ComponentsService, CyclesService, EvaluationElementService, ConfigurationIndicatorSiacService, UsersService } from 'src/app/core/services';
import { MeasurementScaleService } from 'src/app/core/services/api/measurement-scale/measurement-scale.service';
import { ValidatorService } from 'src/app/shared/validators';
import { CampusData } from 'src/app/ui/catalogs/pages/campus/modals/campus-record/campus-record.service';
// import { ESCENARIOLIST } from 'src/app/utils/constants';
import { Alert, clearForm, setDataPaginator, YearHelp } from 'src/app/utils/helpers';
import { MatSelectChange } from '@angular/material/select';
import {
    Anio,
    AreaResponsableDTO,
    Ciclo,
    ComponenteDTO,
    ComponenteDTOV1,
    ElementoEvaluacionDTO,
    EscalaMedicionDTO,
    EscenarioDTO,
    IndicadorDTO,
    IndicadorSiacDTOV1,
    ConfiguracionIndicadorSiacDTOV1,
    NivelModalidadDTO,
    TablePaginatorSearch,
    CatalogEscalaMedicionDTOV1,
    EscalaMedicionDTOV1,
    EscalaMedicionCondicionesDTO,
    EscalaMedicionUpdateDTO,
} from 'src/app/utils/models';
import { MeasurementScaleData } from './measurement-scale-record.service';

export enum ModalTitle {
    NEW = 'Nueva Escala de Medicíon',
    EDIT = 'Editar Escala de Medicíon',
}

@Component({
    templateUrl: './measurement-scale-record.component.html',
    styleUrls: ['./measurement-scale-record.component.scss'],
})
export class MeasurementScaleRecordComponent implements OnInit, OnDestroy {
    measurementScaleRecordForm: UntypedFormGroup;
    subscription: Subscription;
    edit: boolean;
    disabled: boolean;
    title: ModalTitle;
    measureScaletList: CatalogEscalaMedicionDTOV1[];
    nivelModalidadList: NivelModalidadDTO[];
    responsibilityAreaLIst: AreaResponsableDTO[];
    componentList: ComponenteDTOV1[];
   // indicatorList: IndicadorDTO[];
    // selectData: EscalaMedicionDTO;
    private readonly validator: ValidatorService;
    // yearList: Anio[];
    // cyclesList: Ciclo[];
    indicatorsList: ConfiguracionIndicadorSiacDTOV1[];

    // escenarios_List = ESCENARIOLIST;
    
    escenariosList: EscalaMedicionCondicionesDTO[];

    data: EscalaMedicionDTOV1;
    dataSource: MatTableDataSource<ElementoEvaluacionDTO>;
    filters: TablePaginatorSearch;
    levelModalityList: NivelModalidadDTO[];
    elementoEvaluationList: ElementoEvaluacionDTO[];
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public readonly measurementScaleData: MeasurementScaleData,
        private readonly formBuilder: UntypedFormBuilder,
        private readonly ref: MatDialogRef<never>,
        private readonly evaluationElement: EvaluationElementService,
        private readonly measurementScaleService: MeasurementScaleService,
        private readonly configurationIndicatorSiacService: ConfigurationIndicatorSiacService,
        private readonly cyclesService: CyclesService,
        private readonly componentsService: ComponentsService,
        private users: UsersService,
    ) {
        this.title = ModalTitle.NEW;
        this.subscription = new Subscription();
        // this.selectData = new EscalaMedicionDTO();
        this.edit = null;
        this.disabled = null;
        this.measureScaletList = [];
        this.nivelModalidadList = [];
        this.responsibilityAreaLIst = [];
        this.componentList = [];

        // this.yearList = [];
        // this.cyclesList = [];
        this.escenariosList = [];
        this.indicatorsList = [];

        this.levelModalityList = [];
        this.elementoEvaluationList = [];
        this.data = new EscalaMedicionDTOV1();
        this.dataSource = new MatTableDataSource<ElementoEvaluacionDTO>([]);
        this.filters = new TablePaginatorSearch();

        this.measurementScaleRecordForm = this.formBuilder.group({
            confIndicadorSiacId: [null],
            anio: [{ value: null, disabled: true }],
            ciclo: [{ value: null, disabled: true }],
            nivelModalidad: [{ value: null, disabled: true }],        
            proceso: [null],
            proccess: [{ value: null, disabled: true }],
            componente: [{ value: null, disabled: true }],
            componenteId: [{ value: null, disabled: true }],
            institucion:  [{ value: null, disabled: true }],
            escenarios: new UntypedFormArray([]),
            activo: [true, []],
        });
    }

    get escenariosListArr(): UntypedFormArray {
        return this.measurementScaleRecordForm.get('escenarios') as UntypedFormArray;
    }

    ngOnInit() {
        this.title = this.measurementScaleData ? ModalTitle.EDIT : ModalTitle.NEW;
        this.getAllConfigurationIndicatorSiac();

        Promise.all([this.getAllMeasurementScaleCatalog()]).then(() => {
            this.buildCatalogFormArr();
        });
        // this.getAllYears();
        // this.buildCatalogFormArr();
        // this.getAllCycles();
        // this.getAllComponentes();
        // this.getAllEvaluationElements(this.filters);
        this.title = this.measurementScaleData ? ModalTitle.EDIT : ModalTitle.NEW;
        if (this.measurementScaleData) {
            this.measurementScaleService
                .getMeasurementScaleById(this.measurementScaleData.data.id)
                .subscribe((response) => {
                    if (!response.output) {
                        return;
                    }
                    const data = new EscalaMedicionDTOV1().deserialize(response.output[0]);
                    this.data = data;
                    this.measurementScaleRecordForm.get('proccess').patchValue(this.data.getProccessString());
                    this.measurementScaleRecordForm.patchValue(this.data);
                    this.measurementScaleRecordForm.get('confIndicadorSiacId').disable();
                    const conditions: EscalaMedicionCondicionesDTO[] = this.measurementScaleData.data.condiciones;
                    setTimeout(() => {this.assignMeasureScaleValues(conditions); this.edit = false; }, 100)
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
        const escenariosFrm: AbstractControl[] = this.escenariosListArr.controls;
        clearForm(this.measurementScaleRecordForm);
        const tmp = this.measurementScaleRecordForm.getRawValue();
        const escalaMedicion: EscalaMedicionUpdateDTO = new EscalaMedicionUpdateDTO();
        this.measurementScaleRecordForm.markAllAsTouched();
        escalaMedicion.condiciones = tmp.escenarios;
        escalaMedicion.confIndicadorSiacId = tmp.confIndicadorSiacId;
        if (this.data.id) {
            escalaMedicion.id = this.data.id;
            escalaMedicion.fechaCreacion = this.data.fechaCreacion;
            escalaMedicion.usuarioCreacion = this.data.usuarioCreacion;
            escalaMedicion.fechaModificacion = new Date();
            escalaMedicion.usuarioModificacion = this.users.userSession.nombre;
            this.measurementScaleService.updateMeasurementScale(escalaMedicion).subscribe(() => {
                Alert.success('', 'Escala de medición actualizada correctamente');
                this.ref.close(true);
            });
        } else {
            escalaMedicion.id = '0';
            escalaMedicion.condiciones.forEach((element, index) => {
                escalaMedicion.condiciones[index].escalaMedicionCondicionId = '0';
                escalaMedicion.condiciones[index].confEscalaMedicionId = '0';
            });

            escalaMedicion.fechaCreacion = new Date();
            escalaMedicion.usuarioCreacion = this.users.userSession.nombre;
            escalaMedicion.fechaModificacion = new Date();
            escalaMedicion.usuarioModificacion = this.users.userSession.nombre;
            this.measurementScaleService.createMeasurementScale(escalaMedicion).subscribe(() => {
                Alert.success('', 'Escala de medición creada correctamente');
                this.ref.close(true);
            });
        }
    }

    private assignMeasureScaleValues(conditions: EscalaMedicionCondicionesDTO[]): void {
        const controlList: AbstractControl[] = this.escenariosListArr.controls;
        conditions.forEach((condition) => {
            const control: AbstractControl = controlList.find((control) => control.get('catEscalaMedicionId').value == condition.catEscalaMedicionId);
            if (control) {
                control.get('escalaMedicionCondicionId').setValue(condition.escalaMedicionCondicionId);
                control.get('confEscalaMedicionId').setValue(condition.confEscalaMedicionId);
                control.get('condicion').setValue(condition.condicion);
            }
        });
    }

    private buildCatalogFormArr(): void {
        this.escenariosListArr.clear();
        this.measureScaletList.forEach((item) => {
            this.escenariosListArr.push(this.createItem(item));
        });
    }

    private createItem(item: CatalogEscalaMedicionDTOV1): UntypedFormGroup {
        return this.formBuilder.group({
            escalaMedicionCondicionId: [null],
            confEscalaMedicionId: [null],
            catEscalaMedicionId: [item.catEscalaMedicionId],
            escala: [item.escala],
            nombre: [item.nombre],
            condicion:[null]
        });
    }

    // private buildCatalogFormArr(): void {
    //     if ( this.measurementScaleData) // ModalTitle.EDIT
    //     {
    //         this.data.condiciones.forEach((module) => {
    //             this.escenariosListArr.push(this.createItem(module.catEscalaMedicionId, module.nombre, module.condicion));
    //         });
    //     }else{
    //         this.escenarios_List.forEach((module) => {
    //             this.escenariosListArr.push(this.createItem(module.valor, module.escenario, module.nombre));
    //         });
    //     }
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

    // getData(id: number) {
    //     const element: ElementoEvaluacionDTO = this.dataSource.data.find((x) => x.elementoEvaluacionId == id);
    //     this.selectData = new EscalaMedicionDTO().deserialize(element);
    // }

    getGenericResponsbilitysAreas(value: string): void {
        let generic: boolean = false;
        if (value == '0') {
            generic = true;
        }
        this.responsibilityAreaLIst = [];

        this.evaluationElement.getGenericResponsbilitysAreas(generic).subscribe((response) => {
            if (response.output) {
                // console.log(response.data);
                this.responsibilityAreaLIst = response.output.map((areaResponsable) =>
                    new AreaResponsableDTO().deserialize(areaResponsable)
                );
            }
        });
    }

    private getAllMeasurementScaleCatalog(): Promise<boolean> {
        const filters: TablePaginatorSearch = new TablePaginatorSearch();
        return new Promise<boolean>((resolve, reject) => {
            this.measurementScaleService.getAllMeasurementScaleCatalog(filters).subscribe((response) => {
                if (response.output) {
                    this.measureScaletList = response.output.map((item) => new CatalogEscalaMedicionDTOV1().deserialize(item));
                }
                resolve(true);
            });
        });
    }

    getAllNivelModalidad(id: string | number): void {
        this.evaluationElement.getEvaluationElementLevelModality(id).subscribe((response) => {
            if (response.output) {
                this.levelModalityList = response.output.map((nivelModalidad) =>
                    new NivelModalidadDTO().deserialize(nivelModalidad)
                );
            }
        });
    }

    private trackingStatusForm(): void {
        this.subscription.add(this.measurementScaleRecordForm.statusChanges.subscribe(() => (this.edit = true)));
    }

    // private getAllYears(): void {
    //     this.yearList = YearHelp.getListAnio();
    // }
    private checkPermission(): void {
        /* this.permission = this.users.checkPermission(Modules.REGION, true);
        if (!this.permission) {
          this.measurementScaleRecordForm.disable();
        } */
    }

    private getAllEvaluationElements(filters: TablePaginatorSearch): void {
        this.elementoEvaluationList = [];
        filters.pageSize = -1;
        this.evaluationElement.getAllEvaluationElements(filters).subscribe((response) => {
            if (response.output) {
                this.elementoEvaluationList = response.output.map((item) =>
                    new ElementoEvaluacionDTO().deserialize(item)
                );
            }
        });
    }


    private getAllConfigurationIndicatorSiac(): void {
        const filters: TablePaginatorSearch = new TablePaginatorSearch();
        filters.pageSize = -1;
        this.configurationIndicatorSiacService.getAllConfigurationIndicatorSiac(filters).subscribe((response) => {
            if (response.output) {
                this.indicatorsList = response.output.map((indicador) => new ConfiguracionIndicadorSiacDTOV1().deserialize(indicador));
            }
        });
    }

    private getAllComponentes(): void {
        const filters: TablePaginatorSearch = new TablePaginatorSearch();
        filters.pageSize = -1;
        this.componentsService.getAllComponents(filters).subscribe((response) => {
            if (response.output) {
                this.componentList = response.output.map((componente) => new ComponenteDTOV1().deserialize(componente));
            }
        });
    }

    onIndicatorChange(event: MatSelectChange): void {
        this.getConfigurationIndicatorSiacById(event.value);
    }

    private getConfigurationIndicatorSiacById(id: string | number): void {
        this.configurationIndicatorSiacService.getConfigurationIndicatorSiacById(id).subscribe((response) => {
            if (response.output) {
                const data: ConfiguracionIndicadorSiacDTOV1 = new ConfiguracionIndicadorSiacDTOV1().deserialize(response.output[0]);
                this.getResponsibilityAreaById(data.catAreaResponsableId);
                this.measurementScaleRecordForm.get('proccess').patchValue(data.getProccessString());
                this.measurementScaleRecordForm.patchValue(data);
            }
        });
    }

    private getResponsibilityAreaById(indicatorId?: string | number): void {
        if (!indicatorId) {
            return;
        }
        this.configurationIndicatorSiacService.getConfigurationIndicatorSiacById(indicatorId).subscribe((response) => {
            if (response.output) {
                const data = new ConfiguracionIndicadorSiacDTOV1().deserialize(response.output[0]);
                // const levelModalityIds: (string | number)[] = data.anio ? data.nivelModalidadIds.trim().length > 0 ? data.nivelModalidadIds.split(',') : [] : [];
                // const levelModality: string[] = data.nivelModalidad ? data.nivelModalidad.trim().length > 0 ? data.nivelModalidad.split(',') : [] : [];
                // levelModalityIds.forEach((item: string | number, index) => {
                //     this.levelModalityList.push({ id: Number(item), nombre: levelModality[index] })
                // });
                // if (this.levelModalityList.length > 0) {
                //     this.measurementScaleRecordForm.get('catNivelModalidadId').enable();
                // }
            }
        });
    }
}

    // private getAllCycles(): void {
    //     const filters: TablePaginatorSearch = new TablePaginatorSearch();
    //     filters.pageSize = -1;
    //     this.cyclesService.getAllCyclesV2(filters).subscribe((response) => {
    //         if (response.output) {
    //             this.cyclesList = response.output.map((ciclo) => new Ciclo().deserialize(ciclo));
    //         }
    //     });
    // }

