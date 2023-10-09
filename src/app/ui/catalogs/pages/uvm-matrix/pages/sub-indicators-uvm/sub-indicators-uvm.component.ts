import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { SubindicatorUvmService, UsersService } from 'src/app/core/services';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';
import { TablePaginatorSearch, IndicadorUVMDTO, SubIndicadorUVMDTO, SubIndicadorUVMDTOV1,Vista } from 'src/app/utils/models';
import { IndicatorUvmRecordService } from '../indicators-uvm/modals';
import { SubIndicatorUvmRecordService } from './modals';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

@Component({
    selector: 'app-sub-indicators-uvm',
    templateUrl: './sub-indicators-uvm.component.html',
    styleUrls: ['./sub-indicators-uvm.component.scss'],
})
export class SubIndicatorsUvmComponent implements OnInit {
    @ViewChild('input', { static: true }) inputSearch: ElementRef;
    @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
    dataSource: MatTableDataSource<SubIndicadorUVMDTOV1>;
    filters: TablePaginatorSearch;
    data: SubIndicadorUVMDTOV1[];
    thisAccess: Vista;
    permissions: boolean[];
    constructor(
        private readonly subIndicatorUvmRecordService: SubIndicatorUvmRecordService,
        private readonly subindicatorUvmService: SubindicatorUvmService,
        private users: UsersService
    ) {
        this.dataSource = new MatTableDataSource<SubIndicadorUVMDTOV1>([]);
        this.dataSource.filterPredicate = function (record: SubIndicadorUVMDTOV1, filter: string): boolean {
            return record.nombreSubIndicadorUvm.toLowerCase().includes(filter.toLowerCase()) ||
                record.nombreIndicadorUvm.toLowerCase().includes(filter.toLowerCase()) ||
                record.nombreComponenteUvm.toLowerCase().includes(filter.toLowerCase());
        };
        this.data = [];
        this.filters = new TablePaginatorSearch();
        this.permissions = [false, false, false];

    }

    ngOnInit(): void {
        this.setPermissions();
        this.getAllSubIndicatorsUvm(this.filters);
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
    paginatorChange(event: PageEvent): void {
        this.filters.pageSize = event.pageSize;
        this.filters.pageNumber = event.pageIndex + 1;
        this.dataSource.paginator = this.paginator;
    }

    search(term: string): void {
        this.dataSource.filter = term;
        this.filters.pageNumber = 0;
        this.dataSource.paginator = this.paginator;
    }

    openSubIndicatorUvmRecord(): void {
        this.subIndicatorUvmRecordService
            .open()
            .afterClosed()
            .subscribe(() => {
                this.getAllSubIndicatorsUvm(this.filters);
            });
    }

    editSubIndicatorUvmRecord(subIndicatorUvm: SubIndicadorUVMDTOV1): void {
        this.subIndicatorUvmRecordService
            .open({ data: subIndicatorUvm })
            .afterClosed()
            .subscribe(() => {
                this.getAllSubIndicatorsUvm(this.filters);
            });
    }

    deleteSubIndicadorUvmByConfimation(subIndicador: SubIndicadorUVMDTOV1): void {
        Alert.confirm('Eliminar subindicador uvm', `¿Deseas eliminar el componente?`).subscribe((result) => {
            if (!result || !result.isConfirmed) {
                return;
            }
            this.deleteIndicatorUvm(subIndicador);
        });
    }

    getAllSubIndicatorsExcel(): void {
        /* this.subindicatorUvmService.getAllSubIndicatorUvmExcel(this.filters).subscribe((response) => {
          if (response.success) {
            convertByteArrayToBlob(response.data, response.mime, response.name);
          }
        }); */
        const url = this.subindicatorUvmService.getUrlAllSubIndicatorUvmExcel();
        window.open(url, '_blank');
    }

    private getAllSubIndicatorsUvm(filter: TablePaginatorSearch) {
        this.dataSource.data = [];
        this.data = [];
        filter.inactives = true;
        this.subindicatorUvmService.getAllSubIndicatorsUvm(filter).subscribe((response) => {
            if (response.output) {
                this.data = response.output.map((subindicador) => new SubIndicadorUVMDTOV1().deserialize(subindicador));
                this.dataSource.data = this.data;
                this.dataSource.paginator = this.paginator;
            }
        });
    }

    private deleteIndicatorUvm(subIndicador: SubIndicadorUVMDTOV1): void {
        this.subindicatorUvmService.deleteSubIndicatorUvm(subIndicador.id).subscribe(() => {
            this.filters.pageNumber = 1;
            this.paginator.firstPage();
            this.getAllSubIndicatorsUvm(this.filters);
            Alert.success('', 'Indicador uvm eliminado correctamente');
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
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_SUBINDICADOR_UVM);

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
