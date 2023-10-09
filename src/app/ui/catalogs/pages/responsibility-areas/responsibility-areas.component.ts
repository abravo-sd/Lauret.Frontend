import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ResponsibilityAreasService, UsersService } from 'src/app/core/services';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';
import { AreaResponsableDTO, AreaResponsableDTOV1, TablePaginatorSearch,Vista } from 'src/app/utils/models';
import { ResponsibilityAreasRecordService } from './modals/responsibility-areas-record/responsibility-areas-record.service';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';


@Component({
    selector: 'app-responsibility-areas',
    templateUrl: './responsibility-areas.component.html',
    styleUrls: ['./responsibility-areas.component.scss'],
})
export class ResponsibilityAreasComponent implements OnInit {
    @ViewChild('input', { static: true }) inputSearch: ElementRef;
    @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
    data: AreaResponsableDTO[];
    dataSource: MatTableDataSource<AreaResponsableDTOV1>;
    selection: SelectionModel<AreaResponsableDTOV1>;
    filters: TablePaginatorSearch;
    disabled: boolean;
    thisAccess: Vista;
    permissions: boolean[];
    constructor(
        private readonly responsibilityAreasRecord: ResponsibilityAreasRecordService,
        private readonly responsibilityAreas: ResponsibilityAreasService,
        private users: UsersService
    ) {
        this.data = [];
        this.filters = new TablePaginatorSearch();
        this.dataSource = new MatTableDataSource<AreaResponsableDTOV1>([]);
        this.dataSource.filterPredicate = function (record: AreaResponsableDTOV1, filter: string): boolean {
            return record.nombre.toLowerCase().includes(filter.toLowerCase()) ||
                record.getTypeArea().toLowerCase().includes(filter.toLowerCase()) ||
                record.getListNivelModalidad().toLowerCase().includes(filter.toLowerCase()) ||
                record.dependenciaArea.toLowerCase().includes(filter.toLowerCase());
        };
        this.selection = new SelectionModel<AreaResponsableDTOV1>(true);
        this.permissions = [false, false, false];
    }

    ngOnInit(): void {
        this.setPermissions();
        this.getAllResponsibilityAreas(this.filters);
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

    openResponsibilityAreas(): void {
        this.responsibilityAreasRecord
            .open()
            .afterClosed()
            .subscribe((response) => {
                if (response) {
                    this.getAllResponsibilityAreas(this.filters);
                }
            });
    }

    editResponsibilityArea(areaResponsable: AreaResponsableDTOV1): void {
        this.responsibilityAreasRecord
            .open({ data: areaResponsable })
            .afterClosed()
            .subscribe(() => this.getAllResponsibilityAreas(this.filters));
    }

    deleteAreaResponsibility(data: AreaResponsableDTOV1): void {
        Alert.confirm('Eliminar área responsable', '¿Deseas eliminar esta área responsable?').subscribe((result) => {
            if (!result || !result.isConfirmed) {
                return;
            }
            this.responsibilityAreas.deleteResponsibilityArea(data.id).subscribe((response) => {
                if (response.exito) {
                    Alert.success('', 'Área eliminada correctamente');
                    this.getAllResponsibilityAreas(new TablePaginatorSearch());
                }
            });
        });
    }

    getAllResponsabilitiesExcel(): void {
        /*     this.responsibilityAreas.getAllAllResponsibilityAreasExcel(this.filters).subscribe((response) => {
              if (response.success) {
                convertByteArrayToBlob(response.data, response.mime, response.name);
              }
            }); */

        const url = this.responsibilityAreas.getUrlAllResponsibilityAreasExcel();
        window.open(url, '_blank');
    }

    private getAllResponsibilityAreas(filters: TablePaginatorSearch): void {
        this.dataSource.data = [];
        filters.inactives = true;
        this.responsibilityAreas.getAllResponsibilityAreas(this.filters).subscribe((response) => {
            if (response.output) {
                const data = response.output.map((area) => new AreaResponsableDTOV1().deserialize(area));
                this.dataSource.data = data;
                this.dataSource.data = data;
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
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_AREAS_RESPONSABLE);

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
