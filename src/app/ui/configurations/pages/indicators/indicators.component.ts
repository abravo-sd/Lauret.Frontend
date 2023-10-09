import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ConfigurationIndicatorSiacService, IndicatorService, UsersService } from 'src/app/core/services';
import { Alert, convertByteArrayToBlob } from 'src/app/utils/helpers';
import { ConfiguracionIndicadorSiacDTO, ConfiguracionIndicadorSiacDTOV1, TablePaginatorSearch, Vista } from 'src/app/utils/models';
import { IndicatorRecordService } from './modals/indicator-record/indicator-record.service';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

@Component({
    selector: 'app-indicators',
    templateUrl: './indicators.component.html',
    styleUrls: ['./indicators.component.scss'],
})
export class IndicatorsComponent implements OnInit {
    @ViewChild('input', { static: true }) inputSearch: ElementRef;
    @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
    data: ConfiguracionIndicadorSiacDTOV1[];
    dataSource: MatTableDataSource<ConfiguracionIndicadorSiacDTOV1>;
    selection: SelectionModel<ConfiguracionIndicadorSiacDTOV1>;
    disabled: boolean;
    thisAccess: Vista;
    permissions: boolean[];
    filters: TablePaginatorSearch;
    constructor(
        private readonly indicatorRecord: IndicatorRecordService,
        private readonly configurationIndicatorSiacService: ConfigurationIndicatorSiacService,
        private users: UsersService
    ) {
        this.data = [];
        this.dataSource = new MatTableDataSource<ConfiguracionIndicadorSiacDTOV1>([]);
        this.dataSource.filterPredicate = function (record: ConfiguracionIndicadorSiacDTOV1, filter: string): boolean {
            return record.claveIndicadorSiac.toLowerCase().includes(filter.toLowerCase()) ||
                record.indicadorSiac.toLowerCase().includes(filter.toLowerCase()) ||
                record.anio.toString().toLowerCase().includes(filter.toLowerCase()) ||
                record.ciclo.toLowerCase().includes(filter.toLowerCase()) ||
                record.nivelModalidad.toLowerCase().includes(filter.toLowerCase()) ||
                record.componente.toLowerCase().includes(filter.toLowerCase()) ||
                record.nombreComponenteUvm.toLowerCase().includes(filter.toLowerCase()) ||
                record.nombreIndicadorUvm.toLowerCase().includes(filter.toLowerCase()) ||
                record.nombreSubIndicadorUvm.toLowerCase().includes(filter.toLowerCase());
        };
        this.selection = new SelectionModel<ConfiguracionIndicadorSiacDTOV1>(true);
        this.disabled = null;
        this.permissions = [false, false, false];
        this.filters = new TablePaginatorSearch();
    }

    ngOnInit(): void {
        this.setPermissions();
        this.getAllIndicators(this.filters);
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

    private setPermissions(): void {
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CFG_INDICADORES_SIAC);

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

    openIndicatorRecord(): void {
        this.indicatorRecord
            .open()
            .afterClosed()
            .subscribe(() => this.getAllIndicators(this.filters));
    }

    editIndicator(configuracionIndicadorSiacDTO: ConfiguracionIndicadorSiacDTOV1): void {
        this.indicatorRecord
            .open({ data: configuracionIndicadorSiacDTO })
            .afterClosed()
            .subscribe(() => this.getAllIndicators(this.filters));
    }

    closeIndicatorRecord(): void {
        this.indicatorRecord.open().afterClosed();
    }

    private getAllIndicators(filter: TablePaginatorSearch) {
        this.dataSource.data = [];
        this.data = [];
        filter.inactives = true;
        this.configurationIndicatorSiacService.getAllConfigurationIndicatorSiac(filter).subscribe((response) => {
            if (response.output) {
                this.data = response.output.map((configuracionIndicadorSiac) =>
                    new ConfiguracionIndicadorSiacDTOV1().deserialize(configuracionIndicadorSiac)
                );
                this.dataSource.data = this.data;
            }
        });
    }

    deleteIndicatorByConfimation(ConfiguracionIndicadorSiacDTO: ConfiguracionIndicadorSiacDTOV1): void {
        Alert.confirm('Eliminar indicador', `¿Deseas eliminar el indicador?`).subscribe((result) => {
            if (!result || !result.isConfirmed) {
                return;
            }
            this.deleteIndicator(ConfiguracionIndicadorSiacDTO);
        });
    }

    getAllIndicadorExcel(): void {
        this.configurationIndicatorSiacService.getAllConfigurationIndicatorSiacExcel(this.filters).subscribe((response) => {
            if (response.success) {
                convertByteArrayToBlob(response.data, response.mime, response.name);
            }
        });
    }

    private deleteIndicator(configuracionIndicadorSiacDTO: ConfiguracionIndicadorSiacDTOV1): void {
        this.configurationIndicatorSiacService
            .deleteConfigurationIndicatorSiac(configuracionIndicadorSiacDTO.id)
            .subscribe(() => {
                this.filters.pageNumber = 1;
                this.paginator.firstPage();
                this.getAllIndicators(this.filters);
                Alert.success('', 'Inidicador eliminado correctamente');
            });
    }
}
