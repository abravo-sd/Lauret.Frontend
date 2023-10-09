import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ProfileService, UsersService } from 'src/app/core/services';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';
import { Perfil, PerfilDTO, PerfilDTOV1, TablePaginatorSearch } from 'src/app/utils/models';
import { ProfileRecordService } from './modals';

@Component({
    selector: 'app-profiles',
    templateUrl: './profiles.component.html',
    styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent implements OnInit {
    @ViewChild('input', { static: true }) inputSearch: ElementRef;
    @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
    data: PerfilDTOV1[];
    dataSource: MatTableDataSource<PerfilDTOV1>;
    selection: SelectionModel<PerfilDTOV1>;
    disabled: boolean;
    permission: boolean;
    filters: TablePaginatorSearch;
    constructor(
        private readonly profileRecord: ProfileRecordService,
        private readonly profile: ProfileService,
        private users: UsersService
    ) {
        this.data = [];
        this.dataSource = new MatTableDataSource<PerfilDTOV1>([]);
        this.dataSource.filterPredicate = function (record: PerfilDTOV1, filter: string): boolean {
            return record.clave.toLowerCase().includes(filter.toLowerCase()) ||
                record.nombre.toLowerCase().includes(filter.toLowerCase());
        };
        this.selection = new SelectionModel<PerfilDTOV1>(true);
        this.disabled = null;
        this.permission = null;
        this.filters = new TablePaginatorSearch();
    }

    ngOnInit(): void {
        this.getAllProfiles(this.filters);

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

    editProfile(perfil: PerfilDTOV1): void {
        this.profileRecord
            .open({ data: perfil })
            .afterClosed()
            .subscribe(() => this.getAllProfiles(this.filters));
    }

    deleteProfileByConfimation(perfil: PerfilDTOV1): void {
        Alert.confirm('Eliminar perfil', `¿Deseas eliminar el perfil?`).subscribe((result) => {
            if (!result || !result.isConfirmed) {
                return;
            }
            this.deletePorifle(perfil);
        });
    }

    openProfileRecord(): void {
        this.profileRecord
            .open()
            .afterClosed()
            .subscribe(() => this.getAllProfiles(this.filters));
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

    getAllProfilesExcel(): void {
        /* this.profile.getAllProfilesExcel(this.filters).subscribe((response) => {
          if (response.success) {
            convertByteArrayToBlob(response.data, response.mime, response.name);
          }
        }); */
        const url = this.profile.getUrlAllProfilesExcel();
        window.open(url, '_blank');
    }

    private deletePorifle(perfil: PerfilDTOV1): void {
        this.profile.deleteProfile(perfil.id).subscribe(() => {
            this.filters.pageNumber = 1;
            this.paginator.firstPage();
            this.getAllProfiles(this.filters);
            Alert.success('', 'Perfil eliminado correctamente');
        });
    }

    private getAllProfiles(filters: TablePaginatorSearch): void {
        this.dataSource.data = [];
        this.data = [];
        filters.inactives = true;
        this.profile.getAllProfiles(filters).subscribe((response) => {
            if (response.output) {
                this.data = response.output.map((perfil) => new PerfilDTOV1().deserialize(perfil));
                this.dataSource.data = this.data;
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
}
