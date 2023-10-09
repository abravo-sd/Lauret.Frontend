import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ChapterService, CriteriaService, EvidenceTypeService, SchoolCareerService } from 'src/app/core/services';
import { ValidatorService } from 'src/app/shared/validators';
import { Alert } from 'src/app/utils/helpers';
import {
  CapituloDTO,
  CapituloDTOV1,
  CarreraDTO,
  CarreraDTOV1,
  CriterioDTO,
  CriterioDTOV1,
  TipoEvidenciaDTO,
} from 'src/app/utils/models';
import { CriteriaRecordData } from './criteria-record.service';

@Component({
  templateUrl: './criteria-record.component.html',
  styleUrls: ['./criteria-record.component.scss'],
})
export class CriteriaRecordComponent implements OnInit, OnDestroy {
  criteriaForm: FormGroup;
  evidenceTypeList: TipoEvidenciaDTO[];
  chaptersList: CapituloDTOV1[];
  careersList: CarreraDTOV1[];
  subscription: Subscription;
  status: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: CriteriaRecordData,
    private readonly matDialogRef: MatDialogRef<boolean>,
    private readonly formBuilder: FormBuilder,
    private readonly validator: ValidatorService,
    private readonly evidenceType: EvidenceTypeService,
    private readonly chapter: ChapterService,
    private readonly schoolCareer: SchoolCareerService,
    private readonly criteria: CriteriaService
  ) {
    this.chaptersList = this.chapter.chaptersList;
    this.evidenceTypeList = this.evidenceType.evidenceTypeList;
    this.careersList = this.schoolCareer.careersList;
    this.subscription = new Subscription();
    this.status = false;

    this.criteriaForm = this.formBuilder.group({
      // clave: [null, [Validators.required, Validators.maxLength(50), this.validator.noWhitespace]],
      // criterioId: [null, [Validators.required, Validators.maxLength(50), this.validator.noWhitespace]],
      descripcion: [null, [Validators.required, Validators.maxLength(500), this.validator.noWhitespace]],
      capituloId: [null, [Validators.required]],
      // tipoEvidenciaId: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.criteriaForm.disable();
    if (this.data.data) {
      // this.criteriaForm.get('clave').disable();
      // this.criteriaForm.get('criterioId').disable();
      this.criteriaForm.patchValue(this.data.data);
    }
    this.trackingStatusForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeModalByConfimation(): void {
    if (!this.status) {
      this.matDialogRef.close();
      return;
    }
    Alert.confirm('Alerta', '¿Está seguro de que desea salir? Los datos ingresados no serán guardados.').subscribe(
      (result) => {
        if (!result || !result.isConfirmed) {
          return;
        }
        this.matDialogRef.close();
      }
    );
  }

  submit(): void {
    const formData = this.criteriaForm.getRawValue();
    const body = new CriterioDTOV1().deserialize(formData);
    body.carrera = this.getName(this.careersList, 'carreraId', body.carreraId);
    body.capitulo = this.getName(this.chaptersList, 'capituloId', body.capituloId);

    // body.tipoEvidenciaNombre = this.getName(this.evidenceTypeList, 'tipoEvidenciaId', body.tipoEvidenciaId);

    body.acreditadoraProcesoId = this.data.filters.acreditadoraProcesoId;
    body.carreraId = this.data.filters.carreraId;

    if (this.data.data) {
      this.criteria.updateCriteria(body).subscribe((response) => {
        if (response.exito) {
          Alert.success('', 'Criterio actualizado correctamente');
          this.matDialogRef.close(true);
        }
      });
    } else {
      this.criteria.createCriteria(body).subscribe((response) => {
        if (response.exito) {
          Alert.success('', 'Criterio creado correctamente');
          this.matDialogRef.close(true);
        }
      });
    }
  }

  private getName(list: any[], key: string, value: any): string {
    const find = list.find((item) => item[key] === value);
    return find && find.nombre ? find.nombre : '';
  }

  private trackingStatusForm(): void {
    this.subscription.add(
      this.criteriaForm.statusChanges.subscribe(() => {
        this.status = true;
      })
    );
  }
}
