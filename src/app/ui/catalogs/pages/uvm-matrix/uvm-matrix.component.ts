import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UvmMatrixService } from 'src/app/core/services/api/uvm-matrix/uvm-matrix.service';
import { TablePaginatorSearch, ComponenteUVMDTO, MatrizUvmDTO, MatrizUvmDTOV1 } from 'src/app/utils/models';
import { MatrixUvmData, UvmMatrixRecordService } from './modals/uvm-matrix-record/uvm-matrix-record.service';
import { ComponentUvmRecordService } from './pages/components-uvm/modals';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';

@Component({
    selector: 'app-uvm-matrix',
    templateUrl: './uvm-matrix.component.html',
    styleUrls: ['./uvm-matrix.component.scss'],
})
export class UvmMatrixComponent implements OnInit {
    @ViewChild('input', { static: true }) inputSearch: ElementRef;
    @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
    dataSource: MatTableDataSource<MatrizUvmDTOV1>;
    filters: TablePaginatorSearch;
    disabled: boolean;
    permission: boolean;
    data: MatrizUvmDTOV1[];

    constructor(
        private readonly uvmMatrixRecordService: UvmMatrixRecordService,
        private readonly uvmMatrixService: UvmMatrixService
    ) {
        this.dataSource = new MatTableDataSource<MatrizUvmDTOV1>([]);
        this.data = [];
        this.disabled = null;
        this.permission = null;
        this.filters = new TablePaginatorSearch();
    }
    paginatorChange(event: PageEvent): void {
        this.filters.pageSize = event.pageSize;
        this.filters.pageNumber = event.pageIndex + 1;
        // this.getAllCampus(this.filters);
    }

    editMatrixUvmRecord(matrizUvm: MatrizUvmDTOV1): void {
        this.uvmMatrixRecordService
            .open({ data: matrizUvm })
            .afterClosed()
            .subscribe(() => this.getAllMatrixUvm(this.filters));
    }

    openMtrixUvmRecordServiceRecord(): void {
        this.uvmMatrixRecordService
            .open()
            .afterClosed()
            .subscribe(() => {
                this.getAllMatrixUvm(this.filters);
            });
    }
    ngOnInit(): void {
        this.getAllMatrixUvm(this.filters);
    }

    deleteMatrixUvmByConfimation(matrizUvm: MatrizUvmDTOV1): void {
        Alert.confirm('Eliminar matriz uvm', `¿Deseas eliminar la mtriz?`).subscribe((result) => {
            if (!result || !result.isConfirmed) {
                return;
            }
            this.deleteMatrixUvm(matrizUvm);
        });
    }

    getAllMatrixUvmExcel(): void {
        this.uvmMatrixService.getAllMatrizUvmExcell(this.filters).subscribe((response) => {
            if (response.success) {
                convertByteArrayToBlob(response.data, response.mime, response.name);
            }
        });
    }

    private getAllMatrixUvm(filters: TablePaginatorSearch): void {
        this.dataSource.data = [];
        this.data = [];
        filters.inactives = true;
        this.uvmMatrixService.getAllMatrizUvm(filters).subscribe((response) => {
            if (response.output) {
                this.data = response.output.map((campus) => new MatrizUvmDTOV1().deserialize(campus));
                this.dataSource.data = this.data;
                // setDataPaginator(this.paginator, response.data.totalCount);
                setDataPaginator(this.paginator, 20);
            }
        });
    }

    private deleteMatrixUvm(matrizUvm: MatrizUvmDTOV1): void {
        this.uvmMatrixService.deleteMatrizUvm(matrizUvm.id).subscribe(() => {
            this.filters.pageNumber = 1;
            this.paginator.firstPage();
            this.getAllMatrixUvm(this.filters);
            Alert.success('', 'Matriz uvm eliminado correctamente');
        });
    }
}
