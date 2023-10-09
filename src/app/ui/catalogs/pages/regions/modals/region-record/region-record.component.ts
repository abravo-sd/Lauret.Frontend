import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { RegionsService, UsersService } from 'src/app/core/services';
import { ValidatorService } from 'src/app/shared/validators';
import { Alert, clearForm } from 'src/app/utils/helpers';
import { RegionDTO, RegionDTOV1, TablePaginatorSearch, UsuarioDTOV1, Vista } from 'src/app/utils/models';
import { RegionData } from './region-record.service';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

export enum ModalTitle {
  NEW = 'Nueva región',
  EDIT = 'Editar región',
}

@Component({
  selector: 'app-region-record',
  templateUrl: './region-record.component.html',
  styleUrls: ['./region-record.component.scss'],
})
export class RegionRecordComponent implements OnInit, OnDestroy {
  regionRecordForm: FormGroup;
  title: ModalTitle;
  data: RegionDTOV1;
  edit: boolean;
  subscription: Subscription;
  disabled: boolean;
  permission: boolean;
  usuariosList: UsuarioDTOV1[];
  thisAccess: Vista;
  permissions: boolean[];
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly regionData: RegionData,
    private readonly formBuilder: FormBuilder,
    private readonly regions: RegionsService,
    private readonly ref: MatDialogRef<never>,
    private users: UsersService,
    private readonly validator: ValidatorService
  ) {
    this.title = ModalTitle.NEW;
    this.data = new RegionDTOV1();
    this.edit = null;
    this.disabled = null;
    this.permission = null;
    this.subscription = new Subscription();
    this.regionRecordForm = this.formBuilder.group({
      clave: [null, [Validators.required, Validators.maxLength(5), this.validator.noWhitespace]],
      nombre: [null, [Validators.required, Validators.maxLength(100), this.validator.noWhitespace]],
      usuarioDirectorRegionalId: [null, [Validators.required]],
      activo: [true, []],
      // direccionRegional: [null, [Validators.maxLength(150)]],
    });
    this.permissions = [false, false, false];
  }

  ngOnInit() {
    this.setPermissions();
    this.disabled = !this.checkPermission(2);

    this.getAllUsers();
    this.title = this.regionData ? ModalTitle.EDIT : ModalTitle.NEW;
    if (this.regionData) {
      this.regions.getRegionById(this.regionData.data.id).subscribe((response) => {
        if (!response.output) {
          return;
        }
        const data = new RegionDTOV1().deserialize(response.output[0]);
        this.data = data;
        this.regionRecordForm.patchValue(data);
        this.regionRecordForm.get('clave').disable();
        this.trackingStatusForm();
      });
    } else {
      this.trackingStatusForm();
    }
  }

  private getAllUsers(): void {
    const filters = new TablePaginatorSearch();
    filters.pageSize = -1;
    this.users.getAllUsers(filters).subscribe((response) => {
      if (response.output) {
        this.usuariosList = response.output.map((region) => new UsuarioDTOV1().deserialize(region));
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submit(): void {
    this.regionRecordForm.markAllAsTouched();
    if (this.regionRecordForm.invalid) {
      Alert.error('Verifique que los campos sean correctos');
      return;
    }
    clearForm(this.regionRecordForm);
    const tmp = this.regionRecordForm.getRawValue();
    const region: RegionDTOV1 = new RegionDTOV1().deserialize(tmp);
    if (this.data.id) {
      region.id = this.data.id;
      region.regionId = region.nombre;
      region.fechaCreacion = this.data.fechaCreacion;
      region.usuarioCreacion = this.data.usuarioCreacion;
      region.fechaModificacion = new Date();
      region.usuarioModificacion = this.users.userSession.nombre;
      region.usuarioDirectorRegionalId = region.usuarioDirectorRegionalId;
      this.regions.updateRegion(region).subscribe(() => {
        Alert.success('', 'Región actualizada correctamente');
        this.ref.close(true);
      });
    } else {
      region.id = '0';
      region.regionId = region.nombre;
      region.fechaCreacion = new Date();
      region.usuarioCreacion = this.users.userSession.nombre;
      region.usuarioDirectorRegionalId = region.usuarioDirectorRegionalId;
      this.regions.createRegion(region).subscribe(() => {
        Alert.success('', 'Región creada correctamente');
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
        this.ref.close(result);
      }
    );
  }

  private trackingStatusForm(): void {
    this.subscription.add(this.regionRecordForm.statusChanges.subscribe(() => (this.edit = true)));
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
}
