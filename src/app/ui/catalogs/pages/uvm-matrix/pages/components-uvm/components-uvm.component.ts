import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ComponentUvmService, UsersService } from 'src/app/core/services';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';
import { ComponenteDTO, ComponenteUVMDTO, ComponenteUVMDTOV1, TablePaginatorSearch,Vista } from 'src/app/utils/models';
import { ComponentUvmRecordService } from './modals';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

@Component({
    selector: 'app-components-uvm',
    templateUrl: './components-uvm.component.html',
    styleUrls: ['./components-uvm.component.scss'],
})
export class ComponentsUvmComponent implements OnInit {
    @ViewChild('input', { static: true }) inputSearch: ElementRef;
    @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
    selection: SelectionModel<ComponenteUVMDTOV1>;
    disabled: boolean;
    dataSource: MatTableDataSource<ComponenteUVMDTOV1>;
    filters: TablePaginatorSearch;
    data: ComponenteUVMDTOV1[];
    thisAccess: Vista;
    permissions: boolean[];
    constructor(
        private readonly componentUvmRecordService: ComponentUvmRecordService,
        private readonly componentUvmService: ComponentUvmService,
        private users: UsersService
    ) {
        this.dataSource = new MatTableDataSource<ComponenteUVMDTOV1>([]);
        this.dataSource.filterPredicate = function (record: ComponenteUVMDTOV1, filter: string): boolean {
            return record.nombreComponenteUvm.toLowerCase().includes(filter.toLowerCase()) ||
                record.descripcionComponenteUvm.toLowerCase().includes(filter.toLowerCase());
        };
        this.data = [];
        this.filters = new TablePaginatorSearch();
        this.permissions = [false, false, false];
    }

    ngOnInit(): void {
        this.setPermissions();
        this.getAllComponentsUvm(this.filters);
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

    openComponentUvmRecord(): void {
        this.componentUvmRecordService
            .open()
            .afterClosed()
            .subscribe(() => {
                this.getAllComponentsUvm(this.filters);
            });
    }

    editComponentUvmRecord(componente: ComponenteUVMDTOV1): void {
        this.componentUvmRecordService
            .open({ data: componente })
            .afterClosed()
            .subscribe(() => this.getAllComponentsUvm(this.filters));
    }

    deleteComponentUvmByConfimation(componente: ComponenteUVMDTOV1): void {
        Alert.confirm('Eliminar componente uvm', `¿Deseas eliminar el componente?`).subscribe((result) => {
            if (!result || !result.isConfirmed) {
                return;
            }
            this.deleteComponentUvm(componente);
        });
    }

    getAllCompononentUvmExcel(): void {
        /*     this.componentUvmService.getAllComponentUvmExcel(this.filters).subscribe((response) => {
              if (response.success) {
                convertByteArrayToBlob(response.data, response.mime, response.name);
              }
            }); */

        const url = this.componentUvmService.getUrlAllComponentUvmExcel();
        window.open(url, '_blank');
    }

    private getAllComponentsUvm(filter: TablePaginatorSearch): void {
        this.dataSource.data = [];
        this.data = [];
        filter.inactives = true;
        this.componentUvmService.getAllComponentsUvm(filter).subscribe((response) => {
            if (response.output) {
                this.data = response.output.map((componente) => new ComponenteUVMDTOV1().deserialize(componente));
                this.dataSource.data = this.data;
                this.dataSource.paginator = this.paginator;
            }
        });
    }

    private deleteComponentUvm(componente: ComponenteUVMDTOV1): void {
        this.componentUvmService.deleteComponentUvm(componente.id).subscribe(() => {
            this.filters.pageNumber = 1;
            this.paginator.firstPage();
            this.getAllComponentsUvm(this.filters);
            Alert.success('', 'Compponente uvm eliminado correctamente');
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
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_COMPONENT_UVM);

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
