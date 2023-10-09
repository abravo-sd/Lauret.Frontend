import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UsersService } from 'src/app/core/services';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';
import {
    CatalogoUsuarioDTO,
    CatalogoUsuarioDTOV1,
    TablePaginatorSearch,
    UsuarioDTO,
    UsuarioDTOV1,
    Vista,
} from 'src/app/utils/models';
import { UserRecordService } from './modals/user-record/user-record.service';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
    @ViewChild('input', { static: true }) inputSearch: ElementRef;
    @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
    data: CatalogoUsuarioDTOV1[];
    dataSource: MatTableDataSource<CatalogoUsuarioDTOV1>;
    selection: SelectionModel<CatalogoUsuarioDTOV1>;
    disabled: boolean;
    permission: boolean;
    filters: TablePaginatorSearch;
    thisAccess: Vista;
    permissions: boolean[];
    constructor(private readonly userRecord: UserRecordService, private readonly users: UsersService) {
        this.data = [];
        this.dataSource = new MatTableDataSource<CatalogoUsuarioDTOV1>([]);
        this.dataSource.filterPredicate = function (record: CatalogoUsuarioDTOV1, filter: string): boolean {
            return record.nombre.toLowerCase().includes(filter.toLowerCase()) ||
                record.apellidos.toLowerCase().includes(filter.toLowerCase()) ||
                record.correo.toLowerCase().includes(filter.toLowerCase()) ||
                record.perfil.toLowerCase().includes(filter.toLowerCase()) ||
                record.getCampusesListString().toLowerCase().includes(filter.toLowerCase()) ||
                record.getAreaResponsablesListString().toLowerCase().includes(filter.toLowerCase());
        };
        this.selection = new SelectionModel<CatalogoUsuarioDTOV1>(true);
        this.disabled = null;
        this.permission = null;
        this.filters = new TablePaginatorSearch();
        this.permissions = [false, false, false];
    }

    ngOnInit(): void {
        this.setPermissions();
        this.getAllUsers(this.filters);
    
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

    editUser(user: CatalogoUsuarioDTOV1): void {
        this.userRecord
            .open({ data: user })
            .afterClosed()
            .subscribe(() => this.getAllUsers(this.filters));
    }

    deleteUserByConfimation(user: UsuarioDTOV1): void {
        Alert.confirm('Eliminar usuario', `¿Deseas eliminar el usuario?`).subscribe((result) => {
            if (!result || !result.isConfirmed) {
                return;
            }
            this.deleteUser(user);
        });
    }

    openUserRecord(): void {
        this.userRecord
            .open()
            .afterClosed()
            .subscribe(() => this.getAllUsers(this.filters));
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

    getAllUsersExcel(): void {
        /*     this.users.getAllUsersExcel(this.filters).subscribe((response) => {
              if (response.success) {
                convertByteArrayToBlob(response.data, response.mime, response.name);
              }
            }); */

        const url = this.users.getUrlAllUsersExcel();
        window.open(url, '_blank');
    }

    private deleteUser(user: UsuarioDTOV1): void {
        this.users.deleteUser(user.idUsuario).subscribe(() => {
            Alert.success('', 'Usuario eliminado correctamente');
            this.filters.pageNumber = 1;
            this.paginator.firstPage();
            this.getAllUsers(this.filters);
        });
    }

    private getAllUsers(filters: TablePaginatorSearch): void {
        this.dataSource.data = [];
        this.data = [];
        filters.inactives = true;
        this.users.getAllUsers(filters).subscribe((response) => {
            if (response.output) {
                this.data = response.output.map((user) => new CatalogoUsuarioDTOV1().deserialize(user));
                this.dataSource.data = this.data;
                this.dataSource.paginator = this.paginator;
            }
        });
    }

    private setPermissions(): void {
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_USUARIO_SIAC);

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
}
