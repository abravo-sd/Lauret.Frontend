import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ComponentsService, UsersService } from 'src/app/core/services';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';
import { ComponenteDTO, ComponenteDTOV1, TablePaginatorSearch,Vista } from 'src/app/utils/models';
import { ComponentsRecordService } from './modals/component-record/component-record.service';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styleUrls: ['./components.component.scss'],
})
export class ComponentsComponent implements OnInit {
    @ViewChild('input', { static: true }) inputSearch: ElementRef;
    @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
    data: ComponenteDTOV1[];
    dataSource: MatTableDataSource<ComponenteDTOV1>;
    selection: SelectionModel<ComponenteDTOV1>;
    disabled: boolean;
    permission: boolean;
    filters: TablePaginatorSearch;
    thisAccess: Vista;
    permissions: boolean[];
    constructor(
        private readonly componentRecord: ComponentsRecordService,
        private readonly components: ComponentsService,
        private users: UsersService
    ) {
        this.data = [];
        this.dataSource = new MatTableDataSource<ComponenteDTOV1>([]);
        this.dataSource.filterPredicate = function (record: ComponenteDTOV1, filter: string): boolean {
            return record.clave.toLowerCase().includes(filter.toLowerCase()) ||
                record.nombre.toLowerCase().includes(filter.toLowerCase());
        };
        this.selection = new SelectionModel<ComponenteDTOV1>(true);
        this.disabled = null;
        this.permission = null;
        this.filters = new TablePaginatorSearch();
        this.permissions = [false, false, false];
    }

    ngOnInit(): void {
        this.setPermissions();
        this.getAllComponents(this.filters);
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

    openComponentRecord(): void {
        this.componentRecord
            .open()
            .afterClosed()
            .subscribe(() => this.getAllComponents(this.filters));
    }

    editComponent(componente: ComponenteDTOV1): void {
        this.componentRecord
            .open({ data: componente })
            .afterClosed()
            .subscribe(() => this.getAllComponents(this.filters));
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
    closeComponentsRecord(): void {
        this.componentRecord.open().afterClosed();
    }

    private getAllComponents(filter: TablePaginatorSearch) {
        this.dataSource.data = [];
        this.data = [];
        filter.inactives = true;
        this.components.getAllComponents(filter).subscribe((response) => {
            if (response.output) {
                this.data = response.output.map((componente) => new ComponenteDTOV1().deserialize(componente));
                this.dataSource.data = this.data;
                this.dataSource.paginator = this.paginator;
            }
        });
    }

    deleteComponentByConfimation(components: ComponenteDTOV1): void {
        Alert.confirm('Eliminar componente', `¿Deseas eliminar el componente?`).subscribe((result) => {
            if (!result || !result.isConfirmed) {
                return;
            }
            this.deleteComponent(components);
        });
    }

    private deleteComponent(component: ComponenteDTOV1): void {
        this.components.deleteComponent(component.id).subscribe(() => {
            this.filters.pageNumber = 1;
            this.paginator.firstPage();
            this.getAllComponents(this.filters);
            Alert.success('', 'Componente eliminado correctamente');
        });
    }

    getAllComponentsExcel(): void {
        /*  this.components.getAllComponentsExcel(this.filters).subscribe((response) => {
                if (response.success) {
                    convertByteArrayToBlob(response.data, response.mime, response.name);
                }
            }); */

        const url = this.components.getUrlAllComponentsExcel();
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
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_COMPONENTE);

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
