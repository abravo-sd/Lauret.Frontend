import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {
  EvaluationElementService,
  ConfigurationIndicatorSiacService,
  ResponsibilityAreasService,
  IndicatorSiacService,
  ComponentUvmService,
  IndicatorUvmService,
  SubindicatorUvmService,
  NormativeService,
  EvidencesCatalogService,
  UsersService,
} from 'src/app/core/services';
import { ValidatorService } from 'src/app/shared/validators';
import { Alert, clearForm, DateHelper } from 'src/app/utils/helpers';
import {
  AreaResponsableDTOV1,
  ConfiguracionIndicadorSiacDTOV1,
  ConfiguracionIndicadorSiacAddUpdateDTOV1,
  ElementoEvaluacionDTOV1,
  ElementoEvaluacionCycle,
  ElementoEvaluacionInstitution,
  ElementoEvaluacionProccess,
  IndicadorSiacDTOV1,
  ComponenteUVMDTOV1,
  IndicadorUVMDTOV1,
  SubIndicadorUVMDTOV1,
  NormativaDTOV1,
  EvidenceDTO,
  TablePaginatorSearch,
  ConfigurationIndicatorSIACFile,
} from 'src/app/utils/models';
import { ConfiguracionIndicadorData } from './indicator-record.service';
import { MatSelectChange } from '@angular/material/select';
import { LIMIT_BLOB_SIZE_FILE } from 'src/app/utils/constants';
export enum ModalTitle {
  NEW = 'Nueva Configuración Indicador SIAC',
  EDIT = 'Editar Configuración Indicador SIAC',
}

@Component({
  templateUrl: './indicator-record.component.html',
  styleUrls: ['./indicator-record.component.scss'],
})
export class IndicatorRecordComponent implements OnInit, OnDestroy {
  cfgIndicatorRecordForm: UntypedFormGroup;
  title: ModalTitle;
  data: ConfiguracionIndicadorSiacDTOV1;
  dataSource: any[];
  edit: boolean;
  subscription: Subscription;
  disabled: boolean;
  permission: boolean;
  evaluationElementList: ElementoEvaluacionDTOV1[];
  searchEvaluationElementList: ElementoEvaluacionDTOV1[];
  cycleList: ElementoEvaluacionCycle[];
  institutionList: ElementoEvaluacionInstitution[];
  proccessList: ElementoEvaluacionProccess[];
  responsibilityAreaList: AreaResponsableDTOV1[];
  generica: boolean;
  levelModalityList: { id: string | number; nombre: string }[];
  indicatorSiacList: IndicadorSiacDTOV1[];
  componenteUVMList: ComponenteUVMDTOV1[];
  indicadorUVMList: IndicadorUVMDTOV1[];
  subIndicadorUVMList: SubIndicadorUVMDTOV1[];
  normativeList: NormativaDTOV1[];
  evicenceList: EvidenceDTO[];
  archivos: FormData[];

