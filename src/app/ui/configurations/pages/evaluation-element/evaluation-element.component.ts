import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { EvaluationElementService, NormativeService, UsersService } from 'src/app/core/services';
import { EvidenceLogRecordService } from 'src/app/ui/operations/pages/evidence-log/modals';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';
import { ElementoEvaluacionDTO, ElementoEvaluacionDTOV1, TablePaginatorSearch } from 'src/app/utils/models';
import { EvaluationElementRecordService } from './modals/evaluation-element-record/evaluation-element-record.service';

@Component({
    selector: 'app-evaluation-element',
    templateUrl: './evaluation-element.component.html',
    styleUrls: ['./evaluation-element.component.scss'],
})
export class EvaluationElementComponent implements OnInit {
    @ViewChild('input', { static: true }) inputSearch: ElementRef;
    @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
    data: ElementoEvaluacionDTOV1[];
    dataSource: MatTableDataSource<ElementoEvaluacionDTOV1>;
    selection: SelectionModel<ElementoEvaluacionDTOV1>;
    disabled: boolean;
    permission: boolean;
    filters: TablePaginatorSearch;
    constructor(
        private readonly evaluationElementeRecord: EvaluationElementRecordService,
        private readonly evaluationElement: EvaluationElementService,
        private readonly normative: NormativeService,
        private users: UsersService
    ) {
        this.data = [];
        this.dataSource = new MatTableDataSource<ElementoEvaluacionDTOV1>([]);
        this.dataSource.filterPredicate = function (record: ElementoEvaluacionDTOV1, filter: string): boolean {
            return record.claveElementoEvaluacion.toLowerCase().includes(filter.toLowerCase()) ||
                record.institucion.toString().toLowerCase().includes(filter.toLowerCase()) ||
                record.anio.toString().toLowerCase().includes(filter.toLowerCase()) ||
                record.ciclo.toLowerCase().includes(filter.toLowerCase()) ||
                record.getProccessString().toLowerCase().includes(filter.toLowerCase()) ||
                record.areaResponsable.toLowerCase().includes(filter.toLowerCase()) ||
                record.nivelModalidad.toLowerCase().includes(filter.toLowerCase());
        };
        this.selection = new SelectionModel<ElementoEvaluacionDTOV1>(true);
        this.disabled = null;
        this.permission = null;
        this.filters = new TablePaginatorSearch();
    }

    ngOnInit(): void {
        this.getAllEvaluationElements(this.filters);
        fromEvent(this.inputSearch.nativeElement, 'keyup')
            .pipe(
                map((event: any) => event.target.value),
                debounceTime(1000),
                distinctUntilChanged()
            )
            .subscribe((text: string) => {
                this.search(text);
            });
        this.paginator.pageSize = this.paginator.pageSizeOptions[1];
        this.paginator.pageIndex = 0;
    }

    editElementEvaluation(elementoEvaluacion: ElementoEvaluacionDTOV1): void {
        this.evaluationElementeRecord
            .open({ data: elementoEvaluacion })
            .afterClosed()
            .subscribe(() => this.getAllEvaluationElements(this.filters));
    }

    deleteElementEvaluationByConfimation(elementoEvaluacion: ElementoEvaluacionDTOV1): void {
        Alert.confirm('Eliminar Elemento de evaluación', `¿Deseas eliminar el elemento de evaluación?`).subscribe(
            (result) => {
                if (!result || !result.isConfirmed) {
                    return;
                }
                this.deleteEvaluationElement(elementoEvaluacion);
            }
        );
    }

    openElementEvaluationRecord(): void {
        this.evaluationElementeRecord
            .open()
            .afterClosed()
            .subscribe(() => this.getAllEvaluationElements(this.filters));
    }

    search(term: string): void {
        this.dataSource.filter = term;
        this.paginator.pageIndex = 0;
        this.dataSource.paginator = this.paginator;
    }

    paginatorChange(event: PageEvent): void {
        this.filters.pageSize = event.pageSize;
        this.filters.pageNumber = event.pageIndex + 1;
        this.dataSource.paginator = this.paginator;
    }

    getAllEvaluationElementExcel(): void {
        this.evaluationElement.getAllEvaluationElementsExcel(this.filters).subscribe((response) => {
            if (response.success) {
                convertByteArrayToBlob(response.data, response.mime, response.name);
            }
        });
    }

    private deleteEvaluationElement(elementoEvaluacion: ElementoEvaluacionDTOV1): void {
        this.evaluationElement.deleteEvaluationElement(elementoEvaluacion.id).subscribe(() => {
            this.filters.pageNumber = 1;
            this.paginator.firstPage();
            this.getAllEvaluationElements(this.filters);
            Alert.success('', 'Elemento de evaluación eliminado correctamente');
        });
    }

    private getAllEvaluationElements(filters: TablePaginatorSearch): void {
        this.dataSource.data = [];
        this.data = [];
        filters.inactives = true;
        this.evaluationElement.getAllEvaluationElements(filters).subscribe((response) => {
            if (response.output) {
                this.data = response.output.map((campus) => new ElementoEvaluacionDTOV1().deserialize(campus));
                this.dataSource.data = this.data;
                // setDataPaginator(this.paginator, response.data.totalCount);
                //setDataPaginator(this.paginator, 20);
                this.dataSource.paginator = this.paginator;
            }
        });
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
}
