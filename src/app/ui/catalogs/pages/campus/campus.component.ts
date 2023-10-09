import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CampusService, LevelModalityService, UsersService } from 'src/app/core/services';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';
import { CampusDTO, CampusDTOV1, TablePaginatorSearch,Vista } from 'src/app/utils/models';
import { CampusRecordService } from './modals/campus-record/campus-record.service';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

@Component({
    selector: 'app-campus',
    templateUrl: './campus.component.html',
    styleUrls: ['./campus.component.scss'],
})
export class CampusComponent implements OnInit {
    @ViewChild('input', { static: true }) inputSearch: ElementRef;
    @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
    data: CampusDTOV1[];
    dataSource: MatTableDataSource<CampusDTOV1>;
    selection: SelectionModel<CampusDTOV1>;
    disabled: boolean;
    permission: boolean;
    filters: TablePaginatorSearch;
    thisAccess: Vista;
    permissions: boolean[];
    constructor(
        private readonly campusRecord: CampusRecordService,
        private readonly campus: CampusService,
        // private readonly levelModality: LevelModalityService,
        private users: UsersService
    ) {
        this.data = [];
        this.dataSource = new MatTableDataSource<CampusDTOV1>([]);
        this.dataSource.filterPredicate = function (record: CampusDTOV1, filter: string): boolean {
            return record.clave.toLowerCase().includes(filter.toLowerCase()) ||
                record.nombre.toLowerCase().includes(filter.toLowerCase()) ||
                record.region.toLowerCase().includes(filter.toLowerCase()) ||
                record.nivelModalidad.toLowerCase().includes(filter.toLowerCase());
        };
        this.selection = new SelectionModel<CampusDTOV1>(true);
        this.disabled = null;
        this.permission = null;
        this.filters = new TablePaginatorSearch();
        this.permissions = [false, false, false];
    }

    private fieldValue(field: any): string {
        return field ? field : '';
    }

    ngOnInit(): void {
        this.setPermissions();

        // this.levelModality.setAllLevelModality();
        this.getAllCampus(this.filters);

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

    editCampus(campus: CampusDTOV1): void {
        this.campusRecord
            .open({ data: campus })
            .afterClosed()
            .subscribe(() => this.getAllCampus(this.filters));
    }

    deleteCampusByConfimation(campus: CampusDTOV1): void {
        Alert.confirm('Eliminar campus', `¿Deseas eliminar el campus?`).subscribe((result) => {
            if (!result || !result.isConfirmed) {
                return;
            }
            this.deleteCampus(campus);
        });
    }

    openCampusRecord(): void {
        this.campusRecord
            .open()
            .afterClosed()
            .subscribe(() => this.getAllCampus(this.filters));
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

    getAllCampusExcel(): void {
        /*  this.campus.getAllCampusExcel(this.filters).subscribe((response) => {
           if (response.success) {
             convertByteArrayToBlob(response.data, response.mime, response.name);
           }
         }); */

        const url = this.campus.getUrlAllCampusExcel();
        window.open(url, '_blank');
    }

    private deleteCampus(campus: CampusDTOV1): void {
        this.campus.deleteCampus(campus.id).subscribe(() => {
            this.filters.pageNumber = 1;
            this.paginator.firstPage();
            this.getAllCampus(this.filters);
            Alert.success('', 'Campus eliminado correctamente');
        });
    }

    private getAllCampus(filters: TablePaginatorSearch): void {
        this.dataSource.data = [];
        this.data = [];
        filters.inactives = true;
        this.campus.getAllCampus(filters).subscribe((response) => {
            if (response.output) {
                this.data = response.output.map((campus) => new CampusDTOV1().deserialize(campus));
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
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_CAMPUS);

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
