import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { AccreditorsService, EvidenceLogService, SchoolCareerService, UsersService } from 'src/app/core/services';

import { MODULESCATALOG } from 'src/app/utils/constants';
import { Modules } from 'src/app/utils/enums/module';
import { Alert, setDataPaginator } from 'src/app/utils/helpers';
import {
    AcreditadoraDTO,
    AcreditadoraDTOV1,
    AcreditadoraProcesoDTO,
    AcreditadoraProcesoDTOV1,
    CarreraDTO,
    FiltersModal,
    RegistroEvidencia,
    TablePaginatorSearch,
} from 'src/app/utils/models';
import { EvidenceLogRecordService } from './modals';

@Component({
    selector: 'app-evidence-log',
    templateUrl: './evidence-log.component.html',
    styleUrls: ['./evidence-log.component.scss'],
})
export class EvidenceLogComponent implements OnInit {
    @ViewChild('input', { static: true }) inputSearch: ElementRef;
    @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;

    dataSource: MatTableDataSource<any>;
    filters: TablePaginatorSearch;
    evidenceForm: FormGroup;
    tableColumn: string[];

    accreditorList: AcreditadoraDTOV1[];
    processList: AcreditadoraProcesoDTOV1[];
    careersList: CarreraDTO[];
    permissionUpload: boolean;
    permissionValid: boolean;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly evidenceLogRecord: EvidenceLogRecordService,
        private readonly evidenceLog: EvidenceLogService,
        private readonly accreditors: AccreditorsService,
        private readonly schoolCareer: SchoolCareerService,
        public readonly users: UsersService
    ) {
        this.filters = new TablePaginatorSearch();
        this.dataSource = new MatTableDataSource<RegistroEvidencia>([]);
        this.accreditorList = [];
        this.processList = [];
        this.careersList = [];
        this.permissionUpload = null;
        this.permissionValid = null;
        this.tableColumn = [
            'number',
            'description',
            'campus',
            'process',
            'area',
            'subArea',
            'accomplished',
            'responsible',
            'dateCompressed',
            'upload',
            'accepted',
        ];
        this.evidenceForm = this.formBuilder.group({
            accreditation: [null, [Validators.required]],
            process: [null, [Validators.required]],
            career: [null, [Validators.required]],
            dateStart: [{ value: null, disabled: true }],
            dateEnd: [{ value: null, disabled: true }],
        });
    }

    ngOnInit(): void {
        this.checkPermission();
        Promise.all([this.schoolCareer.setAllCareers(), this.accreditors.setAllAccreditors()]).then(() => {
            this.careersList = this.schoolCareer.careersList;
            this.accreditorList = this.accreditors.accreditorsList;
        });
    }

    changeFilter(type: 'accreditation' | 'process' | 'career'): void {
        const form = this.evidenceForm.value;

        switch (type) {
            case 'accreditation':
                this.evidenceForm.get('process').reset();
                const accreditationId = form.accreditation;
                const processList = this.accreditorList.find((item) => item.acreditadoraId === accreditationId);
                this.processList = processList ? processList.acreditadoraProcesos : [];
                this.dataSource.data = [];
                break;
            case 'process':
                const process = this.processList.find((item) => item.acreditadoraProcesoId === form.process);
                this.evidenceForm.get('dateStart').setValue(process.fechaInicio);
                this.evidenceForm.get('dateEnd').setValue(process.fechaFin);
                break;
        }

        if (this.evidenceForm.valid) {
            this.filters.pageNumber = 1;
            this.paginator.firstPage();
            this.getAllEvidenceLogs(this.filters);
        }
    }

    private getAllEvidenceLogs(filters: TablePaginatorSearch): void {
        this.dataSource.data = [];
        filters.inactives = true;
        const process = this.evidenceForm.value.process;
        const career = this.evidenceForm.value.career;
        this.evidenceLog.getAllEvidenceLogs(this.filters, process, career).subscribe((response) => {
            if (response.data.data) {
                const data = response.data.data.map((area: any) => new RegistroEvidencia().deserialize(area));
                this.dataSource.data = data;
                setDataPaginator(this.paginator, response.data.totalCount);
            }
        });
    }

    paginatorChange(event: PageEvent): void {
        this.filters.pageSize = event.pageSize;
        this.filters.pageNumber = event.pageIndex + 1;
        this.getAllEvidenceLogs(this.filters);
    }

    openRecord(evidence: RegistroEvidencia): void {
        const form = this.evidenceForm.value;
        const filters = new FiltersModal();
        filters.acreditadoraProcesoId = form.process;
        filters.carreraId = form.career;
        filters.processId = form.process;
        this.evidenceLogRecord
            .open({
                evidence,
                filters,
                permissionUpload: this.permissionUpload,
                permissionValid: this.permissionValid,
            })
            .afterClosed()
            .subscribe((response) => {
                if (response) {
                    this.getAllEvidenceLogs(this.filters);
                }
            });
    }

    cargarArchivos(evidence: RegistroEvidencia): void {
        this.openRecord(evidence);
    }

    formatDate(fecha: Date): string {
        return moment(fecha).locale('es-MX').format('LL');
    }

    acceptEvidenceRecord(checked: boolean, evidence: RegistroEvidencia): void {
        this.evidenceLog.acceptEvidence(checked, evidence).subscribe((response) => {
            if (response.success) {
                Alert.success('', 'Registro actualizado correctamente');
                this.getAllEvidenceLogs(this.filters);
            } else {
                Alert.error(response.message);
            }
        });
    }

    private checkPermission(): void {
        const permissionUpload = MODULESCATALOG.find((module) => module.key === Modules.OPE_REG_EVID_LOAD);
        const permissionValid = MODULESCATALOG.find((module) => module.key === Modules.OPE_REG_EVID_VALID);

        if (!permissionUpload || !permissionValid) {
            Alert.info('Error al obtener los módulos');
            return;
        }

        const permissionUploadUser = this.users.userSession.vistas.find((p) =>
            this.users.userSession.vistas.find((v) => v.vistaId === permissionUpload.id.toString())
        );
        const permissionValidUser = this.users.userSession.vistas.find((p) =>
            this.users.userSession.vistas.find((v) => v.vistaId === permissionValid.id.toString())
        );

        this.permissionUpload = !!permissionUploadUser;
        this.permissionValid = !!permissionValidUser;
    }
}
