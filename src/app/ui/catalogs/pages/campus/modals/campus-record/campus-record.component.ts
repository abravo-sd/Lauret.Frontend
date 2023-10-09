import { LevelModalityService } from './../../../../../../core/services/api/level-modality/level-modality.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CampusService, RegionsService, UsersService } from 'src/app/core/services';
import { ValidatorService } from 'src/app/shared/validators';
import { Alert, clearForm } from 'src/app/utils/helpers';
import {
  CampusDTO,
  CampusDTOV1,
  NivelModalidadDTO,
  NivelModalidadDTOV1,
  RegionDTO,
  RegionDTOV1,
  TablePaginatorSearch,
  Vista,
} from 'src/app/utils/models';
import { CampusData } from './campus-record.service';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

export enum ModalTitle {
  NEW = 'Nuevo campus',
  EDIT = 'Editar campus',
}

@Component({
  selector: 'app-campus-record',
  templateUrl: './campus-record.component.html',
  styleUrls: ['./campus-record.component.scss'],
})
export class CampusRecordComponent implements OnInit, OnDestroy {
  campusRecordForm: FormGroup;
  title: ModalTitle;
  data: CampusDTOV1;
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
    public readonly campusData: CampusData,
    public readonly levelModality: LevelModalityService,
    private readonly formBuilder: FormBuilder,
    private readonly campus: CampusService,
    private readonly ref: MatDialogRef<never>,
    private regions: RegionsService,
    private users: UsersService,
    private readonly validator: ValidatorService
  ) {
    this.title = ModalTitle.NEW;
    this.data = new CampusDTOV1();
    this.edit = null;
    this.disabled = null;
    this.permission = null;
    this.regionList = [];
    this.levelModalityList = [];
    this.subscription = new Subscription();
    this.campusRecordForm = this.formBuilder.group({
      clave: [null, [Validators.required, Validators.maxLength(50), this.validator.noWhitespace]],
      nombre: [null, [Validators.required, Validators.maxLength(500), this.validator.noWhitespace]],
      regionId: [null, [Validators.required]],
      nivelesModalidad: [null, [Validators.required]],
      activo: [true, []],
    });
    this.permissions = [false, false, false];
  }

  ngOnInit() {
    this.setPermissions();
    this.disabled = !this.checkPermission(2);
    this.title = this.campusData ? ModalTitle.EDIT : ModalTitle.NEW;
    this.getAllRegions();
    this.getAllLevelModality();
    if (this.campusData) {
      this.campus.getCampusById(this.campusData.data.id).subscribe((response) => {
        if (!response.output) {
          return;
        }
        const data = new CampusDTOV1().deserialize(response.output[0]);
        this.data = data;
        this.campusRecordForm.patchValue(data);
        const niveles = data.nivelModalidadIds.split(',');
        let nivelesIds: number[] = [];
        niveles.forEach((x) => {
          nivelesIds.push(Number(x));
        });
        // const levelModalityIdList: string[] = this.data.nivelModalidades.map((i) => i.nivelModalidadId);

        this.campusRecordForm.get('nivelesModalidad').setValue(nivelesIds);
        this.campusRecordForm.get('nivelesModalidad').updateValueAndValidity();

        this.campusRecordForm.get('regionId').setValue(data.idRegion);
        this.campusRecordForm.get('regionId').updateValueAndValidity();
        this.campusRecordForm.get('clave').disable();
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
    this.campusRecordForm.markAllAsTouched();
    if (this.campusRecordForm.invalid) {
      Alert.error('Verifique que los campos sean correctos');
      return;
    }
    clearForm(this.campusRecordForm);
    const tmp = this.campusRecordForm.getRawValue();
    const campus: CampusDTOV1 = new CampusDTOV1().deserialize(tmp);
    const levelModalityList = this.levelModality.list.filter((i) => tmp.nivelModalidades.includes(i.id));
    campus.nivelModalidades = levelModalityList;
    if (this.data.id) {
      campus.id = this.data.id;
      campus.fechaCreacion = this.data.fechaCreacion;
      campus.usuarioCreacion = this.data.usuarioCreacion;
      campus.fechaModificacion = new Date();
      campus.usuarioModificacion = this.users.userSession.nombre;
      this.campus.updateCampus(campus).subscribe(() => {
        Alert.success('', 'Campus actualizado correctamente');
        this.ref.close(true);
      });
    } else {
      campus.id = '0';
      campus.fechaCreacion = new Date();
      campus.usuarioCreacion = this.users.userSession.nombre;
      this.campus.createCampus(campus).subscribe(() => {
        Alert.success('', 'Campus creado correctamente');
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
    this.subscription.add(this.campusRecordForm.statusChanges.subscribe(() => (this.edit = true)));
  }

  private getAllRegions(): void {
    const filters = new TablePaginatorSearch();
    this.regions.getAllRegions(filters).subscribe((response) => {
      if (response.output) {
        this.regionList = response.output.map((region) => new RegionDTOV1().deserialize(region));
      }
    });
  }

  private getAllLevelModality(): void {
    const filters = new TablePaginatorSearch();
    this.levelModality.getAllLevelModality(filters).subscribe((response) => {
      if (response.output) {
        this.levelModalityList = response.output.map((item) => new NivelModalidadDTOV1().deserialize(item));
      }
    });
  }

  private setPermissions(): void {
    this.thisAccess = this.users.userSession.vistas.find((element) => element.vistaId == ModuleIdV2.CAT_CAMPUS);

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
}
