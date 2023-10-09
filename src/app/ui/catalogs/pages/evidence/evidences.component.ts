import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { EvidencesCatalogService, LevelModalityService, UsersService } from 'src/app/core/services';
import { Alert, convertByteArrayToBlob, setDataPaginator } from 'src/app/utils/helpers';
import { EvidenceDTO, TablePaginatorSearch, Vista } from 'src/app/utils/models';
import { EvidenceRecordService } from './modals';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

@Component({
    selector: 'app-evidences',
    templateUrl: './evidences.component.html',
    styleUrls: ['./evidences.component.scss'],
})
export class EvidencesComponent implements OnInit {
    @ViewChild('input', { static: true }) inputSearch: ElementRef;
    @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
    data: EvidenceDTO[];
    dataSource: MatTableDataSource<EvidenceDTO>;
    selection: SelectionModel<EvidenceDTO>;
    disabled: boolean;
    permission: boolean;
    filters: TablePaginatorSearch;
    thisAccess: Vista;
    permissions: boolean[];
    constructor(
        private readonly evidenceRecord: EvidenceRecordService,
        private readonly evidences: EvidencesCatalogService,
        private users: UsersService
    ) {
        this.data = [];
        this.dataSource = new MatTableDataSource<EvidenceDTO>([]);
        this.selection = new SelectionModel<EvidenceDTO>(true);
        this.disabled = null;
        this.permission = null;
        this.filters = new TablePaginatorSearch();
        this.permissions = [false, false, false];
    }

    ngOnInit(): void {
        this.setPermissions();
        this.getAllEvidences(this.filters);
        this.paginator.pageSize = this.paginator.pageSizeOptions[1];
        this.paginator.pageIndex = 0;
    }

    editEvidence(evidence: EvidenceDTO): void {
        this.evidenceRecord
            .open({ data: evidence })
            .afterClosed()
            .subscribe((result) => {
                this.getAllEvidences(this.filters);
            });
    }

    deleteEvidenceByConfimation(region: EvidenceDTO): void {
        Alert.confirm('Eliminar la evidencia', `¿Deseas eliminar la evidencia?`).subscribe((result) => {
            if (!result || !result.isConfirmed) {
                return;
            }
            this.deleteEvidence(region);
        });
    }

    openEvidenceRecord(): void {
        this.evidenceRecord
            .open()
            .afterClosed()
            .subscribe(() => this.getAllEvidences(this.filters));
    }

    search(term: string): void {
        this.dataSource.filter = term;
        this.paginator.pageIndex = 0;
        this.dataSource.paginator = this.paginator;
    }

    paginatorChange(event: PageEvent): void {
        this.filters.pageSize = event.pageSize;
        this.filters.pageNumber = event.pageIndex + 1;
        this.dataSource.paginator = this.paginator;
    }

    getAllRegionsExcel(): void {
        const url = this.evidences.getUrlAllEvidencesExcel();
        window.open(url, '_blank');
    }

    private deleteEvidence(evidence: EvidenceDTO): void {
        this.evidences.deleteEvidence(evidence.id).subscribe(() => {
            Alert.success('', 'Evidencia eliminada correctamente');
            this.filters.pageNumber = 1;
            this.paginator.firstPage();
            this.getAllEvidences(this.filters);
        });
    }

    private getAllEvidences(filters: TablePaginatorSearch): void {
        this.dataSource.data = [];
        this.data = [];
        filters.inactives = true;

        this.evidences.getAllEvidence(filters).subscribe((response) => {
            if (response.output) {
                this.data = response.output.map((evidence) => new EvidenceDTO().deserialize(evidence));
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
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_EVIDENCE);

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
