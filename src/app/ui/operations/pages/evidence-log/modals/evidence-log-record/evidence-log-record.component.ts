import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import { ChapterService, CriteriaService, EvidenceLogService, UsersService } from 'src/app/core/services';
import { LIMIT_SIZE_FILE } from 'src/app/utils/constants';
import { Alert, FileHelper } from 'src/app/utils/helpers';
import {
  CriterioDTO,
  CriterioDTOV1,
  DataFile,
  RegistroEvidenciaArchivo,
  RegistroEvidenciaRequest,
} from 'src/app/utils/models';
import { EvidenceLogDataRecord } from './evidence-log-record.service';

enum TabIndex {
  FILE = 0,
  URL = 1,
}

@Component({
  templateUrl: './evidence-log-record.component.html',
  styleUrls: ['./evidence-log-record.component.scss'],
})
export class EvidenceLogRecordComponent implements OnInit {
  @ViewChild('dialog', { static: true }) scroll: ElementRef;
  evidenceForm: UntypedFormGroup;
  uploadUrlForm: UntypedFormGroup;

  selectedIndex: TabIndex;
  fileList: RegistroEvidenciaArchivo[];
  urlList: RegistroEvidenciaArchivo[];
  listToDelete: number[];
  edit: boolean;
  localFilesList: DataFile[];
  criteria: CriterioDTOV1;

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: EvidenceLogDataRecord,
    private readonly formBuilder: UntypedFormBuilder,
    public readonly users: UsersService,
    public readonly chapters: ChapterService,
    public readonly criterias: CriteriaService,
    private readonly matDialogRef: MatDialogRef<boolean>,
    private readonly evidenceLog: EvidenceLogService
  ) {
    this.selectedIndex = TabIndex.FILE;
    this.fileList = [];
    this.urlList = [];
    this.listToDelete = [];
    this.localFilesList = [];
    this.edit = null;
    this.criteria = new CriterioDTOV1();

    this.evidenceForm = this.formBuilder.group({
      campus: [{ value: null, disabled: true }, [Validators.required]],
      capituloId: [{ value: null, disabled: true }, [Validators.required]],
      criterioId: [{ value: null, disabled: true }, [Validators.required]],
      responsableArea: [{ value: null, disabled: true }, [Validators.required]],
      tipoEvidenciaNombre: [{ value: null, disabled: true }, [Validators.required]],
      descripcion: [{ value: null, disabled: true }, [Validators.required]],
    });

    this.uploadUrlForm = this.formBuilder.group({
      url: [null, [Validators.required, Validators.pattern('(https://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
    });
  }

  ngOnInit(): void {
    if (!this.data) {
      Alert.error('Error al obtener el registro de evidencia');
      this.matDialogRef.close();
      return;
    }
    this.setEvidenceForm();
    for (const item of this.data.evidence.registroEvidenciaArchivos) {
      if (item.esUrl) {
        this.urlList.push(item);
      } else {
        this.fileList.push(item);
      }
    }

    this.getCriteriaById(parseInt(this.data.filters.processId), this.data.evidence.criterioId);
    this.chapters.setAllChapters(this.data.filters.processId);
    this.criterias.setAllCriteria(this.data.filters.processId, this.data.filters.carreraId);
  }

  uploadFile(files: File[]): void {
    let isValid = true;
    if (files.length === 0) {
      Alert.info('Favor de seleccionar uno o más archivos');
      return;
    }

    // VALID SIZE
    if (files.length === 1) {
      if (files[0].size > FileHelper.getSizeFileMBToBytes(LIMIT_SIZE_FILE)) {
        Alert.info(`Favor de agregar un archivo de máximo ${LIMIT_SIZE_FILE}MB`);
        return;
      }

      this.addFile(files[0]);
    } else {
      for (const file of files) {
        if (file.size > FileHelper.getSizeFileMBToBytes(LIMIT_SIZE_FILE)) {
          Alert.info(`Favor de agregar un archivos de máximo ${LIMIT_SIZE_FILE}MB por archivo`);
          isValid = false;
          break;
        }
      }
      if (!isValid) {
        return;
      }
      for (const file of files) {
        this.addFile(file);
      }
    }
  }

  setScroll(index: TabIndex): void {
    this.selectedIndex = index;
    this.scroll.nativeElement.scrollTop = 5000;
  }

  addFile(file: File): void {
    Promise.all([this.fillFileToEvidenceRecordFile(new RegistroEvidenciaArchivo(), file)]).then((response) => {
      const newEvidenceRecord = response[0];
      this.fileList.push(newEvidenceRecord);
      this.edit = true;
    });
  }

  deleteFile(evidenceRecordFile: RegistroEvidenciaArchivo, index: number): void {
    if (evidenceRecordFile.registroEvidenciaArchivoId === 0) {
      const files = this.localFilesList.filter((item) => item.data !== evidenceRecordFile.nombreArchivo);
      this.localFilesList = files;
    } else {
      this.listToDelete.push(evidenceRecordFile.registroEvidenciaArchivoId);
    }
    this.fileList.splice(index, 1);
    this.edit = true;
  }

  addURL(): void {
    if (this.uploadUrlForm.invalid) {
      Alert.error('Verifique que los campos sean correctos');
      return;
    }
    const urlForm = this.uploadUrlForm.value;
    const newURL = this.fillEvidenceRecordFile(new RegistroEvidenciaArchivo());
    newURL.registroEvidenciaArchivoId = 0;
    newURL.esUrl = true;
    newURL.url = urlForm.url;
    this.urlList.push(newURL);
    this.uploadUrlForm.reset();
    this.edit = true;
  }

  deleteURL(evidenceRecordFile: RegistroEvidenciaArchivo, index: number): void {
    if (evidenceRecordFile.registroEvidenciaArchivoId !== 0) {
      this.listToDelete.push(evidenceRecordFile.registroEvidenciaArchivoId);
    }
    this.urlList.splice(index, 1);
    this.edit = true;
  }

  submit(): void {
    this.urlList;
    const body = new RegistroEvidenciaRequest();
    const files = this.fileList.filter((file) => file.registroEvidenciaArchivoId === 0);
    const URLs = this.urlList.filter((url) => url.registroEvidenciaArchivoId === 0);
    body.nuevos = files.concat(URLs);
    body.borrar = this.listToDelete;
    this.evidenceLog.updateFilesAndURLs(body, this.data.evidence).subscribe((response) => {
      if (response.success) {
        Alert.success('Registro actualizado correctamente');
        this.matDialogRef.close(true);
      } else {
        Alert.error(response.message);
      }
    });
  }

  downloadFile(evidenceRecordFile: RegistroEvidenciaArchivo): void {
    if (evidenceRecordFile.registroEvidenciaArchivoId === 0) {
      const dataFile = this.localFilesList.find((item) => item.data === evidenceRecordFile.nombreArchivo);
      if (!dataFile) {
        return;
      }
      saveAs(dataFile.file);
    } else {
      this.evidenceLog.getEvidenceRecordFile(evidenceRecordFile.registroEvidenciaArchivoId).subscribe((response) => {
        if (response.success && response.data) {
          window.open(response.data, '_blank');
        } else {
          Alert.info(response.message);
        }
      });
    }
  }

  getFileName(evidenceRecordFile: RegistroEvidenciaArchivo): string {
    const dataFile = this.localFilesList.find((item) => item.data === evidenceRecordFile.nombreArchivo);
    return dataFile.name;
  }

  private async fillFileToEvidenceRecordFile(
    evidence: RegistroEvidenciaArchivo,
    file: File
  ): Promise<RegistroEvidenciaArchivo> {
    evidence = this.fillEvidenceRecordFile(evidence);
    evidence.esUrl = false;
    evidence.mime = FileHelper.getFileExtension(file);
    const base64Result: string = await FileHelper.getBase64(file);
    const base64 = base64Result.split(',')[1];
    evidence.nombreArchivo = base64;

    const dataFile = new DataFile();
    dataFile.name = file.name;
    dataFile.file = file;
    dataFile.data = base64;
    this.localFilesList.push(dataFile);
    return evidence;
  }

  private fillEvidenceRecordFile(evidence: RegistroEvidenciaArchivo): RegistroEvidenciaArchivo {
    evidence.registroEvidenciaArchivoId = 0;
    evidence.acreditadoraProcesoId = this.data.evidence.acreditadoraProcesoId;
    evidence.carreraId = this.data.evidence.carreraId;
    evidence.criterioId = this.data.evidence.criterioId;
    evidence.evidenciaId = this.data.evidence.evidenciaId;
    evidence.subareaId = this.data.evidence.subareaId;
    evidence.campusId = this.data.evidence.campusId;
    return evidence;
  }

  private setEvidenceForm(): void {
    const evidence = this.data.evidence;
    this.evidenceForm.get('campus').setValue(evidence.campusNombre);
    this.evidenceForm.get('criterioId').setValue(evidence.criterioId);
    this.evidenceForm.get('responsableArea').setValue(evidence.evidencia.areaResponsabilidadNombre);
    this.evidenceForm.get('tipoEvidenciaNombre').setValue(evidence.evidencia.tipoEvidenciaNombre);
    this.evidenceForm.get('descripcion').setValue(evidence.evidencia.descripcion);

    if (!this.data.permissionValid || !this.data.evidence.esAceptada) {
      this.uploadUrlForm.get('url').disable();
    }
  }

  private getCriteriaById(process: number, criteriaId: string): void {
    this.criterias.getCriteriaById(process, criteriaId).subscribe((response) => {
      if (response.exito) {
        const data = new CriterioDTOV1().deserialize(response.output);
        this.criteria = data;
        this.evidenceForm.get('capituloId').setValue(data.capituloId);
      }
    });
  }
}
