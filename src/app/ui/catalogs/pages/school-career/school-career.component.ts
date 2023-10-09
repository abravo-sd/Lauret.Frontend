import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { SchoolCareerService, UsersService } from 'src/app/core/services';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';
import { CarreraDTO, CarreraDTOV1, TablePaginatorSearch } from 'src/app/utils/models';
import { SchoolCareerRecordService } from './modals';

@Component({
    selector: 'app-school-career',
    templateUrl: './school-career.component.html',
    styleUrls: ['./school-career.component.scss'],
})
export class SchoolCareerComponent implements OnInit {
    @ViewChild('input', { static: true }) inputSearch: ElementRef;
    @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
    data: CarreraDTOV1[];
    dataSource: MatTableDataSource<CarreraDTOV1>;
    selection: SelectionModel<CarreraDTOV1>;
    disabled: boolean;
    permission: boolean;
    filters: TablePaginatorSearch;

    constructor(
        private readonly schoolCareerRecord: SchoolCareerRecordService,
        private readonly schoolCareers: SchoolCareerService,
        private users: UsersService
    ) {
        this.data = [];
        this.dataSource = new MatTableDataSource<CarreraDTOV1>([]);
        this.selection = new SelectionModel<CarreraDTOV1>(true);
        this.disabled = null;
        this.permission = null;
        this.filters = new TablePaginatorSearch();
    }

    ngOnInit(): void {
        this.getAllCareers(this.filters);
        this.checkPermission();
        fromEvent(this.inputSearch.nativeElement, 'keyup')
            .pipe(
                map((event: any) => event.target.value),
                debounceTime(1000),
                distinctUntilChanged()
            )
            .subscribe((text: string) => {
                this.search(text);
            });
    }

    editCareer(career: CarreraDTO): void {
        this.schoolCareerRecord
            .open({ data: career })
            .afterClosed()
            .subscribe(() => this.getAllCareers(this.filters));
    }

    deleteCareerByConfimation(career: CarreraDTO): void {
        Alert.confirm('Eliminar carrera', `¿Deseas eliminar la carrera?`).subscribe((result) => {
            if (!result || !result.isConfirmed) {
                return;
            }
            this.deleteCareer(career);
        });
    }

    openCareerRecord(): void {
        this.schoolCareerRecord
            .open()
            .afterClosed()
            .subscribe(() => this.getAllCareers(this.filters));
    }

    search(term: string): void {
        this.dataSource.filter = term;
        this.filters.search = term;
        this.filters.pageNumber = 1;
        this.paginator.firstPage();
        this.getAllCareers(this.filters);
    }

    paginatorChange(event: PageEvent): void {
        this.filters.pageSize = event.pageSize;
        this.filters.pageNumber = event.pageIndex + 1;
        this.getAllCareers(this.filters);
    }

    getAllCareersExcel(): void {
        this.schoolCareers.getAllCareersExcel(this.filters).subscribe((response) => {
            if (response.success) {
                convertByteArrayToBlob(response.data, response.mime, response.name);
            }
        });
    }

    private deleteCareer(career: CarreraDTO): void {
        this.schoolCareers.deleteCareer(career.carreraId).subscribe(() => {
            Alert.success('', 'Carrera eliminada correctamente');
            this.filters.pageNumber = 1;
            this.paginator.firstPage();
            this.getAllCareers(this.filters);
        });
    }

    private getAllCareers(filters: TablePaginatorSearch): void {
        this.dataSource.data = [];
        this.data = [];
        filters.inactives = true;
        this.schoolCareers.getAllCareers(filters).subscribe((response) => {
            if (response.output) {
                this.data = response.output.map((career) => new CarreraDTOV1().deserialize(career));
                this.dataSource.data = this.data;
                // setDataPaginator(this.paginator, response.data.totalCount);
                setDataPaginator(this.paginator, 20);
            }
        });
    }

    private checkPermission(): void {
        // this.permission = this.users.checkPermission(Modules.REGION, true);
    }
}
