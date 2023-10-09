import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  AccreditorsService,
  ChapterService,
  CriteriaService,
  EvidenceTypeService,
  SchoolCareerService,
} from 'src/app/core/services';
import { CopyResultModalService } from 'src/app/features/copy-result-modal';
import { Alert, setDataPaginator } from 'src/app/utils/helpers';
import {
  AcreditadoraDTO,
  AcreditadoraDTOV1,
  AcreditadoraProcesoDTO,
  AcreditadoraProcesoDTOV1,
  CarreraDTO,
  CarreraDTOV1,
  CopiadoRequest,
  CopiadoResult,
  CriterioDTO,
  CriterioDTOV1,
  FiltersModal,
  TablePaginatorSearch,
} from 'src/app/utils/models';
import { CriteriaCopyService } from './modals/criteria-copy/criteria-copy.service';
import { CriteriaRecordService } from './modals/criteria-record/criteria-record.service';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss'],
})
export class CriteriaComponent implements OnInit {
  @ViewChild('input', { static: true }) inputSearch: ElementRef;
  @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;

  dataSource: MatTableDataSource<CriterioDTOV1>;
  filters: TablePaginatorSearch;
  criteriaForm: UntypedFormGroup;

  accreditorList: AcreditadoraDTOV1[];
  processList: AcreditadoraProcesoDTOV1[];
  careersList: CarreraDTOV1[];

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly criteriaRecord: CriteriaRecordService,
    private readonly criteriaCopy: CriteriaCopyService,
    private readonly accreditors: AccreditorsService,
    private readonly schoolCareer: SchoolCareerService,
    private readonly criteria: CriteriaService,
    private readonly evidenceType: EvidenceTypeService,
    private readonly chapter: ChapterService,
    private readonly copyResultModal: CopyResultModalService
  ) {
    this.criteriaForm = this.formBuilder.group({
      accreditation: [null, [Validators.required]],
      process: [null, [Validators.required]],
      career: [null, [Validators.required]],
    });
    this.filters = new TablePaginatorSearch();
    this.dataSource = new MatTableDataSource<CriterioDTOV1>([]);
    this.accreditorList = [];
    this.processList = [];
    this.careersList = [];
  }

  async ngOnInit(): Promise<void> {
    Promise.all([
      this.schoolCareer.setAllCareers(),
      this.accreditors.setAllAccreditors(),
      // this.evidenceType.setAllEvidenceType(),
    ]).then(() => {
      this.accreditorList = this.accreditors.accreditorsList;
      this.careersList = this.schoolCareer.careersList;
    });
    this.paginator.pageSize = this.paginator.pageSizeOptions[1];
    this.paginator.pageIndex = 0;
  }

  paginatorChange(event: PageEvent): void {
    this.filters.pageSize = event.pageSize;
    this.filters.pageNumber = event.pageIndex + 1;
    this.dataSource.paginator = this.paginator;
  }

  async changeFilter(type: 'accreditation' | 'process' | ''): Promise<void> {
    switch (type) {
      case 'accreditation':
        this.criteriaForm.get('process').reset();
        const accreditationId = this.criteriaForm.get('accreditation').value;
        Promise.all([this.accreditors.setAllAccreditorsProccess(accreditationId)]).then(() => {
          this.processList = this.accreditors.proccessList ? this.accreditors.proccessList : [];
        });
        // const processList = this.accreditorList.find((item) => item.acreditadoraId === accreditationId);
        // this.processList = processList ? processList.acreditadoraProcesos : [];
        this.dataSource.data = [];
        this.chapter.chaptersList = [];
        break;

      case 'process':
        this.chapter.setAllChapters(this.criteriaForm.get('process').value);
        break;
    }
    if (this.criteriaForm.valid) {
      // this.filters.pageNumber = 1;
      // this.paginator.firstPage();
      this.getAllCriteria(this.filters);
    }
  }

  openRecord(element?: CriterioDTOV1): void {
    const form = this.criteriaForm.value;
    const filters = new FiltersModal();
    filters.acreditadoraProcesoId = form.process;
    filters.carreraId = form.career;
    filters.processId = form.process;
    const data = {
      data: element ? element : null,
      filters,
    };

    this.criteriaRecord
      .open(data)
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          this.getAllCriteria(this.filters);
        }
      });
  }

  deleteCriteria(data: CriterioDTOV1): void {
    Alert.confirm('Eliminar criterio', '¿Deseas eliminar este criterio?').subscribe((result) => {
      if (!result || !result.isConfirmed) {
        return;
      }
      this.criteria.deleteCriteria(data.criterioId, data.acreditadoraProcesoId).subscribe((response) => {
        if (response.exito) {
          Alert.success('', 'Criterio eliminado correctamente');
          this.getAllCriteria(new TablePaginatorSearch());
        }
      });
    });
  }

  openCopy(): void {
    this.criteriaCopy
      .open()
      .afterClosed()
      .subscribe(async (response) => {
        if (response) {
          const body = new CopiadoRequest();
          body.origen = response.processOrigin;
          body.destino = response.processDestination;
          body.carreraOrigen = response.careerOrigin;
          body.carreraDestino = response.careerDestination;

          await this.copyCriteria(body);

          this.filters = new TablePaginatorSearch();
          this.criteriaForm.get('accreditation').setValue(response.accreditation);
          this.changeFilter('accreditation');
          this.criteriaForm.get('process').setValue(response.processDestination);
          this.changeFilter('process');
          this.criteriaForm.get('career').setValue(response.careerDestination);
          this.changeFilter('');
        }
      });
  }

  private getAllCriteria(filters: TablePaginatorSearch): void {
    this.dataSource.data = [];
    filters.inactives = true;
    const process = this.criteriaForm.value.process;
    const career = this.criteriaForm.value.career;
    this.criteria.getAllCriteria(this.filters, process, career).subscribe((response) => {
      if (response.output) {
        const data = response.output.map((area) => new CriterioDTOV1().deserialize(area));
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  private copyCriteria(body: CopiadoRequest): Promise<void> {
    return new Promise((resolve) => {
      this.criteria.copyCriteria(body).subscribe(
        (response) => {
          if (!response.success) {
            resolve();
            return;
          }
          const value = new CopiadoResult().deserialize(response.data);
          this.copyResultModal
            .open(value)
            .afterClosed()
            .subscribe((response) => {
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
