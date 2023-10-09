import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/core/services';
import { MeasurementScaleService } from 'src/app/core/services/api/measurement-scale/measurement-scale.service';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';
import { EscalaMedicionDTO, EscalaMedicionDTOV1, EscalaMedicionCondicionesDTO, TablePaginatorSearch } from 'src/app/utils/models';
import { MeasurementScaleRecordService } from './modals/measurement-scale-record/measurement-scale-record.service';

@Component({
    selector: 'app-measurement-scale',
    templateUrl: './measurement-scale.component.html',
    styleUrls: ['./measurement-scale.component.scss'],
})
export class MeasurementScaleComponent implements OnInit {
    @ViewChild('input', { static: true }) inputSearch: ElementRef;
    @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
    data: any[];
    dataSource: MatTableDataSource<any>;
    selection: SelectionModel<any>;
    disabled: boolean;
    permission: boolean;
    filters: TablePaginatorSearch;
    constructor(
        private measurementScaleService: MeasurementScaleService,
        private measurementScaleRecordService: MeasurementScaleRecordService,
        private users: UsersService
    ) {
        this.data = [];
        this.dataSource = new MatTableDataSource<any>([]);
        this.selection = new SelectionModel<any>(true);
        this.disabled = null;
        this.permission = null;
        this.filters = new TablePaginatorSearch();
    }
    ngOnInit(): void {
        this.getAllMeasurementScale(this.filters);
        this.paginator.pageSize = this.paginator.pageSizeOptions[1];
        this.paginator.pageIndex = 0;
    }

    openMeasurementScaleRecord(): void {
        this.measurementScaleRecordService
            .open()
            .afterClosed()
            .subscribe(() => { this.getAllMeasurementScale(this.filters) });
    }

    editMeasurementScaleRecord(escalaMedicion: EscalaMedicionDTOV1): void {
        this.measurementScaleRecordService
            .open({ data: escalaMedicion })
            .afterClosed()
            .subscribe(() => this.getAllMeasurementScale(this.filters) );
    }

    deleteMeasurementScaleByConfimation(escalaMedicion: EscalaMedicionDTOV1): void {
        Alert.confirm('Eliminar la escala de medición', `¿Deseas eliminar la escala de medición?`).subscribe((result) => {
            if (!result || !result.isConfirmed) {
                return;
            }
            this.MeasurementScale(escalaMedicion);
        });
    }

    getAllIMeasurementScaleExcel(): void {
        this.measurementScaleService.getAllMeasurementScaleExcel(this.filters).subscribe((response) => {
            if (response.success) {
                convertByteArrayToBlob(response.data, response.mime, response.name);
            }
        });
    }

    private getAllMeasurementScale(filters: TablePaginatorSearch): void {
        this.dataSource.data = [];
        this.data = [];
        filters.inactives = true;
        this.measurementScaleService.getAllMeasurementScale(filters).subscribe((response) => {
            if (response.output) {
                // console.log(response.data.data);
                this.data = response.output.map((campus) => new EscalaMedicionDTOV1().deserialize(campus));
                this.dataSource.data = this.data;
                this.dataSource.paginator = this.paginator;
            }
        });
    }

    private MeasurementScale(escalaMedicion: EscalaMedicionDTOV1): void {
        this.measurementScaleService.deleteMeasurementScale(escalaMedicion.id).subscribe(() => {
            this.filters.pageNumber = 1;
            this.paginator.firstPage();
            this.getAllMeasurementScale(this.filters);
            Alert.success('', 'Escala de medición eliminada correctamente');
        });
    }

    paginatorChange(event: PageEvent): void {
        this.filters.pageSize = event.pageSize;
        this.filters.pageNumber = event.pageIndex + 1;
        this.dataSource.paginator = this.paginator;
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
