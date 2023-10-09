import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { EvaluationElementService, NormativeService, UsersService } from 'src/app/core/services';
import { EvaluationElementCatalogService } from 'src/app/core/services/api/evaluation-element-catalog/evaluation-element-catalog.service';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';
import {
    CatalogoElementoEvaluacionDTO,
    CatalogoElementoEvaluacionDTOV1,
    TablePaginatorSearch,
} from 'src/app/utils/models';
import { EvaluationElementRecordService } from './modals/evaluation-element-record/evaluation-element-record.service';

@Component({
    selector: 'app-evaluation-element',
    templateUrl: './evaluation-element.component.html',
    styleUrls: ['./evaluation-element.component.scss'],
})
export class EvaluationElementComponent implements OnInit {
    @ViewChild('input', { static: true }) inputSearch: ElementRef;
    @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
    data: CatalogoElementoEvaluacionDTOV1[];
    dataSource: MatTableDataSource<CatalogoElementoEvaluacionDTOV1>;
    selection: SelectionModel<CatalogoElementoEvaluacionDTOV1>;
    disabled: boolean;
    permission: boolean;
    filters: TablePaginatorSearch;
    constructor(
        private readonly evaluationElementeRecord: EvaluationElementRecordService,
        private readonly evaluationElementCatalogService: EvaluationElementCatalogService,
        private readonly normative: NormativeService,
        private users: UsersService
    ) {
        this.data = [];
        this.dataSource = new MatTableDataSource<CatalogoElementoEvaluacionDTOV1>([]);
        this.dataSource.filterPredicate = function (record: CatalogoElementoEvaluacionDTOV1, filter: string): boolean {
            return record.clave.toLowerCase().includes(filter.toLowerCase()) ||
                record.nombre.toLowerCase().includes(filter.toLowerCase());
        };
        this.selection = new SelectionModel<CatalogoElementoEvaluacionDTOV1>(true);
        this.disabled = null;
        this.permission = null;
        this.filters = new TablePaginatorSearch();
    }

    ngOnInit(): void {
        this.getAllEvaluationElementsCatalogs(this.filters);

        // fromEvent(this.inputSearch.nativeElement, 'keyup')
        //   .pipe(
        //     map((event: any) => event.target.value),
        //     debounceTime(1000),
        //     distinctUntilChanged()
        //   )
        //   .subscribe((text: string) => {
        //     this.search(text);
        //   });
        this.paginator.pageSize = this.paginator.pageSizeOptions[1];
        this.paginator.pageIndex = 0;
    }

    editElementEvaluationCatalog(elementoEvaluacion: CatalogoElementoEvaluacionDTOV1): void {
        this.evaluationElementeRecord
            .open({ data: elementoEvaluacion })
            .afterClosed()
            .subscribe(() => this.getAllEvaluationElementsCatalogs(this.filters));
    }

    deleteElementEvaluationCatalogByConfimation(elementoEvaluacion: CatalogoElementoEvaluacionDTOV1): void {
        Alert.confirm('Eliminar Elemento de evaluación', `¿Deseas eliminar el elemento de evaluación?`).subscribe(
            (result) => {
                if (!result || !result.isConfirmed) {
                    return;
                }
                this.deleteEvaluationElementCatalog(elementoEvaluacion);
            }
        );
    }

    openElementEvaluationCatalogRecord(): void {
        this.evaluationElementeRecord
            .open()
            .afterClosed()
            .subscribe(() => this.getAllEvaluationElementsCatalogs(this.filters));
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

    getAllEvaluationElementsCatalogsExcel(): void {
        /* this.evaluationElementCatalogService.getAllEvaluationElementsCatalogsExcel(this.filters).subscribe((response) => {
          if (response.success) {
            convertByteArrayToBlob(response.data, response.mime, response.name);
          }
        }); */
        const url = this.evaluationElementCatalogService.getUrlAllEvaluationElementsCatalogsExcel();
        window.open(url, '_blank');
    }

    private deleteEvaluationElementCatalog(elementoEvaluacion: CatalogoElementoEvaluacionDTOV1): void {
        this.evaluationElementCatalogService.deleteEvaluationElementCatalog(elementoEvaluacion.id).subscribe(() => {
            this.filters.pageNumber = 1;
            this.paginator.firstPage();
            this.getAllEvaluationElementsCatalogs(this.filters);
            Alert.success('', 'Elemento de evaluación eliminado correctamente');
        });
    }
    private getAllEvaluationElementsCatalogs(filters: TablePaginatorSearch): void {
        this.dataSource.data = [];
        this.data = [];
        filters.inactives = true;
        this.evaluationElementCatalogService.getAllEvaluationElementsCatalogs(filters).subscribe((response) => {
            if (response.output) {
                this.data = response.output.map((campus) => new CatalogoElementoEvaluacionDTOV1().deserialize(campus));
                this.dataSource.data = this.data;
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
