import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { UsersService } from 'src/app/core/services';
import { IndicatorSiacService } from 'src/app/core/services/api/indicator-siac/indicator-siac.service';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';
import { IndicadorSiacDTO, IndicadorSiacDTOV1, TablePaginatorSearch,Vista } from 'src/app/utils/models';
import { IndicatorSiacRecordService } from './modals';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

@Component({
    selector: 'app-indicators-siac',
    templateUrl: './indicators-siac.component.html',
    styleUrls: ['./indicators-siac.component.scss'],
})
export class IndicatorsSiacComponent implements OnInit {
    @ViewChild('input', { static: true }) inputSearch: ElementRef;
    @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
    data: IndicadorSiacDTOV1[];
    dataSource: MatTableDataSource<IndicadorSiacDTOV1>;
    selection: SelectionModel<IndicadorSiacDTOV1>;
    disabled: boolean;
    permission: boolean;
    filters: TablePaginatorSearch;
    thisAccess: Vista;
    permissions: boolean[];
    constructor(
        private readonly indicatorSiacRecord: IndicatorSiacRecordService,
        private readonly indicatorSiacService: IndicatorSiacService,
        private users: UsersService
    ) {
        this.data = [];
        this.dataSource = new MatTableDataSource<IndicadorSiacDTOV1>([]);
        this.dataSource.filterPredicate = function(data: IndicadorSiacDTOV1, filter: string): boolean {
            return data.clave.toLowerCase().includes(filter.toLowerCase()) ||
                    data.nombre.toLowerCase().includes(filter.toLowerCase()) ||
                    data.descripcion.toLowerCase().toString().includes(filter.toLowerCase());
        };
        this.selection = new SelectionModel<IndicadorSiacDTOV1>(true);
        this.disabled = null;
        this.permission = null;
        this.filters = new TablePaginatorSearch();
        this.permissions = [false, false, false];
    }
    

    ngOnInit(): void {
        this.setPermissions();
        this.getAllIndicatorsSiac(this.filters);
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

    openIndicatorSiacRecord(): void {
        this.indicatorSiacRecord
            .open()
            .afterClosed()
            .subscribe(() => this.getAllIndicatorsSiac(this.filters));
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

    getAllIndicatorSiacExcel(): void {
        /*  this.indicatorSiacService.getAllIndicadorSiacExcel(this.filters).subscribe((response) => {
           if (response.success) {
             convertByteArrayToBlob(response.data, response.mime, response.name);
           }
         }); */

        const url = this.indicatorSiacService.getUrlAllIndicadorSiacExcel();
        window.open(url, '_blank');
    }

    editIndicatorSiac(indicador: IndicadorSiacDTOV1): void {
        this.indicatorSiacRecord
            .open({ data: indicador })
            .afterClosed()
            .subscribe(() => {
                this.getAllIndicatorsSiac(this.filters);
            });
    }

    deleteIndicatorSiacByConfimation(indicadorSiac: IndicadorSiacDTOV1): void {
        Alert.confirm('Eliminar indicador siac', `¿Deseas eliminar el indicador?`).subscribe((result) => {
            if (!result || !result.isConfirmed) {
                return;
            }
            this.deleteIndicatorSiac(indicadorSiac);
        });
    }

    private deleteIndicatorSiac(indicadorSiac: IndicadorSiacDTOV1): void {
        this.indicatorSiacService.deleteIndicatorSiac(indicadorSiac.id).subscribe(() => {
            this.filters.pageNumber = 1;
            this.paginator.firstPage();
            this.getAllIndicatorsSiac(this.filters);
            Alert.success('', 'Indicador siac eliminado correctamente');
        });
    }

    private getAllIndicatorsSiac(filters: TablePaginatorSearch): void {
        this.dataSource.data = [];
        this.data = [];
        filters.inactives = true;
        this.indicatorSiacService.getAllIndicatorsSiac(filters).subscribe((response) => {
            if (response.output) {
                this.data = response.output.map((indicadorSiac) => new IndicadorSiacDTOV1().deserialize(indicadorSiac));
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
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_INDICADOR_SIAC);

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
