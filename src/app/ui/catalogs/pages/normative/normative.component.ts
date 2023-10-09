import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NormativeService, UsersService } from 'src/app/core/services';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';
import { NormativaDTO, NormativaDTOV1, TablePaginatorSearch,Vista } from 'src/app/utils/models';
import { NormativeRecordService } from './modals/normative-record/normative-record.service';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

@Component({
    selector: 'app-normative',
    templateUrl: './normative.component.html',
    styleUrls: ['./normative.component.scss'],
})
export class NormativeComponent implements OnInit {
    @ViewChild('input', { static: true }) inputSearch: ElementRef;
    @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
    data: NormativaDTOV1[];
    dataSource: MatTableDataSource<NormativaDTOV1>;
    selection: SelectionModel<NormativaDTOV1>;
    disabled: boolean;
    permission: boolean;
    filters: TablePaginatorSearch;
    thisAccess: Vista;
    permissions: boolean[];
    constructor(
        private readonly normativaRecord: NormativeRecordService,
        private readonly normative: NormativeService,
        private users: UsersService
    ) {
        this.data = [];
        this.dataSource = new MatTableDataSource<NormativaDTOV1>([]);
        this.dataSource.filterPredicate = function (record: NormativaDTOV1, filter: string): boolean {
            return record.clave.toLowerCase().includes(filter.toLowerCase()) ||
                record.nombre.toLowerCase().includes(filter.toLowerCase());
        };
        this.selection = new SelectionModel<NormativaDTOV1>(true);
        this.disabled = null;
        this.permission = null;
        this.filters = new TablePaginatorSearch();
        this.permissions = [false, false, false];
    }

    ngOnInit(): void {
        this.setPermissions();
        this.getAllNormatives(this.filters);
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

    openNormativeRecord(): void {
        this.normativaRecord
            .open()
            .afterClosed()
            .subscribe(() => this.getAllNormatives(this.filters));
    }

    editNormative(normativa: NormativaDTOV1): void {
        this.normativaRecord
            .open({ data: normativa })
            .afterClosed()
            .subscribe(() => this.getAllNormatives(this.filters));
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

    private getAllNormatives(filter: TablePaginatorSearch) {
        this.dataSource.data = [];
        this.data = [];
        filter.inactives = true;
        this.normative.getAllNormatives(filter).subscribe((response) => {
            if (response.output) {
                this.data = response.output.map((normativa) => new NormativaDTOV1().deserialize(normativa));
                this.dataSource.data = this.data;
                this.dataSource.paginator = this.paginator;
            }
        });
    }

    deleteNormativeByConfimation(normativa: NormativaDTOV1): void {
        Alert.confirm('Eliminar normativa', `¿Deseas eliminar la normativa?`).subscribe((result) => {
            if (!result || !result.isConfirmed) {
                return;
            }
            this.deleteNormative(normativa);
        });
    }

    getAllNormativesExcel(): void {
        /*  this.normative.getAllNormativesExcel(this.filters).subscribe((response) => {
           if (response.success) {
             convertByteArrayToBlob(response.data, response.mime, response.name);
           }
         }); */
        const url = this.normative.getUrlAllNormativesExcel();
        window.open(url, '_blank');
    }

    private deleteNormative(normativa: NormativaDTOV1): void {
        this.normative.deleteNormative(normativa.id).subscribe(() => {
            this.filters.pageNumber = 1;
            this.paginator.firstPage();
            this.getAllNormatives(this.filters);
            Alert.success('', 'Normativa eliminado correctamente');
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

    private setPermissions(): void {
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_NORMATIVA);

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
