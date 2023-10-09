import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { SitesService, UsersService } from 'src/app/core/services';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';
import { SedeDTO, SedeDTOV1, TablePaginatorSearch } from 'src/app/utils/models';
import { SiteRecordService } from './modals';

@Component({
    selector: 'app-sites',
    templateUrl: './sites.component.html',
    styleUrls: ['./sites.component.scss'],
})
export class SitesComponent implements OnInit {
    @ViewChild('input', { static: true })
    inputSearch: ElementRef;
    @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
    data: SedeDTOV1[];
    dataSource: MatTableDataSource<SedeDTOV1>;
    selection: SelectionModel<SedeDTOV1>;
    disabled: boolean;
    permission: boolean;
    filters: TablePaginatorSearch;

    constructor(
        private readonly siteRecord: SiteRecordService,
        private readonly sites: SitesService,
        private users: UsersService
    ) {
        this.data = [];
        this.dataSource = new MatTableDataSource<SedeDTOV1>([]);
        this.dataSource.filterPredicate = function (record: SedeDTOV1, filter: string): boolean {
            return record.clave.toLowerCase().includes(filter.toLowerCase()) ||
                record.nombre.toLowerCase().includes(filter.toLowerCase());
        };
        this.selection = new SelectionModel<SedeDTOV1>(true);
        this.disabled = null;
        this.permission = null;
        this.filters = new TablePaginatorSearch();
    }

    ngOnInit(): void {
        this.getAllSite(this.filters);
        this.checkPermission();
        // fromEvent(this.inputSearch.nativeElement, 'keyup')
        //   .pipe(
        //     map((event: any) => event.target.value),
        //     debounceTime(1000),
        //     distinctUntilChanged()
        //   )
        //   .subscribe((text: string) => this.search(text));
        this.paginator.pageSize = this.paginator.pageSizeOptions[1];
        this.paginator.pageIndex = 0;
    }

    editSite(site: SedeDTOV1): void {
        this.siteRecord
            .open({ data: site })
            .afterClosed()
            .subscribe(() => this.getAllSite(this.filters));
    }

    deleteSiteByConfimation(site: SedeDTOV1): void {
        Alert.confirm('Eliminar sede', `¿Deseas eliminar la sede?`).subscribe((result) => {
            if (!result || !result.isConfirmed) {
                return;
            }
            this.deleteSite(site);
        });
    }

    openSiteRecord(): void {
        this.siteRecord
            .open()
            .afterClosed()
            .subscribe(() => this.getAllSite(this.filters));
    }

    openRecord(element?: SedeDTOV1): void {
        /* const form = this.criteriaForm.value;
    
        filters.acreditadoraProcesoId = form.process;
        filters.carreraId = form.career;
        filters.processId = form.process; */
        const data = {
            data: element ? element : null,
        };

        this.siteRecord
            .open(data)
            .afterClosed()
            .subscribe((response) => {
                if (response) {
                    this.getAllSite(this.filters);
                }
            });
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

    getAllSitesExcel(): void {
        /* this.sites.getAllSitesExcel(this.filters).subscribe((response) => {
          if (response.success) {
            convertByteArrayToBlob(response.data, response.mime, response.name);
          }
        }); */

        const url = this.sites.getUrlAllSitesExcel();
        window.open(url, '_blank');
    }

    private deleteSite(site: SedeDTOV1): void {
        this.sites.deleteSite(site.id).subscribe(() => {
            Alert.success('', 'Sede eliminada correctamente');
            this.filters.pageNumber = 1;
            this.paginator.firstPage();
            this.getAllSite(this.filters);
        });
    }

    private getAllSite(filters: TablePaginatorSearch): void {
        this.dataSource.data = [];
        this.data = [];
        filters.inactives = true;
        this.sites.getAllSites(filters).subscribe((response) => {
            if (response.output) {
                this.data = response.output.map((sites) => new SedeDTOV1().deserialize(sites));
                this.dataSource.data = this.data;
                this.dataSource.paginator = this.paginator;
            }
        });
    }

    private checkPermission(): void {
        // this.permission = this.users.checkPermission(Modules.REGION, true);
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
