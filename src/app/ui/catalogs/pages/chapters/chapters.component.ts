import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AccreditorsService, ChapterService } from 'src/app/core/services';
import { CopyProcessService } from 'src/app/features/copy-process';
import { CopyResultModalService } from 'src/app/features/copy-result-modal';
import { Alert, setDataPaginator } from 'src/app/utils/helpers';
import {
    AcreditadoraDTO,
    AcreditadoraDTOV1,
    AcreditadoraProcesoDTO,
    AcreditadoraProcesoDTOV1,
    CapituloDTO,
    CapituloDTOV1,
    CopiadoRequest,
    CopiadoResult,
    TablePaginatorSearch,
} from 'src/app/utils/models';
import { ChapterRecordService } from './modals/chapter-record/chapter-record.service';

@Component({
    selector: 'app-chapters',
    templateUrl: './chapters.component.html',
    styleUrls: ['./chapters.component.scss'],
})
export class ChaptersComponent implements OnInit {
    @ViewChild('input', { static: true }) inputSearch: ElementRef;
    @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;

    dataSource: MatTableDataSource<CapituloDTOV1>;
    filters: TablePaginatorSearch;
    chapterForm: FormGroup;

    accreditorList: AcreditadoraDTOV1[];
    processList: AcreditadoraProcesoDTOV1[];

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly copyProcess: CopyProcessService,
        private readonly chapterRecord: ChapterRecordService,
        private readonly accreditors: AccreditorsService,
        private readonly chapter: ChapterService,
        private readonly copyResultModalService: CopyResultModalService
    ) {
        this.chapterForm = this.formBuilder.group({
            accreditation: [null, [Validators.required]],
            process: [null, [Validators.required]],
        });
        this.filters = new TablePaginatorSearch();
        this.dataSource = new MatTableDataSource<CapituloDTOV1>([]);
        this.accreditorList = [];
        this.processList = [];
    }

    ngOnInit(): void {
        Promise.all([this.accreditors.setAllAccreditors()]).then(() => {
            this.accreditorList = this.accreditors.accreditorsList;
        });
        this.paginator.pageSize=this.paginator.pageSizeOptions[1];
        this.paginator.pageIndex = 0;
    }

    paginatorChange(event: PageEvent): void {
        this.filters.pageSize = event.pageSize;
        this.filters.pageNumber = event.pageIndex + 1;
        this.dataSource.paginator = this.paginator;
    }

    changeFilter(type: 'accreditation' | 'process'): void {
        switch (type) {
            case 'accreditation':
                this.chapterForm.get('process').reset();
                const accreditationId = this.chapterForm.get('accreditation').value;
                Promise.all([this.accreditors.setAllAccreditorsProccess(accreditationId)]).then(() => {
                    this.processList = this.accreditors.proccessList ? this.accreditors.proccessList : [];
                });
                // const processList = this.accreditorList.find((item) => item.acreditadoraId === accreditationId);
                // this.processList = processList ? processList.acreditadoraProcesos : [];
                this.dataSource.data = [];
                break;
            case 'process':
                this.filters.pageNumber = 1;
                this.paginator.firstPage();
                this.getAllChapters(this.filters);
                break;
        }
    }

    openRecord(type: 'add' | 'edit', element?: CapituloDTOV1): void {
        const form = this.chapterForm.value;
        let data = new CapituloDTOV1();
        switch (type) {
            case 'add':
                data.acreditadoraProcesoId = form.process;
                break;
            case 'edit':
                data = new CapituloDTOV1().deserialize(element);
                break;
        }

        this.chapterRecord
            .open(data)
            .afterClosed()
            .subscribe((response) => {
                if (response) {
                    this.getAllChapters(this.filters);
                }
            });
    }

    // openCopy(): void {
    //     this.copyProcess
    //         .open()
    //         .afterClosed()
    //         .subscribe(async (response) => {
    //             if (response) {
    //                 const body = new CopiadoRequest();
    //                 body.origen = response.processOrigin;
    //                 body.destino = response.processDestination;
    //                 await this.copyChapter(body);

    //                 this.filters = new TablePaginatorSearch();
    //                 this.chapterForm.get('accreditation').setValue(response.accreditation);
    //                 this.changeFilter('accreditation');
    //                 this.chapterForm.get('process').setValue(response.processDestination);
    //                 this.changeFilter('process');
    //             }
    //         });
    // }

    deleteChapter(data: CapituloDTOV1): void {
        Alert.confirm('Eliminar Capítulo', '¿Deseas eliminar este capítulo?').subscribe((result) => {
            if (!result || !result.isConfirmed) {
                return;
            }
            this.chapter.deleteChapter(data.capituloId, data.acreditadoraProcesoId).subscribe((response) => {
                if (response.exito) {
                    Alert.success('', 'Capítulo eliminado correctamente');
                    this.getAllChapters(new TablePaginatorSearch());
                }
            });
        });
    }

    private getAllChapters(filters: TablePaginatorSearch): void {
        this.dataSource.data = [];
        filters.inactives = true;
        const process = this.chapterForm.get('process').value;
        this.chapter.getAllChapters(filters, process).subscribe((response) => {
            if (response.output) {
                const data = response.output.map((area) => new CapituloDTOV1().deserialize(area));
                this.dataSource.data = data;
                this.dataSource.paginator = this.paginator;
            }
        });
    }

    private copyChapter(body: CopiadoRequest): Promise<void> {
        return new Promise((resolve) => {
            this.chapter.copyChapters(body).subscribe(
                (response) => {
                    if (!response.success) {
                        resolve();
                        return;
                    }
                    const value = new CopiadoResult().deserialize(response.data);
                    this.copyResultModalService
                        .open(value)
                        .afterClosed()
                        .subscribe(() => {
                            resolve();
                        });
                },
                () => {
                    resolve();
                }
            );
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
