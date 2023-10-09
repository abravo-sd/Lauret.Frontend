import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ComponentsService, LevelModalityService, UsersService } from 'src/app/core/services';
import { WeightService } from 'src/app/core/services/api/weight/weight.service';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';
import { PonderacionDTO, PonderacionDTOV1, TablePaginatorSearch, Vista } from 'src/app/utils/models';
import { WeightRecordService } from './modals';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

@Component({
    selector: 'app-weights',
    templateUrl: './weights.component.html',
    styleUrls: ['./weights.component.scss'],
})
export class WeightsComponent implements OnInit {
    @ViewChild('input', { static: true }) inputSearch: ElementRef;
    @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
    data: PonderacionDTOV1[];
    dataSource: MatTableDataSource<PonderacionDTOV1>;
    selection: SelectionModel<PonderacionDTOV1>;
    disabled: boolean;
    permission: boolean;
    filters: TablePaginatorSearch;
    thisAccess: Vista;
    permissions: boolean[];
    constructor(
        private readonly ponderacionRecord: WeightRecordService,
        private readonly componente: ComponentsService,
        private readonly levelModality: LevelModalityService,
        private readonly weight: WeightService,
        private users: UsersService
    ) {
        this.data = [];
        this.dataSource = new MatTableDataSource<PonderacionDTOV1>([]);
        this.dataSource.filterPredicate = function (record: PonderacionDTOV1, filter: string): boolean {
            return record.nivelModalidad.toLowerCase().includes(filter.toLowerCase()) ||
                record.nombre.toLowerCase().includes(filter.toLowerCase()) ||
                record.puntuacion.toString().toLowerCase().includes(filter.toLowerCase());
        };
        this.selection = new SelectionModel<PonderacionDTOV1>(true);
        this.disabled = null;
        this.permission = null;
        this.filters = new TablePaginatorSearch();
        this.permissions = [false, false, false];
    }

    ngOnInit(): void {
        this.setPermissions();
        // this.levelModality.setAllLevelModality();
        this.getAllWeights(this.filters);

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

    search(term: string): void {
        this.dataSource.filter = term;
        this.filters.pageNumber = 0;
        this.dataSource.paginator = this.paginator;
    }

    editWeights(ponderacion: PonderacionDTOV1): void {
        this.ponderacionRecord
            .open({ data: ponderacion })
            .afterClosed()
            .subscribe(() => this.getAllWeights(this.filters));
    }

    deleteWeightByConfimation(ponderacion: PonderacionDTOV1): void {
        Alert.confirm('Eliminar ponderacion', `¿Deseas eliminar la ponderacion?`).subscribe((result) => {
            if (!result || !result.isConfirmed) {
                return;
            }
            this.deleteWeight(ponderacion);
        });
    }

    openWeightRecord(): void {
        this.ponderacionRecord
            .open()
            .afterClosed()
            .subscribe(() => this.getAllWeights(this.filters));
    }

    paginatorChange(event: PageEvent): void {
        this.filters.pageSize = event.pageSize;
        this.filters.pageNumber = event.pageIndex + 1;
        this.dataSource.paginator = this.paginator;
    }

    editWeight(ponderacion: PonderacionDTOV1): void {
        this.ponderacionRecord
            .open({ data: ponderacion })
            .afterClosed()
            .subscribe(() => this.getAllWeights(this.filters));
    }

    getAllWeightExcel(): void {
        /* this.weight.getAllWeightsExcel(this.filters).subscribe((response) => {
          if (response.success) {
            convertByteArrayToBlob(response.data, response.mime, response.name);
          }
        }); */

        const url = this.weight.getUrlAllWeightsExcel();
        window.open(url, '_blank');
    }

    private deleteWeight(ponderacion: PonderacionDTOV1): void {
        this.weight.deleteWeight(ponderacion.componenteId, ponderacion.idNivelModalidad).subscribe(() => {
            this.filters.pageNumber = 1;
            this.paginator.firstPage();
            this.getAllWeights(this.filters);
            Alert.success('', 'Ponderacion eliminad correctamente');
        });
    }

    private getAllWeights(filters: TablePaginatorSearch): void {
        this.dataSource.data = [];
        this.data = [];
        filters.inactives = true;
        this.weight.getAllWeights(filters).subscribe((response) => {
            if (response.output) {
                this.data = response.output.map((ponderacion) => new PonderacionDTOV1().deserialize(ponderacion));
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
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_PODERACION);

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
