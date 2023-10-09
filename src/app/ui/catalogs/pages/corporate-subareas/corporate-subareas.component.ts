import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { UsersService } from 'src/app/core/services';
import { CorporateAreaService } from 'src/app/core/services/api/coporate-area/corporate-area.service';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';
import { TablePaginatorSearch, Vista } from 'src/app/utils/models';
import { SubAreaCorporativaDTOV1 } from 'src/app/utils/models/subarea-corporativa.dto.v1';
import { CorporateSubAreaRecordService } from './modals/corporate-subarea-record/corporate-subarea-record.service';
import { CorporateSubAreaService } from 'src/app/core/services/api/corporate-subarea/corporate-subarea.service';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

@Component({
    selector: 'app-corporate-subareas',
    templateUrl: './corporate-subareas.component.html',
    styleUrls: ['./corporate-subareas.component.scss'],
})
export class CorporateSubAreasComponent implements OnInit {
    @ViewChild('input', { static: true }) inputSearch: ElementRef;
    @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
    data: SubAreaCorporativaDTOV1[];
    dataSource: MatTableDataSource<SubAreaCorporativaDTOV1>;
    selection: SelectionModel<SubAreaCorporativaDTOV1>;
    disabled: boolean;
    permission: boolean;
    filters: TablePaginatorSearch;
    thisAccess: Vista;
    permissions: boolean[];
    constructor(
        private readonly corporateSubAreaRecord: CorporateSubAreaRecordService,
        private readonly corporateSubArea: CorporateSubAreaService,
        private users: UsersService
    ) {
        this.data = [];
        this.dataSource = new MatTableDataSource<SubAreaCorporativaDTOV1>([]);
        this.selection = new SelectionModel<SubAreaCorporativaDTOV1>(true);
        this.dataSource.filterPredicate = function (record: SubAreaCorporativaDTOV1, filter: string): boolean {
            return record.siglas.toLowerCase().includes(filter.toLowerCase()) ||
                record.nombre.toLowerCase().includes(filter.toLowerCase());
        };
        this.disabled = null;
        this.permission = null;
        this.filters = new TablePaginatorSearch();
        this.permissions = [false, false, false];
    }

    ngOnInit(): void {
        this.setPermissions();
        this.getAllCorporateSubAreas(this.filters);
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

    editCorporateArea(areaCorporativa: SubAreaCorporativaDTOV1): void {
        this.corporateSubAreaRecord
            .open({ data: areaCorporativa })
            .afterClosed()
            .subscribe(() => this.getAllCorporateSubAreas(this.filters));
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

    openCorporateRecord(): void {
        this.corporateSubAreaRecord
            .open()
            .afterClosed()
            .subscribe(() => this.getAllCorporateSubAreas(this.filters));
    }

    deleteCoporateAreaByConfimation(areaCorporativa: SubAreaCorporativaDTOV1): void {
        Alert.confirm('Eliminar Area corporativa', `¿Deseas eliminar el Area corporativa?`).subscribe((result) => {
            if (!result || !result.isConfirmed) {
                return;
            }
            this.deleteCorporateSubArea(areaCorporativa);
        });
    }

    private deleteCorporateSubArea(areaCorporativa: SubAreaCorporativaDTOV1): void {
        this.corporateSubArea.deleteCorporateSubArea(areaCorporativa.id).subscribe(() => {
            this.filters.pageNumber = 1;
            this.paginator.firstPage();
            this.getAllCorporateSubAreas(this.filters);
            Alert.success('', 'Area corporativa eliminada correctamente');
        });
    }

    private getAllCorporateSubAreas(filters: TablePaginatorSearch): void {
        this.dataSource.data = [];
        this.data = [];
        filters.inactives = true;
        this.corporateSubArea.getAllCorporateSubAreas(filters).subscribe((response) => {
            if (response.output) {
                this.data = response.output.map((areacoroporativa) =>
                    new SubAreaCorporativaDTOV1().deserialize(areacoroporativa)
                );
                this.dataSource.data = this.data;
                this.dataSource.paginator = this.paginator;
            }
        });
    }

    getAllCoporateAreasExcel(): void {
        /* this.corporateSubArea.getAllCorpoateAreaExcel(this.filters).subscribe((response) => {
          if (response.success) {
            convertByteArrayToBlob(response.data, response.mime, response.name);
          }
        }); */

        const url = this.corporateSubArea.getUrlAllCorporateSubAreas();
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
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_SUBAREAS_CORP);

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
