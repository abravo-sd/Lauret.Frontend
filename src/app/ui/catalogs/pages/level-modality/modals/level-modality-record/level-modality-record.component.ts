import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { LevelModalityService, RegionsService, UsersService } from 'src/app/core/services';
import { ValidatorService } from 'src/app/shared/validators';
import { Alert, clearForm } from 'src/app/utils/helpers';
import {
  NivelModalidadDTO,
  NivelModalidadDTOV1,
  RegionDTO,
  RegionDTOV1,
  TablePaginatorSearch,
  Vista,
} from 'src/app/utils/models';
import { LevelModalityData } from './level-modality-record.service';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

export enum ModalTitle {
  NEW = 'Nuevo Nivel / Modalidad',
  EDIT = 'Editar Nivel / Modalidad',
}

@Component({
  selector: 'app-level-modality',
  templateUrl: './level-modality-record.component.html',
  styleUrls: ['./level-modality-record.component.scss'],
})
export class LevelModalityRecordComponent implements OnInit, OnDestroy {
  levelModalityRecordForm: FormGroup;
  title: ModalTitle;
  data: NivelModalidadDTOV1;
  edit: boolean;
  subscription: Subscription;
  disabled: boolean;
  permission: boolean;
  regionList: RegionDTOV1[];
  levelModalityList: NivelModalidadDTOV1[];
  thisAccess: Vista;
  permissions: boolean[];
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly levelModalityData: LevelModalityData,
    private readonly formBuilder: FormBuilder,
    private readonly levelModality: LevelModalityService,
    private readonly ref: MatDialogRef<never>,
    private regions: RegionsService,
    private users: UsersService,
    private readonly validator: ValidatorService
  ) {
    this.title = ModalTitle.NEW;
    this.data = new NivelModalidadDTOV1();
    this.edit = null;
    this.disabled = null;
    this.permission = null;
    this.regionList = [];
    this.levelModalityList = [];
    this.subscription = new Subscription();
    this.levelModalityRecordForm = this.formBuilder.group({
      clave: [null, [Validators.required, Validators.maxLength(10), this.validator.noWhitespace]],
      nivel: [null, [Validators.required, Validators.maxLength(100), this.validator.noWhitespace]],
      modalidad: [null, [Validators.required, Validators.maxLength(100), this.validator.noWhitespace]],
      activo: [true, []],
    });
    this.permissions = [false, false, false];
  }

  ngOnInit() {
    this.setPermissions();
    this.disabled = !this.checkPermission(2);
    this.title = this.levelModalityData ? ModalTitle.EDIT : ModalTitle.NEW;
    this.getAllRegions();
    if (this.levelModalityData) {
      this.levelModality.getLevelModalityById(this.levelModalityData.data.id).subscribe((response) => {
        if (!response.output) {
          return;
        }
        const data = new NivelModalidadDTOV1().deserialize(response.output[0]);
        this.data = data;
        this.levelModalityRecordForm.patchValue(data);
        this.levelModalityRecordForm.get('clave').disable();
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
    this.levelModalityRecordForm.markAllAsTouched();
    if (this.levelModalityRecordForm.invalid) {
      Alert.error('Verifique que los campos sean correctos');
      return;
    }
    clearForm(this.levelModalityRecordForm);
    const tmp = this.levelModalityRecordForm.getRawValue();
    const levelModality: NivelModalidadDTOV1 = new NivelModalidadDTOV1().deserialize(tmp);
    if (this.data.id) {
      levelModality.id = this.data.id;
      levelModality.fechaCreacion = this.data.fechaCreacion;
      levelModality.usuarioCreacion = this.data.usuarioCreacion;
      levelModality.fechaModificacion = new Date();
      levelModality.usuarioModificacion = this.users.userSession.nombre;
      this.levelModality.updateLevelModality(levelModality).subscribe(() => {
        Alert.success('', 'Nivel/Modalidad actualizado correctamente');
        this.ref.close(true);
      });
    } else {
      levelModality.id = '0';
      levelModality.fechaCreacion = new Date();
      levelModality.usuarioCreacion = this.users.userSession.nombre;
      this.levelModality.createLevelModality(levelModality).subscribe(() => {
        Alert.success('', 'Nivel/Modalidad creado correctamente');
        this.ref.close(true);
      });
    }
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

  private trackingStatusForm(): void {
    this.subscription.add(this.levelModalityRecordForm.statusChanges.subscribe(() => (this.edit = true)));
  }

  private setPermissions(): void {
    this.thisAccess = this.users.userSession.vistas.find((element) => element.vistaId == ModuleIdV2.CAT_REGIONES);

    if (
      this.thisAccess &&
      this.thisAccess.tipoAcceso &&
      this.thisAccess.tipoAcceso.length &&
      this.thisAccess.tipoAcceso.length > 0
    ) {
      // consulta
      this.thisAccess.tipoAcceso.forEach((element, index) => {
        if (element.id == 1) this.permissions[0] = true;
        if (element.id == 2) this.permissions[1] = true;
        if (element.id == 3) this.permissions[2] = true;
      });
    }
  }

  checkPermission(p: number): boolean {
    return this.permissions[p];
  }

  private getAllRegions(): void {
    const filters = new TablePaginatorSearch();
    this.regions.getAllRegions(filters).subscribe((response) => {
      if (response.output) {
        this.regionList = response.output.map((region) => new RegionDTOV1().deserialize(region));
      }
    });
  }
}
