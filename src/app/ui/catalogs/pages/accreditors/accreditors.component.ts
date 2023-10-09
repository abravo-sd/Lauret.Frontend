import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AccreditorsService } from 'src/app/core/services';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';
import { AcreditadoraDTO, AcreditadoraDTOV1, TablePaginatorSearch } from 'src/app/utils/models';
import { AccreditorRecordService } from './modals';

@Component({
    selector: 'app-accreditors',
    templateUrl: './accreditors.component.html',
    styleUrls: ['./accreditors.component.scss'],
})
export class AccreditorsComponent implements OnInit {
    @ViewChild('input', { static: true }) inputSearch: ElementRef;
    @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;

    dataSource: MatTableDataSource<AcreditadoraDTOV1>;
    filters: TablePaginatorSearch;

    constructor(
        private readonly accreditorRecord: AccreditorRecordService,
        private readonly accreditors: AccreditorsService
    ) {
        this.dataSource = new MatTableDataSource<AcreditadoraDTOV1>([]);
        this.dataSource.filterPredicate = function(data: AcreditadoraDTOV1, filter: string): boolean {
            return data.acreditadoraId.toLowerCase().includes(filter.toLowerCase()) ||
                    data.nombre.toLowerCase().includes(filter.toLowerCase());
        };
        this.filters = new TablePaginatorSearch();
    }

    ngOnInit(): void {
        this.getAllAccreditors(this.filters);
        // fromEvent(this.inputSearch.nativeElement, 'keyup')
        //   .pipe(
        //     map((event: any) => event.target.value),
        //     debounceTime(1000),
        //     distinctUntilChanged()

        //   )

        //   .subscribe((text: string) => {
        //     console.log("buscando en la tabla oninit......");
        //     this.search(text);
        //   });
        this.paginator.pageSize = this.paginator.pageSizeOptions[1];
        this.paginator.pageIndex = 0;
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
        console.log("buscando en la tabla search......");

    }

    openAccreditorRecord(accreditor: AcreditadoraDTOV1): void {
        this.accreditorRecord
            .open({ data: accreditor })
            .afterClosed()
            .subscribe((response) => {
                if (response) {
                    this.getAllAccreditors(this.filters);
                }
            });
    }

    deleteAccreditor(accreditorId: string): void {
        Alert.confirm('Eliminar acreditadora', '¿Deseas eliminar esta acreditadora?').subscribe((result) => {
            if (!result || !result.isConfirmed) {
                return;
            }
            this.accreditors.deleteAccreditor(accreditorId).subscribe((response) => {
                if (response.exito) {
                    Alert.success('', 'Acreditadora eliminada correctamente');
                    this.filters.pageNumber = 1;
                    this.paginator.firstPage();
                    this.getAllAccreditors(this.filters);
                }
            });
        });
    }

    getAllAccreditorsExcel(): void {
        /* this.accreditors.getAllAccreditorsExcel(this.filters).subscribe((response) => {
          if (response.success) {
            convertByteArrayToBlob(response.data, response.mime, response.name);
          }
        }); */
        const url = this.accreditors.getUrlAllAccreditorsExcel();
        window.open(url, '_blank');

    }

    private getAllAccreditors(filters: TablePaginatorSearch): void {
        this.dataSource.data = [];
        filters.inactives = true;

        this.accreditors.getAllAccreditors(filters).subscribe((response) => {
            if (response.output) {
                const data = response.output.map((accreditor) => new AcreditadoraDTOV1().deserialize(accreditor));
                this.dataSource.data = data;
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
