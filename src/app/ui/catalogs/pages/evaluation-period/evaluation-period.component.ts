import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { EvaluationPeriodService, UsersService } from 'src/app/core/services';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';
import { PeriodoEvaluacionDTO, PeriodoEvaluacionDTOV1, TablePaginatorSearch,Vista } from 'src/app/utils/models';
import { EvaluationPreiodRecordService } from './modals';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

@Component({
    selector: 'app-evaluation-period',
    templateUrl: './evaluation-period.component.html',
    styleUrls: ['./evaluation-period.component.scss'],
})
export class EvaluationPeriodComponent implements OnInit {
    @ViewChild('input', { static: true }) inputSearch: ElementRef;
    @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
    data: PeriodoEvaluacionDTOV1[];
    dataSource: MatTableDataSource<PeriodoEvaluacionDTOV1>;
    selection: SelectionModel<PeriodoEvaluacionDTOV1>;
    disabled: boolean;
    permission: boolean;
    filters: TablePaginatorSearch;
    thisAccess: Vista;
    permissions: boolean[];
    constructor(
        private readonly evaluationPeriod: EvaluationPeriodService,
        private readonly evaluationPeriodRecord: EvaluationPreiodRecordService,
        private users: UsersService
    ) {
        this.data = [];
        this.dataSource = new MatTableDataSource<PeriodoEvaluacionDTOV1>([]);
        this.dataSource.filterPredicate = function (record: PeriodoEvaluacionDTOV1, filter: string): boolean {
            return record.ciclo.toLowerCase().includes(filter.toLowerCase()) ||
                record.proceso.toString().toLowerCase().includes(filter.toLowerCase()) ||
                record.anio.toString().toLowerCase().includes(filter.toLowerCase()) ||
                record.institucion.toLowerCase().includes(filter.toLowerCase());
        };
        this.selection = new SelectionModel<PeriodoEvaluacionDTOV1>(true);
        this.disabled = null;
        this.permission = null;
        this.filters = new TablePaginatorSearch();
        this.permissions = [false, false, false];
    }

    ngOnInit(): void {
        this.setPermissions();
        this.getAllEvaluationPeriod(this.filters);
        // fromEvent(this.inputSearch.nativeElement, 'keyup')
        //     .pipe(
        //         map((event: any) => event.target.value),
        //         debounceTime(1000),
        //         distinctUntilChanged()
        //     )
        //     .subscribe((text: string) => {
        //         this.search(text);
        //     });
        this.paginator.pageSize = this.paginator.pageSizeOptions[1];
        this.paginator.pageIndex = 0;
    }

    deleteEvaluationPeriodByConfimation(periodoEvaluacion: PeriodoEvaluacionDTOV1): void {
        Alert.confirm('Eliminar Periodo de Evaluación', `¿Deseas eliminar el Periodo de Evaluacion?`).subscribe(
            (result) => {
                if (!result || !result.isConfirmed) {
                    return;
                }
                this.deleteEvaluationPeriod(periodoEvaluacion);
            }
        );
    }

    private deleteEvaluationPeriod(periodoEvaluacion: PeriodoEvaluacionDTOV1): void {
        this.evaluationPeriod.deletePeriodEvaluation(periodoEvaluacion.idPeriodoEvaluacion).subscribe(() => {
            this.filters.pageNumber = 1;
            this.paginator.firstPage();
            this.getAllEvaluationPeriod(this.filters);
            Alert.success('', 'Periodo de evaluación eliminado correctamente');
        });
    }

    openEvaluationPeriodRecord(): void {
        this.evaluationPeriodRecord
            .open()
            .afterClosed()
            .subscribe(() => this.getAllEvaluationPeriod(this.filters));
    }

    editEvaluationPeriod(periodoEvaluacion: PeriodoEvaluacionDTOV1): void {
        this.evaluationPeriodRecord
            .open({ data: periodoEvaluacion })
            .afterClosed()
            .subscribe(() => this.getAllEvaluationPeriod(this.filters));
    }

    search(term: string): void {
        this.dataSource.filter = term;
        this.filters.pageNumber = 0;
        this.dataSource.paginator = this.paginator;
    }

    paginatorChange(event: PageEvent): void {
        this.filters.pageSize = event.pageSize;
        this.filters.pageNumber = event.pageIndex + 1;
        this.dataSource.paginator = this.paginator;
    }

    private getAllEvaluationPeriod(filters: TablePaginatorSearch): void {
        this.dataSource.data = [];
        this.data = [];
        filters.inactives = true;
        this.evaluationPeriod.getAllPeriodEvaluation(filters).subscribe((response) => {
            if (response.output) {
                this.data = response.output.map((periodoEvaluacion) =>
                    new PeriodoEvaluacionDTOV1().deserialize(periodoEvaluacion)
                );
                this.dataSource.data = this.data;
                this.dataSource.data = this.data;
                this.dataSource.paginator = this.paginator;
            }
        });
    }

    getAllEvaluationPeriodExcel(): void {
        /* this.evaluationPeriod.getAllPeriodEvaluationExcel(this.filters).subscribe((response) => {
          if (response.success) {
            convertByteArrayToBlob(response.data, response.mime, response.name);
          }
        }); */
        const url = this.evaluationPeriod.getUrlAllPeriodEvaluationExcel();
        window.open(url, '_blank');
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.data.forEach((element: any) => {
            for (const key in element) {
                if (!(typeof element[key] === 'boolean') && !(Array.isArray(element[key]))) {
                    if (!element[key] || element[key] === null || element[key] == undefined) {
                        element[key] = '';
                    }
                }
            }
        });
        this.dataSource.filter = filterValue.trim().toLowerCase();
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
