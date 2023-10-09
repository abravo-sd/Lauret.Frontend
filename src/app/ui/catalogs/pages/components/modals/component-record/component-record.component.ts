import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ComponentsService, EvaluationElementCatalogService, UsersService } from 'src/app/core/services';
import { ValidatorService } from 'src/app/shared/validators';
import { Alert, clearForm } from 'src/app/utils/helpers';
import {
  NivelModalidadDTOV1,
  ComponenteDTO,
  ComponenteDTOV1,
  Vista,
  CatalogoElementoEvaluacionDTOV1,
  ElementoEvaluacionDTOV1,
  TablePaginatorSearch,
} from 'src/app/utils/models';
import { ComponentData } from './component-record.service';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

export enum ModalTitle {
  NEW = 'Nuevo componente',
  EDIT = 'Editar componente',
}
@Component({
  templateUrl: './component-record.component.html',
  styleUrls: ['./component-record.component.scss'],
})
export class ComponentsRecordComponent implements OnInit, OnDestroy {
  componentRecordForm: FormGroup;
  //j031 
  evaluationElementList: CatalogoElementoEvaluacionDTOV1[];

  title: ModalTitle;
  data: ComponenteDTOV1;
  edit: boolean;
  subscription: Subscription;
  disabled: boolean;
  permission: boolean;
  thisAccess: Vista;
  permissions: boolean[];
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly componentsData: ComponentData,
    private readonly formBuilder: FormBuilder,
    private readonly ref: MatDialogRef<never>,
    private users: UsersService,
    private components: ComponentsService,
    private readonly validator: ValidatorService,

    public readonly evaluationElement: EvaluationElementCatalogService
  ) {
    this.title = ModalTitle.NEW;
    this.data = new ComponenteDTOV1();
    this.edit = null;
    this.disabled = null;
    this.permission = null;
    this.subscription = new Subscription();
    this.componentRecordForm = this.formBuilder.group({
      clave: [null, [Validators.required, Validators.maxLength(50), this.validator.noWhitespace]],
      nombre: [null, [Validators.required, Validators.maxLength(150), this.validator.noWhitespace]],
      activo: [true, []],
      elementosEvaluacion: [null, [Validators.required]],
    });
    this.permissions = [false, false, false];
    this.evaluationElementList = [];
  }

  ngOnInit(): void {
    this.setPermissions();
    this.disabled = !this.checkPermission(2);

    this.title = this.componentsData ? ModalTitle.EDIT : ModalTitle.NEW;

    //todo j031
    this.getEvaluationElementList();

    if (this.componentsData) {
      const data = new ComponenteDTOV1().deserialize(this.componentsData.data);
      
      this.data = data;
      
      //Obtenemos un ids para el check multiple de elementosEvaluacion
      this.evaluationElement.getEvaluationItemIdsByComponent(this.data.id).subscribe((response) => {
        if (response.output) {
          this.data.elementosEvaluacion = response.output;
        }
        this.componentRecordForm.patchValue(data);
      });

      this.componentRecordForm.get('clave').disable();
      

      this.trackingStatusForm();
      // this.components.getComponentsById(this.componentsData.data.id).subscribe((response) => {
      //     if (!response.data) {
      //         return;
      //     }
      //     const data = new ComponenteDTOV1().deserialize(response.data);
      //     this.data = data;
      //     this.componentRecordForm.patchValue(data);
      //     this.componentRecordForm.get('componenteId').disable();
      //     this.trackingStatusForm();
      // });
    } else {
      this.trackingStatusForm();
    }
    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

  submit(): void {
    this.componentRecordForm.markAllAsTouched();
    if (this.componentRecordForm.invalid) {
      Alert.error('Verifique que los campos sean correctos');
      return;
    }
    clearForm(this.componentRecordForm);
    const tmp = this.componentRecordForm.getRawValue();
    const component: ComponenteDTOV1 = new ComponenteDTOV1().deserialize(tmp);
    if (this.data.id) {
      component.id = this.data.id;
      component.fechaCreacion = this.data.fechaCreacion;
      component.usuarioCreacion = this.data.usuarioCreacion;
      component.fechaModificacion = new Date();
      component.usuarioModificacion = this.users.userSession.nombre;
      this.components.updateComponent(component).subscribe(() => {
        Alert.success('', 'Componente actualizado correctamente');
        this.ref.close(true);
      });
    } else {
      component.id = '0';
      component.fechaCreacion = new Date();
      component.usuarioCreacion = this.users.userSession.nombre;
      this.components.createComponent(component).subscribe(() => {
        Alert.success('', 'Componente creado correctamente');
        this.ref.close(true);
      });
    }
  }

  private trackingStatusForm(): void {
    this.subscription.add(this.componentRecordForm.statusChanges.subscribe(() => (this.edit = true)));
  }

  private setPermissions(): void {
    this.thisAccess = this.users.userSession.vistas.find((element) => element.vistaId == ModuleIdV2.CAT_COMPONENTE);

    if (
      this.thisAccess &&
      this.thisAccess.tipoAcceso &&
      this.thisAccess.tipoAcceso.length &&
      this.thisAccess.tipoAcceso.length > 0
    ) {
      // consulta
      this.thisAccess.tipoAcceso.forEach((element, _index) => {
        if (element.id == 1) this.permissions[0] = true;
        if (element.id == 2) this.permissions[1] = true;
        if (element.id == 3) this.permissions[2] = true;
      });
    }
  }

  private getEvaluationElementList(): void {
    const filters = new TablePaginatorSearch();

    this.evaluationElement.getAllEvaluationElementsCatalogs(filters).subscribe((response) => {
      if (response.output) {
        this.evaluationElementList = response.output.map((item) =>
          new CatalogoElementoEvaluacionDTOV1().deserialize(item)
        );
        // aoeu
        // this.componentRecordForm.
      }
    });
  }


  checkPermission(p: number): boolean {
    return this.permissions[p];
  }
}