  field: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly indicadorData: ConfiguracionIndicadorData,
    public readonly evaluationElement: EvaluationElementService,
    private readonly configurationIndicatorSiacService: ConfigurationIndicatorSiacService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly ref: MatDialogRef<never>,
    private readonly validator: ValidatorService,
    private readonly responsibilityAreasService: ResponsibilityAreasService,
    private readonly indicatorSiacService: IndicatorSiacService,
    private readonly componentUvmService: ComponentUvmService,
    private readonly indicatorUvmService: IndicatorUvmService,
    private readonly subindicatorUvmService: SubindicatorUvmService,
    private readonly normativeService: NormativeService,
    private readonly evidencesService: EvidencesCatalogService,
    private users: UsersService
  ) {
    this.title = ModalTitle.NEW;
    this.data = new ConfiguracionIndicadorSiacDTOV1();
    this.edit = null;
    this.disabled = null;
    this.permission = null;
    this.evaluationElementList = [];
    this.searchEvaluationElementList = [];
    this.cycleList = [];
    this.institutionList = [];
    this.proccessList = [];
    this.responsibilityAreaList = [];
    this.generica = true;
    this.levelModalityList = [];
    this.indicatorSiacList = [];
    this.componenteUVMList = [];
    this.indicadorUVMList = [];
    this.subIndicadorUVMList = [];
    this.normativeList = [];
    this.evicenceList = [];
    this.archivos = [];
    this.subscription = new Subscription();
    this.field = false;
    this.cfgIndicatorRecordForm = this.formBuilder.group({
      confElementoEvaluacionId: [null, [Validators.required]],
      anio: [{ value: null, disabled: true }],
      ciclo: [{ value: null, disabled: true }],
      institucion: [{ value: null, disabled: true }],
      proccessString: [{ value: null, disabled: true }],
      catPeriodoEvaluacionId: [null],
      areaResponsable: [{ value: null, disabled: true }],
      responsibilityAreaType: [{ value: null, disabled: true }],
      nivelModalidad: [{ value: null, disabled: true }],
      catIndicadorSiacId: [null, [Validators.required]],
      componenteUvmId: [null],
      indicadorUvmId: [null],
      subindicadorUvmId: [null],
      catNormativaId: [null, [Validators.required]],
      catEvidenciaId: [null, [Validators.required]],
      evidenceDescription: [{ value: null, disabled: true }],
      evidenceAmount: [{ value: null, disabled: true }],
      files: [null],
      activo: [true, []],
    });
  }

  ngOnInit(): void {
    this.title = this.indicadorData ? ModalTitle.EDIT : ModalTitle.NEW;
    this.getAllEvaluationElements();
    this.getAllIndicatorSiac();
    this.getAllComponentsUvm();
    Promise.all([this.indicatorUvmService.setAllIndicatorsUvm()]).then(() => {});
    Promise.all([this.subindicatorUvmService.setAllSubIndicatorsUvm()]).then(() => {});
    this.getAllNormatives();
    this.getAllEvidences();

    if (this.indicadorData) {
      this.configurationIndicatorSiacService
        .getConfigurationIndicatorSiacById(this.indicadorData.data.id)
        .subscribe((response) => {
          if (!response.output) {
            return;
          }
          const data = new ConfiguracionIndicadorSiacDTOV1().deserialize(response.output[0]);
          this.data = data;
          this.setProccessString(data.proceso);
          this.getResponsibilityAreaById(data.catAreaResponsableId);
          Promise.all([
            this.setIndicatorsUVM(data.componenteUvmId),
            this.setSubindicatorsUVM(data.componenteUvmId, data.indicadorUvmId),
          ]).then(() => {});
          this.getEvidenceById(data.catEvidenciaId);
          this.cfgIndicatorRecordForm.patchValue(data);
          this.cfgIndicatorRecordForm.get('confElementoEvaluacionId').disable();
          this.cfgIndicatorRecordForm.get('catIndicadorSiacId').disable();
          this.trackingStatusForm();
        });
    } else {
      this.trackingStatusForm();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submit(): void {
    this.saveConfigurationIndicatorSIAC();
  }

  private async saveConfigurationIndicatorSIAC(): Promise<void> {
    this.cfgIndicatorRecordForm.markAllAsTouched();
    if (this.cfgIndicatorRecordForm.invalid) {
      Alert.error('Verifique que los campos sean correctos');
      return;
    }
    clearForm(this.cfgIndicatorRecordForm);
    const tmp = this.cfgIndicatorRecordForm.getRawValue();
    const indicadorDto: ConfiguracionIndicadorSiacAddUpdateDTOV1 = new ConfiguracionIndicadorSiacAddUpdateDTOV1();
    indicadorDto.catIndicadorSiacId = tmp.catIndicadorSiacId;
    indicadorDto.componenteUvmId = tmp.componenteUvmId;
    indicadorDto.indicadorUvmId = tmp.indicadorUvmId;
    indicadorDto.subindicadorUvmId = tmp.subindicadorUvmId;
    indicadorDto.catNormativaId = tmp.catNormativaId;
    indicadorDto.catEvidenciaId = tmp.catEvidenciaId;
    indicadorDto.confElementoEvaluacionId = tmp.confElementoEvaluacionId;
    for (let item of this.archivos) {
      const data = await this.uploadAzureStorageFile(item);
      indicadorDto.archivos.push(data.id);
    }
    indicadorDto.activo = tmp.activo;
    if (this.data.id) {
      indicadorDto.id = this.data.id;
      this.data.listaArchivos.forEach((file) => {
        indicadorDto.archivos.push(file.id);
      });
      indicadorDto.fechaCreacion = this.data.fechaCreacion;
      indicadorDto.usuarioCreacion = this.data.usuarioCreacion;
      indicadorDto.fechaModificacion = new Date();
      indicadorDto.usuarioModificacion = this.users.userSession.nombre;
      this.configurationIndicatorSiacService.updatConfigurationIndicatorSiac(indicadorDto).subscribe(() => {
        Alert.success('', 'Indicador actualizado correctamente');
        this.ref.close(true);
      });
    } else {
      indicadorDto.id = '0';
      indicadorDto.fechaCreacion = new Date();
      indicadorDto.usuarioCreacion = this.users.userSession.nombre;
      this.configurationIndicatorSiacService.createConfigurationIndicatorSiac(indicadorDto).subscribe(() => {
        Alert.success('', 'Indicador creado correctamente');
        this.ref.close(true);
      });
    }
  }

  private async uploadAzureStorageFile(params: FormData) {
    return this.configurationIndicatorSiacService.uploadAzureStorageFilePromise(params);
  }

  closeModalByConfimation(): void {
    if (!this.edit) {
      this.ref.close();
      return;
    }
    Alert.confirm('Alerta', '¿Está seguro de que desea salir? Los datos ingresados no serán guardados.').subscribe(
      (result) => {
        if (!result || !result.isConfirmed) {
          return;
        }
        this.ref.close();
      }
    );
  }

  // onElementEvaluationKeyUp(event: Event): void {
  //     const value = (event.target as HTMLInputElement).value;
  //     if (value.trim() === ' ') {
  //         return;
  //     }
  //     if (value.length < 3) {
  //         return;
  //     }
  //     setTimeout(() => { this.searchEvaluationElementList = this.search(value); }, 100);
  // }

  private search(filter: string): ElementoEvaluacionDTOV1[] {
    let value: string = filter.toLowerCase();
    return this.evaluationElementList.filter((item: ElementoEvaluacionDTOV1) => {
      (item.claveElementoEvaluacion + ' - ' + item.elementoEvaluacion).toLowerCase().includes(value);
    });
  }

  onEvaluationElementChange(event: MatSelectChange): void {
    this.getEvaluationElementById(event.value);
  }

  onComponenteUvmChange(event: MatSelectChange): void {
    this.indicadorUVMList = [];
    this.subIndicadorUVMList = [];
    Promise.all([this.setIndicatorsUVM(event.value)]).then(() => {});
  }

  onIndicatorUvmChange(event: MatSelectChange): void {
    this.subIndicadorUVMList = [];
    const componentUVMId: string | number = this.cfgIndicatorRecordForm.get('componenteUvmId').value;
    Promise.all([this.setSubindicatorsUVM(componentUVMId, event.value)]).then(() => {});
  }

  onEvidenceChange(event: MatSelectChange): void {
    this.getEvidenceById(event.value);
  }

  downloadFile(file: ConfigurationIndicatorSIACFile): void {
    this.configurationIndicatorSiacService
      .downloadAzureStorageFile(file.azureStorageFileId)
      .subscribe((response: any) => {
        if (response) {
          let blob = new Blob([response]);
          let nameFile = file.fileName;
          let url = window.URL.createObjectURL(blob);

          // IE doesn't allow using a blob object directly as link href
          // instead it is necessary to use msSaveOrOpenBlob
          if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
            blob = this.auto_bom(blob);
            (window.navigator as any).msSaveOrOpenBlob(blob, nameFile);
          }

          let a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.href = url;
          a.download = nameFile;
          a.click();
          window.URL.revokeObjectURL(url);
          a.parentNode.removeChild(a);

          setTimeout(() => {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(url);
          }, 100);
        }
      });
  }

  // downloadFile(file: ConfigurationIndicatorSIACFile): void {
  //     this.configurationIndicatorSiacService.downloadAzureStorageFile(file.azureStorageFileId)
  //         .subscribe(
  //             (response) => {
  //                 let blob = new Blob([response.body], { type: 'application/octet-stream' });
  //                 let nameFile = file.fileName;
  //                 let url = window.URL.createObjectURL(blob);

  //                 // IE doesn't allow using a blob object directly as link href
  //                 // instead it is necessary to use msSaveOrOpenBlob
  //                 if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
  //                     blob = this.auto_bom(blob);
  //                     (window.navigator as any).msSaveOrOpenBlob(blob, nameFile);
  //                 }

  //                 let a = document.createElement('a');
  //                 document.body.appendChild(a);
  //                 a.setAttribute('style', 'display: none');
  //                 a.href = url;
  //                 a.download = nameFile;
  //                 a.click();
  //                 window.URL.revokeObjectURL(url);
  //                 a.parentNode.removeChild(a);

  //                 setTimeout(() => {
  //                     // For Firefox it is necessary to delay revoking the ObjectURL
  //                     window.URL.revokeObjectURL(url);
  //                 }, 100);
  //                 // let filename: string = file.fileName
  //                 // let binaryData = [];
  //                 // binaryData.push(response.body);
  //                 // let downloadLink = document.createElement('a');
  //                 // downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: 'blob' }));
  //                 // downloadLink.setAttribute('download', filename);
  //                 // document.body.appendChild(downloadLink);
  //                 // downloadLink.click();
  //                 // document.body.removeChild(downloadLink);
  //             }
  //         )
  // }

  private auto_bom(blob: Blob): Blob {
    // prepend BOM for UTF-8 XML and text/* types (including HTML)
    // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
    if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(0xfeff), blob], { type: blob.type });
    }
    return blob;
  }

  deleteFile(file: ConfigurationIndicatorSIACFile): void {
    return;
  }

  private getAllEvaluationElements(): void {
    const filters = new TablePaginatorSearch();
    this.evaluationElement.getAllEvaluationElements(filters).subscribe((response) => {
      if (response.output) {
        this.searchEvaluationElementList = response.output.map((item) =>
          new ElementoEvaluacionDTOV1().deserialize(item)
        );
        this.evaluationElementList = response.output.map((item) => new ElementoEvaluacionDTOV1().deserialize(item));
      }
      if (this.evaluationElementList.length == 0) {
        this.cfgIndicatorRecordForm.get('confElementoEvaluacionId').disable();
      }
    });
  }

  private getEvaluationElementById(id: string | number): void {
    this.evaluationElement.getEvaluationElementById(id).subscribe((response) => {
      if (response.output) {
        const data: ElementoEvaluacionDTOV1 = new ElementoEvaluacionDTOV1().deserialize(response.output[0]);
        this.setProccessString(data.proceso);
        this.getResponsibilityAreaById(data.catAreaResponsableId);
        this.cfgIndicatorRecordForm.patchValue(data);
      }
    });
  }

  private setProccessString(proccess: string | number): void {
    //this.cfgIndicatorRecordForm.get('proccessString').patchValue(`${proccess ? 'procedimiento_' + proccess : null}`);
    this.cfgIndicatorRecordForm.get('proccessString').patchValue(`${proccess ? proccess : null}`);
  }

  private getResponsibilityAreaById(responsibilityAreaId?: string | number): void {
    if (!responsibilityAreaId) {
      return;
    }
    this.responsibilityAreasService.getResponsibilityAreaById(responsibilityAreaId).subscribe((response) => {
      if (response.output) {
        const data = new AreaResponsableDTOV1().deserialize(response.output[0]);
        this.cfgIndicatorRecordForm
          .get('responsibilityAreaType')
          .patchValue(this.getResponsibilityAreaTypeString(data.generica), { emitEvent: false });
        const levelModalityIds: (string | number)[] = data.nivelModalidadIds
          ? data.nivelModalidadIds.trim().length > 0
            ? data.nivelModalidadIds.split(',')
            : []
          : [];
        const levelModality: string[] = data.nivelModalidad
          ? data.nivelModalidad.trim().length > 0
            ? data.nivelModalidad.split(',')
            : []
          : [];
        levelModalityIds.forEach((item: string | number, index) => {
          this.levelModalityList.push({ id: Number(item), nombre: levelModality[index] });
        });
      }
    });
  }

  private getResponsibilityAreaTypeString(type: boolean): string {
    return type ? 'Genérica' : 'Área de campus';
  }

  private getAllIndicatorSiac(): void {
    const filters = new TablePaginatorSearch();
    this.indicatorSiacService.getAllIndicatorsSiac(filters).subscribe((response) => {
      if (response.output) {
        this.indicatorSiacList = response.output.map((item) => new IndicadorSiacDTOV1().deserialize(item));
        if (this.indicatorSiacList.length == 0) {
          this.cfgIndicatorRecordForm.get('catIndicadorSiacId').disable();
        }
      }
    });
  }

  private getAllComponentsUvm(): void {
    const filters = new TablePaginatorSearch();
    this.componentUvmService.getAllComponentsUvm(filters).subscribe((response) => {
      if (response.output) {
        this.componenteUVMList = response.output.map((item) => new ComponenteUVMDTOV1().deserialize(item));
      }
    });
  }

  setIndicatorsUVM(value: string | number): Promise<boolean> {
    this.indicadorUVMList = [];
    return new Promise<boolean>((resolve, reject) => {
      this.indicadorUVMList = this.indicatorUvmService.indicatorUvmList.filter(
        (item: IndicadorUVMDTOV1) => item.componenteUvmId == value
      );
      resolve(true);
    });
  }

  setSubindicatorsUVM(componentUvm: string | number, indicatorUvm: string | number): Promise<boolean> {
    this.subIndicadorUVMList = [];
    return new Promise<boolean>((resolve, reject) => {
      this.subIndicadorUVMList = this.subindicatorUvmService.subIndicatorUvmList.filter(
        (item: SubIndicadorUVMDTOV1) => item.componenteUvmId == componentUvm && item.indicadorUvmId == indicatorUvm
      );
      resolve(true);
    });
  }

  getAllNormatives(): void {
    const filters = new TablePaginatorSearch();
    this.normativeService.getAllNormatives(filters).subscribe((response) => {
      if (response.output) {
        this.normativeList = response.output.map((nivelModalidad) => new NormativaDTOV1().deserialize(nivelModalidad));
      }
    });
  }

  getAllEvidences(): void {
    const filters = new TablePaginatorSearch();
    this.evidencesService.getAllEvidence(filters).subscribe((response) => {
      if (response.output) {
        this.evicenceList = response.output.map((item) => new EvidenceDTO().deserialize(item));
      }
    });
  }

  getEvidenceById(id: string | number): void {
    this.evidencesService.getEvidenceById(id).subscribe((response) => {
      if (response.output) {
        const data = new EvidenceDTO().deserialize(response.output[0]);
        this.cfgIndicatorRecordForm.get('evidenceDescription').patchValue(data.descripcion, { emitEvent: false });
        this.cfgIndicatorRecordForm.get('evidenceAmount').patchValue(data.cantidad, { emitEvent: false });
      }
    });
  }

  setFilesForUpload(files: File[]): void {
    this.archivos = [];
    files.forEach((item) => {
      if (item.size >= LIMIT_BLOB_SIZE_FILE) {
        Alert.error('El archivo' + item.name + ' no debe sobrepasar los 20 mb');
        return;
      }
      const formData: FormData = new FormData();
      formData.append('file', item, item.name);
      formData.append('FechaCreacion', DateHelper.convertToStringWithFormat(new Date(), DateHelper.FULL_DATE_FORMAT));
      formData.append('UsuarioCreacion', this.users.userSession.nombre);
      this.archivos.push(formData);
    });
    this.cfgIndicatorRecordForm.get('files').patchValue(this.archivos.length > 0 ? 1 : null, { emitEvent: true });
    this.cfgIndicatorRecordForm.updateValueAndValidity();
  }

  private trackingStatusForm(): void {
    this.subscription.add(this.cfgIndicatorRecordForm.statusChanges.subscribe(() => (this.edit = true)));
  }
}
