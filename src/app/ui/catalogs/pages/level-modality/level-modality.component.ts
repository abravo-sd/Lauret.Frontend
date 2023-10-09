import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { LevelModalityService, UsersService } from 'src/app/core/services';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';
import { NivelModalidadDTO, NivelModalidadDTOV1, TablePaginatorSearch,Vista } from 'src/app/utils/models';
import { LevelModalityRecordService } from './modals';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

@Component({
    selector: 'app-level-modality',
    templateUrl: './level-modality.component.html',
    styleUrls: ['./level-modality.component.scss'],
})
export class LevelModalityComponent implements OnInit {
    @ViewChild('input', { static: true }) inputSearch: ElementRef;
    @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
    data: NivelModalidadDTOV1[];
    dataSource: MatTableDataSource<NivelModalidadDTOV1>;
    selection: SelectionModel<NivelModalidadDTOV1>;
    disabled: boolean;
    permission: boolean;
    filters: TablePaginatorSearch;
    thisAccess: Vista;
    permissions: boolean[];
    constructor(
        private readonly levelModalityRecord: LevelModalityRecordService,
        private readonly levelModality: LevelModalityService,
        private users: UsersService
    ) {
        this.data = [];
        this.dataSource = new MatTableDataSource<NivelModalidadDTOV1>([]);
        this.dataSource.filterPredicate = function (record: NivelModalidadDTOV1, filter: string): boolean {
            return record.clave.toLowerCase().includes(filter.toLowerCase()) ||
                record.nivel.toLowerCase().includes(filter.toLowerCase()) ||
                record.modalidad.toLowerCase().includes(filter.toLowerCase()) ||
                record.getLevelModality().toLowerCase().includes(filter.toLowerCase());
        };
        this.selection = new SelectionModel<NivelModalidadDTOV1>(true);
        this.disabled = null;
        this.permission = null;
        this.filters = new TablePaginatorSearch();
        this.permissions = [false, false, false];
    }

    ngOnInit(): void {
        this.setPermissions();
        this.getAllLevelModality(this.filters);
     
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

    editLevelModality(levelModality: NivelModalidadDTOV1): void {
        this.levelModalityRecord
            .open({ data: levelModality })
            .afterClosed()
            .subscribe(() => this.getAllLevelModality(this.filters));
    }

    deleteLevelModalityByConfimation(levelModality: NivelModalidadDTOV1): void {
        Alert.confirm('Eliminar Nivel/Modalidad', `¿Deseas eliminar el Nivel/Modalidad?`).subscribe((result) => {
            if (!result || !result.isConfirmed) {
                return;
            }
            this.deleteLevelModality(levelModality);
        });
    }

    openLevelModalityRecord(): void {
        this.levelModalityRecord
            .open()
            .afterClosed()
            .subscribe(() => this.getAllLevelModality(this.filters));
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

    getAllLevelModalityExcel(): void {
        /* this.levelModality.getAllLevelModalityExcel(this.filters).subscribe((response) => {
          if (response.success) {
            convertByteArrayToBlob(response.data, response.mime, response.name);
          }
        }); */
        const url = this.levelModality.getUrlAllLevelModalityExcel();
        window.open(url, '_blank');
    }

    private deleteLevelModality(levelModality: NivelModalidadDTOV1): void {
        this.levelModality.deleteLevelModality(levelModality.id).subscribe(() => {
            this.filters.pageNumber = 1;
            this.paginator.firstPage();
            this.getAllLevelModality(this.filters);
            Alert.success('', 'Nivel/Modalidad eliminado correctamente');
        });
    }

    private getAllLevelModality(filters: TablePaginatorSearch): void {
        this.dataSource.data = [];
        this.data = [];
        filters.inactives = true;
        this.levelModality.getAllLevelModality(filters).subscribe((response) => {
            if (response.output) {
                this.data = response.output.map((levelModality) => new NivelModalidadDTOV1().deserialize(levelModality));
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
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_REGIONES);

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
