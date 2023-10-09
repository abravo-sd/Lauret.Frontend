import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TablePaginatorSearch, Vista } from 'src/app/utils/models';
import { DependenciaAreaDTOV1 } from 'src/app/utils/models/dependencia-area.dto.v1';
import { DependencyAreaRecordService } from './modals/dependency-area-record/dependency-area-record.service';
import { DependencyAreaService } from 'src/app/core/services/api/dependency-area/dependency-area.service';
import { UsersService } from 'src/app/core/services';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

@Component({
    selector: 'app-dependency-area',
    templateUrl: './dependency-area.component.html',
    styleUrls: ['./dependency-area.component.scss'],
})
export class DependencyAreaComponent implements OnInit {
    @ViewChild('input', { static: true }) inputSearch: ElementRef;
    @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
    data: DependenciaAreaDTOV1[];
    dataSource: MatTableDataSource<DependenciaAreaDTOV1>;
    selection: SelectionModel<DependenciaAreaDTOV1>;
    disabled: boolean;
    permission: boolean;
    filters: TablePaginatorSearch;
    thisAccess: Vista;
    permissions: boolean[];

    constructor(
        private readonly dependenciaRecord: DependencyAreaRecordService,
        private readonly dependenciaareas: DependencyAreaService,
        private users: UsersService
    ) {
        this.data = [];
        this.dataSource = new MatTableDataSource<DependenciaAreaDTOV1>([]);
        this.selection = new SelectionModel<DependenciaAreaDTOV1>(true);
        this.dataSource.filterPredicate = function (record: DependenciaAreaDTOV1, filter: string): boolean {
            return record.nombre.toLowerCase().includes(filter.toLowerCase());
        };
        this.disabled = null;
        this.permission = null;
        this.filters = new TablePaginatorSearch();
        this.permissions = [false, false, false];
    }

    ngOnInit(): void {
        this.setPermissions();
        this.getAllDependenciaAreas(this.filters);
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

    editDependenciaArea(region: DependenciaAreaDTOV1): void {
        this.dependenciaRecord
            .open({ data: region })
            .afterClosed()
            .subscribe((result) => {
                // if (result == undefined || result == null || (result && result.isConfirmed)) {
                //     return;
                // }
                this.getAllDependenciaAreas(this.filters);
            });
    }

    deleteDependenciaAreaByConfimation(region: DependenciaAreaDTOV1): void {
        Alert.confirm('Eliminar la dependencia de área', `¿Deseas eliminar la dependencia de área?`).subscribe((result) => {
            if (!result || !result.isConfirmed) {
                return;
            }
            this.deleteDependenciaArea(region);
        });
    }

    openDependenciaAreaRecord(): void {
        this.dependenciaRecord
            .open()
            .afterClosed()
            .subscribe(() => this.getAllDependenciaAreas(this.filters));
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

    getAllDependenciaAreasExcel(): void {
        /* this.dependenciaareas.getAllDependenciaAreasExcel(this.filters).subscribe((response) => {
          if (response.success) {
            convertByteArrayToBlob(response.data, response.mime, response.name);
          }
        }); */

        const url = this.dependenciaareas.getUrlAllDependenciaAreasExcel();
        window.open(url, '_blank');
    }

    private deleteDependenciaArea(region: DependenciaAreaDTOV1): void {
        this.dependenciaareas.deleteDependenciaArea(region.id).subscribe(() => {
            Alert.success('', 'Región eliminada correctamente');
            this.filters.pageNumber = 1;
            this.paginator.firstPage();
            this.getAllDependenciaAreas(this.filters);
        });
    }

    private getAllDependenciaAreas(filters: TablePaginatorSearch): void {
        this.dataSource.data = [];
        this.data = [];
        filters.inactives = true;

        this.dependenciaareas.getAllDependenciaAreas(filters).subscribe((response) => {
            if (response.output) {
                this.data = response.output.map((region) => new DependenciaAreaDTOV1().deserialize(region));
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
    private setPermissions(): void {
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_DEPENDENCIA_AREA);

        if (this.thisAccess && this.thisAccess.tipoAcceso && this.thisAccess.tipoAcceso.length && this.thisAccess.tipoAcceso.length > 0)   // consulta
        {
            this.thisAccess.tipoAcceso.forEach((element, index) => {
                if (element.id == 1) this.permissions[0] = true;
                if (element.id == 2) this.permissions[1] = true;
                if (element.id == 3) this.permissions[2] = true;
            });
        }
    }

    checkPermission(p: number): boolean {
        return this.permissions[p];
    }
}
