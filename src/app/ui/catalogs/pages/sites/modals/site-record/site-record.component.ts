import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SitesService, UsersService } from 'src/app/core/services';
import { ValidatorService } from 'src/app/shared/validators';
import { Alert, clearForm } from 'src/app/utils/helpers';
import { SedeDTO, SedeDTOV1 } from 'src/app/utils/models';
import { SiteData } from './site-record.service';

export enum ModalTitle {
  NEW = 'Nueva Sede',
  EDIT = 'Editar Sede',
}

@Component({
  selector: 'app-site-record',
  templateUrl: './site-record.component.html',
  styleUrls: ['./site-record.component.scss'],
})
export class SiteRecordComponent implements OnInit, OnDestroy {
  siteRecordForm: FormGroup;
  title: ModalTitle;
  data: SedeDTOV1;
  edit: boolean;
  subscription: Subscription;
  disabled: boolean;
  permission: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly siteData: SiteData,
    private readonly formBuilder: FormBuilder,
    private readonly sites: SitesService,
    private readonly ref: MatDialogRef<never>,
    private users: UsersService,
    private readonly validator: ValidatorService
  ) {
    // this.title = ModalTitle.NEW;
    this.data = new SedeDTOV1();
    this.edit = null;
    this.disabled = null;
    this.permission = null;
    this.subscription = new Subscription();
    this.siteRecordForm = this.formBuilder.group({
      clave: [null, [Validators.required, Validators.maxLength(50), this.validator.noWhitespace]],
      nombre: [null, [Validators.required, Validators.maxLength(500), this.validator.noWhitespace]],
      activo: [true, []],
    });
  }

  ngOnInit() {
    this.title = this.siteData ? ModalTitle.EDIT : ModalTitle.NEW;
    // this.siteRecordForm.disable();
    if (this.siteData) {
      const data = new SedeDTOV1().deserialize(this.siteData.data);
      this.data = data;
      this.siteRecordForm.patchValue(data);
      this.siteRecordForm.get('clave').setValue(this.data.sedeId);
      this.siteRecordForm.get('clave').updateValueAndValidity();
      this.siteRecordForm.get('clave').disable();
      this.siteRecordForm.get('nombre').disable();
      this.siteRecordForm.get('activo').disable();
      this.checkPermission();
      this.trackingStatusForm();
     /*  this.sites.getSiteById(this.siteData.data.id).subscribe((response) => {
        if (!response.output) {
          return;
        }
        const data = new SedeDTOV1().deserialize(response.output[0]);
        this.data = data;
        this.siteRecordForm.patchValue(data);
        this.siteRecordForm.get('clave').setValue(this.data.sedeId);
        this.siteRecordForm.get('clave').updateValueAndValidity();
        this.siteRecordForm.get('clave').disable();
        this.siteRecordForm.get('nombre').disable();
        this.siteRecordForm.get('activo').disable();
        this.checkPermission();
        this.trackingStatusForm();
      }); */
    } else {
      this.checkPermission();
      this.trackingStatusForm();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submit(): void {
    this.siteRecordForm.markAllAsTouched();
    if (this.siteRecordForm.invalid) {
      Alert.error('Verifique que los campos sean correctos');
      return;
    }
    clearForm(this.siteRecordForm);
    const tmp = this.siteRecordForm.getRawValue();
    const site: SedeDTOV1 = new SedeDTOV1().deserialize(tmp);
    if (this.data.id) {
      site.id = this.data.id;
      site.fechaCreacion = this.data.fechaCreacion;
      site.usuarioCreacion = this.data.usuarioCreacion;
      site.fechaModificacion = new Date();
      site.usuarioModificacion = this.users.userSession.nombre;
      this.sites.updateSite(site).subscribe(() => {
        Alert.success('', 'Sede actualizada correctamente');
        this.ref.close(true);
      });
    } else {
      site.id = '0';
      site.fechaCreacion = new Date();
      site.usuarioCreacion = this.users.userSession.nombre;
      this.sites.createSite(site).subscribe(() => {
        Alert.success('', 'Sede creada correctamente');
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
    this.subscription.add(this.siteRecordForm.statusChanges.subscribe(() => (this.edit = true)));
  }

  private checkPermission(): void {
    /* this.permission = this.users.checkPermission(Modules.REGION, true);
        if (!this.permission) {
          this.siteRecordForm.disable();
        } */
  }
}
