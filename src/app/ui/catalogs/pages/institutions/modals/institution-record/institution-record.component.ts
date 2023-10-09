import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { InstitutionService, UsersService } from 'src/app/core/services';
import { ValidatorService } from 'src/app/shared/validators';
import { Alert, clearForm } from 'src/app/utils/helpers';
import { /*InstitutionDTO,*/ InstitucionDTOV1, TablePaginatorSearch, UsuarioDTOV1, Vista } from 'src/app/utils/models';
import { InstitutionData } from './institution-record.service';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

export enum ModalTitle {
  NEW = 'Nueva institución',
  EDIT = 'Editar institución',
}

@Component({
  selector: 'app-institution-record',
  templateUrl: './institution-record.component.html',
  styleUrls: ['./institution-record.component.scss'],
})
export class InstitutionRecordComponent implements OnInit, OnDestroy {
  institutionRecordForm: UntypedFormGroup;
  title: ModalTitle;
  data: InstitucionDTOV1;
  edit: boolean;
  subscription: Subscription;
  disabled: boolean;
  permission: boolean;
  usuariosList: UsuarioDTOV1[];
  thisAccess: Vista;
  permissions: boolean[];
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly institutionData: InstitutionData,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly institutions: InstitutionService,
    private readonly ref: MatDialogRef<never>,
    private users: UsersService,
    private readonly validator: ValidatorService
  ) {
    this.title = ModalTitle.NEW;
    this.data = new InstitucionDTOV1();
    this.edit = null;
    this.disabled = null;
    this.permission = null;
    this.subscription = new Subscription();
    this.institutionRecordForm = this.formBuilder.group({
      //clave: [null, [Validators.required, Validators.maxLength(5), this.validator.noWhitespace]],
      institucion: [null, [Validators.required, Validators.maxLength(100), this.validator.noWhitespace]],
      //usuarioDirectorInstitutionalId: [null, [Validators.required]],
      activo: [true, []],
      // direccionInstitutional: [null, [Validators.maxLength(150)]],
    });
    this.permissions = [false, false, false];
  }

  ngOnInit() {
    this.setPermissions();
    this.disabled = !this.checkPermission(2);

    this.getAllUsers();
    this.title = this.institutionData ? ModalTitle.EDIT : ModalTitle.NEW;
    if (this.institutionData) {
      this.institutions.getInstitutionById(this.institutionData.data.id).subscribe((response) => {
        if (!response.output) {
          return;
        }
        const data = new InstitucionDTOV1().deserialize(response.output[0]);
        this.data = data;
        this.institutionRecordForm.patchValue(data);
        //this.institutionRecordForm.get('clave').disable();
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
        this.usuariosList = response.output.map((institution) => new UsuarioDTOV1().deserialize(institution));
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  submit(): void {
    this.institutionRecordForm.markAllAsTouched();
    if (this.institutionRecordForm.invalid) {
      Alert.error('Verifique que los campos sean correctos');
      return;
    }
    clearForm(this.institutionRecordForm);
    const tmp = this.institutionRecordForm.getRawValue();
    const institution: InstitucionDTOV1 = new InstitucionDTOV1().deserialize(tmp);
    if (this.data.id) {
      institution.id = this.data.id;
      institution.fechaCreacion = this.data.fechaCreacion;
      institution.usuarioCreacion = this.data.usuarioCreacion;
      institution.fechaModificacion = new Date();
      institution.usuarioModificacion = this.users.userSession.nombre;
      this.institutions.updateInstitution(institution).subscribe(() => {
        Alert.success('', 'Región actualizada correctamente');
        this.ref.close(true);
      });
    } else {
      institution.id = '0';
      institution.fechaCreacion = new Date();
      institution.usuarioCreacion = this.users.userSession.nombre;
      this.institutions.createInstitution(institution).subscribe(() => {
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
    this.subscription.add(this.institutionRecordForm.statusChanges.subscribe(() => (this.edit = true)));
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
