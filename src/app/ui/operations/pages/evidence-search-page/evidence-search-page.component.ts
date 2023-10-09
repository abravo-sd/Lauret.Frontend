import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EvidenceLogService, EvidencesService } from 'src/app/core/services';
import { EvidenceViewerService } from 'src/app/features/evidence-viewer';
import { EvidenceViewerData } from 'src/app/features/evidence-viewer/evidence-viewer.service';
import { Alert } from 'src/app/utils/helpers';
import {
  AreaResponsableDTO,
  CampusDTO,
  Evidencia,
  RegistroEvidenciaArchivo,
  SubareaDTO,
  TablePaginatorSearch,
} from 'src/app/utils/models';

@Component({
  selector: 'app-evidence-search-page',
  templateUrl: './evidence-search-page.component.html',
  styleUrls: ['./evidence-search-page.component.scss'],
})
export class EvidenceSearchPageComponent implements OnInit {
  @ViewChild('paginator', { static: true }) readonly paginator: MatPaginator;
  evidenceForm: FormGroup;
  dataSource: MatTableDataSource<RegistroEvidenciaArchivo>;
  filters: TablePaginatorSearch;
  evidence: Evidencia;
  evidenceRecordFileList: RegistroEvidenciaArchivo[];

  responsibilityAreasList: AreaResponsableDTO[];
  subareaList: SubareaDTO[];
  campusList: CampusDTO[];
  yearList: number[];
  cycleList: string[];
  extensionAvailable: string[];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly evidences: EvidencesService,
    private readonly evidenceLog: EvidenceLogService,
    private readonly evidenceViewer: EvidenceViewerService
  ) {
    this.responsibilityAreasList = [];
    this.subareaList = [];
    this.campusList = [];
    this.yearList = [];
    this.cycleList = [];
    this.dataSource = new MatTableDataSource<RegistroEvidenciaArchivo>([]);
    this.filters = new TablePaginatorSearch();
    this.evidence = new Evidencia();
    this.evidenceRecordFileList = [];
    this.extensionAvailable = ['pdf', 'jpg', 'png', 'jpeg', 'gif', 'bmp', 'tif'];
    this.evidenceForm = this.formBuilder.group({
      evidenceLink: [{ value: null, disabled: true }, []],
      areaResponsabilidadId: [{ value: null, disabled: true }, []],
      subareas: [{ value: null, disabled: false }, []],
      campuses: [{ value: null, disabled: false }, []],
      anios: [{ value: [], disabled: true }, []],
      ciclos: [{ value: [], disabled: true }, []],
    });
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.route.queryParams.subscribe((params) => {
    //   console.log(params);
      if (params.evidencia && !isNaN(params.evidencia) && params.seccion && !isNaN(params.seccion)) {
        this.getEvidenceByEvidenceFile(params.evidencia);
      } else {
        this.router.navigate(['/operacion/vista-libro-electronico']);
      }
    });
  }

  showFile(evidenceFile: RegistroEvidenciaArchivo): void {
    if (evidenceFile.esUrl) {
      window.open(evidenceFile.url, '_blank');
      return;
    }

    this.evidenceLog.getEvidenceRecordFile(evidenceFile.registroEvidenciaArchivoId).subscribe((response) => {
      if (response.success && response.data) {
        this.openFile(evidenceFile, response.data);
      } else {
        Alert.info(response.message);
      }
    });
  }

  downloadFile(evidenceFile: RegistroEvidenciaArchivo): void {
    this.evidenceLog.getEvidenceRecordFile(evidenceFile.registroEvidenciaArchivoId).subscribe((response) => {
      if (response.success && response.data) {
        window.open(response.data, '_blank');
      } else {
        Alert.info(response.message);
      }
    });
  }

  changeFilter(): void {
    const formData = this.evidenceForm.getRawValue();
    const subareaList: string[] = formData.subareas;
    const campusList: string[] = formData.campuses;
    this.dataSource.data = this.evidenceRecordFileList.filter(
      (e) => subareaList.includes(e.subareaId) || campusList.includes(e.campusId)
    );
  }

  clearFilters(): void {
    this.evidenceForm.get('subareas').setValue([]);
    this.evidenceForm.get('campuses').setValue([]);
    this.evidenceForm.get('subareas').updateValueAndValidity();
    this.evidenceForm.get('campuses').updateValueAndValidity();
    this.dataSource.data = [];
  }

  private openFile(evidenceFile: RegistroEvidenciaArchivo, url: string): void {
    if (evidenceFile.mime === 'pdf') {
      this.showPdf(url);
      return;
    }

    if (evidenceFile.mime !== 'pdf') {
      this.showImage(url);
      return;
    }
  }

  private showPdf(url: string): void {
    const data: EvidenceViewerData = {
      type: 'pdf',
      file: {
        url,
      },
    };
    this.evidenceViewer
      .open(data)
      .afterClosed()
      .subscribe(() => {});
  }

  private showImage(url: string): void {
    const data: EvidenceViewerData = {
      type: 'image',
      image: {
        url,
      },
    };
    this.evidenceViewer
      .open(data)
      .afterClosed()
      .subscribe(() => {});
  }

  private getEvidenceByEvidenceFile(evidenceFileId: number): void {
    this.evidences.getEvidenceByEvidenceFile(evidenceFileId).subscribe((response) => {
      if (response.success) {
        const data = new Evidencia().deserialize(response.data);
        this.evidence = data;
        this.setFilters(data);
        this.setForm(data);
        this.setEvidenceFile(data);
      }
    });
  }

  private setFilters(evidence: Evidencia): void {
    this.subareaList = evidence.subareas;
    this.campusList = evidence.campuses;
    this.yearList = evidence.anios;
    this.cycleList = evidence.ciclos;
  }

  private setForm(evidence: Evidencia) {
    const subareaList = evidence.subareas.map((s) => s.subareaId);
    const campusList = evidence.campuses.map((c) => c.campusId);

    this.evidenceForm.get('evidenceLink').setValue(evidence.numero);
    this.evidenceForm.get('areaResponsabilidadId').setValue(evidence.areaResponsabilidadNombre);
    this.evidenceForm.get('subareas').setValue(subareaList);
    this.evidenceForm.get('campuses').setValue(campusList);
    this.evidenceForm.get('anios').setValue(evidence.anios);
    this.evidenceForm.get('ciclos').setValue(evidence.ciclos);

    if (evidence.subareas.length === 1) {
      this.evidenceForm.get('subareas').disable();
    }

    if (evidence.campuses.length === 1) {
      this.evidenceForm.get('campuses').disable();
    }
  }

  private setEvidenceFile(e: Evidencia): void {
    for (const evidence of e.registroEvidencia) {
      this.evidenceRecordFileList = this.evidenceRecordFileList.concat(evidence.registroEvidenciaArchivos);
    }
    this.dataSource.data = this.evidenceRecordFileList;

    if (this.evidenceRecordFileList.length === 0) {
      Alert.info('No se encontro un archivo.');
    }
  }
}
