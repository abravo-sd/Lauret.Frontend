import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { UsersService } from 'src/app/core/services';
import { CorporateAreaService } from 'src/app/core/services/api/coporate-area/corporate-area.service';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';
import { AreaCorporativaDTO, AreaCorporativaDTOV1, TablePaginatorSearch, Vista} from 'src/app/utils/models';
import { CoporateAreaRecordService } from './modals';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

@Component({
    selector: 'app-corporate-areas',
    templateUrl: './corporate-areas.component.html',
    styleUrls: ['./corporate-areas.component.scss'],
})
export class CorporateAreasComponent implements OnInit {
    @ViewChild('input', { static: true }) inputSearch: ElementRef;
    @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
    data: AreaCorporativaDTOV1[];
    dataSource: MatTableDataSource<AreaCorporativaDTOV1>;
    selection: SelectionModel<AreaCorporativaDTOV1>;
    disabled: boolean;
    permission: boolean;
    filters: TablePaginatorSearch;
    thisAccess: Vista;
    permissions: boolean[];
    constructor(
        private readonly corporateAreaRecord: CoporateAreaRecordService,
        private readonly corporateArea: CorporateAreaService,
        private users: UsersService
    ) {
        this.data = [];
        this.dataSource = new MatTableDataSource<AreaCorporativaDTOV1>([]);
        this.dataSource.filterPredicate = function (record: AreaCorporativaDTOV1, filter: string): boolean {
            return record.nombre.toLowerCase().includes(filter.toLowerCase()) ||
                record.getareaCorporativaSubaAreaListString().toLowerCase().includes(filter.toLowerCase());
        };
        this.selection = new SelectionModel<AreaCorporativaDTOV1>(true);
        this.disabled = null;
        this.permission = null;
        this.filters = new TablePaginatorSearch();
        this.permissions = [false, false, false];
    }

    ngOnInit(): void {
        this.setPermissions();
        this.disabled = !this.checkPermission(2);
        this.getAllCorporateAreas(this.filters);
        this.paginator.pageSize = this.paginator.pageSizeOptions[1];
        this.paginator.pageIndex = 0;
    }

    editCorporateArea(areaCorporativa: AreaCorporativaDTOV1): void {
        this.corporateAreaRecord
            .open({ data: areaCorporativa })
            .afterClosed()
            .subscribe(() => this.getAllCorporateAreas(this.filters));
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
        this.corporateAreaRecord
            .open()
            .afterClosed()
            .subscribe(() => this.getAllCorporateAreas(this.filters));
    }

    deleteCoporateAreaByConfimation(areaCorporativa: AreaCorporativaDTOV1): void {
        Alert.confirm('Eliminar Area corporativa', `¿Deseas eliminar el Area corporativa?`).subscribe((result) => {
            if (!result || !result.isConfirmed) {
                return;
            }
            this.deleteCorporate(areaCorporativa);
        });
    }

    private deleteCorporate(areaCorporativa: AreaCorporativaDTOV1): void {
        this.corporateArea.deleteCorporateArea(areaCorporativa.id).subscribe(() => {
            this.filters.pageNumber = 1;
            this.paginator.firstPage();
            this.getAllCorporateAreas(this.filters);
            Alert.success('', 'Area corporativa eliminada correctamente');
        });
    }

    private getAllCorporateAreas(filters: TablePaginatorSearch): void {
        this.dataSource.data = [];
        this.data = [];
        filters.inactives = true;
        this.corporateArea.getAllCorporateAreas(filters).subscribe((response) => {
            if (response.output) {
                this.data = response.output.map((areacoroporativa) => new AreaCorporativaDTOV1().deserialize(areacoroporativa));
                this.dataSource.data = this.data;
                this.dataSource.paginator = this.paginator;
            }
        });
    }

    getAllCoporateAreasExcel(): void {
        /* this.corporateArea.getAllCorpoateAreaExcel(this.filters).subscribe((response) => {
          if (response.success) {
            convertByteArrayToBlob(response.data, response.mime, response.name);
          }
        }); */

        const url = this.corporateArea.getUrlAllCorporateAreas();
        window.open(url, '_blank');
    }

    
    private setPermissions(): void {
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_AREAS_CORP);
    
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
