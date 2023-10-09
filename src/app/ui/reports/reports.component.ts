import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {
    AccreditorsService,
    CampusService,
    ChapterService,
    CriteriaService,
    CyclesService,
    ReportsService,
    SchoolCareerService,
    SitesService,
} from 'src/app/core/services';
import { DeliverStatus } from 'src/app/utils/enums/deliver-status';
import { convertByteArrayToBlob } from 'src/app/utils/helpers';
import {
    AcreditadoraDTO,
    AcreditadoraDTOV1,
    AcreditadoraProcesoDTO,
    AcreditadoraProcesoDTOV1,
    CampusDTO,
    CampusDTOV1,
    CapituloDTO,
    CapituloDTOV1,
    CarreraDTO,
    CarreraDTOV1,
    Ciclo,
    CriterioDTO,
    CriterioDTOV1,
    SedeDTO,
    SedeDTOV1,
    TablePaginatorSearch,
} from 'src/app/utils/models';
import { ReporteDTO } from './../../utils/models/reporte.dto';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
    reportForm: UntypedFormGroup;
    filters: TablePaginatorSearch;
    accreditorList: AcreditadoraDTOV1[];
    careersList: CarreraDTOV1[];
    campusList: CampusDTOV1[];
    sedeList: SedeDTOV1[];
    chaptersList: CapituloDTOV1[];
    criteriaList: CriterioDTOV1[];
    processList: AcreditadoraProcesoDTOV1[];
    cycleList: Ciclo[];

    constructor(
        private readonly formBuilder: UntypedFormBuilder,
        private readonly accreditors: AccreditorsService,
        private readonly schoolCareer: SchoolCareerService,
        private readonly campus: CampusService,
        private readonly sites: SitesService,
        private readonly chapter: ChapterService,
        private readonly criteria: CriteriaService,
        private readonly reports: ReportsService,
        public readonly cycles: CyclesService
    ) {
        this.filters = new TablePaginatorSearch();
        this.accreditorList = [];
        this.careersList = [];
        this.campusList = [];
        this.sedeList = [];
        this.chaptersList = [];
        this.criteriaList = [];
        this.processList = [];
        this.cycleList = [];

        this.reportForm = this.formBuilder.group({
            accreditation: [null, [Validators.required]],
            process: [null, [Validators.required]],
            cycles: [[], []],
            career: [[], []],
            chapters: [[], []],
            criterias: [[], []],
            headquarter: [[], []],
            campus: [[], []],
            delivered: [DeliverStatus.YES, []],
        });
    }

    ngOnInit(): void {
        Promise.all([
            this.schoolCareer.setAllCareers(),
            this.campus.setAllCampus(),
            this.sites.setAllSites(),
            this.accreditors.setAllAccreditors(),
            this.cycles.setAllCycles(),
        ]).then(() => {
            this.careersList = this.schoolCareer.careersList;
            this.campusList = this.campus.campusList;
            this.sedeList = this.sites.sedeList;
            this.accreditorList = this.accreditors.accreditorsList;
            this.cycleList = this.cycles.cycleList;
        });
    }

    changeAccreditation(): void {
        this.reportForm.get('process').reset();
        const accreditationId = this.reportForm.get('accreditation').value;
        const processList = this.accreditorList.find((item) => item.acreditadoraId === accreditationId);
        this.processList = processList ? processList.acreditadoraProcesos : [];
    }

    changeProcess(): void {
        const form = this.reportForm.value;
        this.careerChange();
        Promise.all([this.chapter.setAllChapters(form.process)]).then(() => {
            this.chaptersList = this.chapter.chaptersList;
        });
    }

    careerChange(): void {
        const form = this.reportForm.value;
        const body = form.career as string[];

        this.criteria.getCriteriaListByCareer(new TablePaginatorSearch(), form.process, body).subscribe((response) => {
            if (response.exito) {
                const data = response.output.map((area) => new CriterioDTOV1().deserialize(area));
                this.criteriaList = data;
            }
        });
    }

    submit(): void {
        const formData = this.reportForm.getRawValue();
        const body = new ReporteDTO();
        const process: number = formData.process;
        body.acreditadoraProcesoId = process.toString();
        body.ciclo = formData.cycles;
        body.carrera = formData.career;
        body.capitulo = formData.chapters;
        body.criterio = formData.criterias;
        body.sede = formData.headquarter;
        body.campus = formData.campus;
        body.esEntregado = formData.delivered === DeliverStatus.YES;
        // console.log(body);
        this.reports.downloadReport(body).subscribe((response) => {
            if (response.success) {
                convertByteArrayToBlob(response.data, response.mime, response.name);
            }
        });
    }
}
