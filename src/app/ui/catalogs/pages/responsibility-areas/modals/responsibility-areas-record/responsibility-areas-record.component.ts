import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';
import {
    LevelAttentionService,
    LevelModalityService,
    ResponsibilityAreasService,
    UsersService,
} from 'src/app/core/services';
import { ValidatorService } from 'src/app/shared/validators';
import { Alert, clearForm } from 'src/app/utils/helpers';
import {
    AreaResponsableDTO,
    AreaResponsableDTOV1,
    NivelAtencionDTO,
    NivelModalidadDTO,
    NivelModalidadDTOV1,
    NivelOrganizacionalDTO,
    TablePaginatorSearch, Vista
} from 'src/app/utils/models';
import { AreaResponsableData } from './responsibility-areas-record.service';
import { DependencyAreaService } from 'src/app/core/services/api/dependency-area/dependency-area.service';
import { DependenciaAreaDTOV1 } from 'src/app/utils/models/dependencia-area.dto.v1';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';

export enum ModalTitle {
    NEW = 'Nueva área responsable',
    EDIT = 'Editar área responsable',
}
@Component({
    templateUrl: './responsibility-areas-record.component.html',
    styleUrls: ['./responsibility-areas-record.component.scss'],
})
export class ResponsibilityAreasRecordComponent implements OnInit, OnDestroy {
    title: ModalTitle;
    responsibilityForm: UntypedFormGroup;
    levelAttentionList: NivelAtencionDTO[];
    levelModalityList: NivelModalidadDTOV1[];
    responsabilityAreaList: AreaResponsableDTOV1[];
    dependencyAreaList: DependenciaAreaDTOV1[];
    subscription: Subscription;
    data: AreaResponsableDTOV1;
    status: boolean;
    private duplicateValue: boolean;
    tempList: AreaResponsableDTOV1[];
    disabled: boolean;
    edit: boolean;
    
    thisAccess: Vista;
    permissions: boolean[];
    constructor(
        @Inject(MAT_DIALOG_DATA) public readonly areaResponsableData: AreaResponsableData,
        private readonly ref: MatDialogRef<never>,
        private readonly matDialogRef: MatDialogRef<boolean>,
        private readonly formBuilder: UntypedFormBuilder,
        private readonly levelAttention: LevelAttentionService,
        private readonly responsibilityAreas: ResponsibilityAreasService,
        private readonly validator: ValidatorService,
        private readonly levelModality: LevelModalityService,
        private readonly dependencyArea: DependencyAreaService,
        private users: UsersService
    ) {
        this.title = ModalTitle.NEW;
        this.data = new AreaResponsableDTOV1();
        this.levelAttentionList = [];
        this.tempList = [];
        this.levelModalityList = [];
        this.responsabilityAreaList = [];
        this.subscription = new Subscription();
        this.status = false;
        this.duplicateValue = false;
        this.responsibilityForm = this.formBuilder.group({
            //clave: [null, [Validators.required, Validators.maxLength(50), this.validator.noWhitespace]],
            nombre: [null, [Validators.required, Validators.maxLength(150), this.validator.noWhitespace]],
            nivelesModalidad: [null, [Validators.required]],
            catDependenciaAreaId: [null, [Validators.required]],
            generica: [false, []],
            consolidacion: [false, []],
            activo: [true, []],
        });
        this.permissions = [false, false, false];
        this.disabled = null;
        this.edit = null;
        
    }

    ngOnInit(): void {
        this.setPermissions();
        this.disabled = !this.checkPermission(2);
        this.title = this.areaResponsableData ? ModalTitle.EDIT : ModalTitle.NEW;
        //this.getAllResponsabilitysAreas();
        this.getAllDependencyAreas();
        this.getAllLevelModality();
        if (this.areaResponsableData) {
            this.responsibilityAreas.getResponsibilityAreaById(this.areaResponsableData.data.id).subscribe((response) => {
                if (!response.output) {
                    return;
                }
                const data: AreaResponsableDTOV1 = new AreaResponsableDTOV1().deserialize(response.output[0]);
                this.data = data;
                this.responsibilityForm.patchValue(data);
                //this.responsibilityForm.get('clave').disable();
                /*         const levelModalityIdList: string = this.data.nivelModalidades.map((i) => i.id).join();
                        this.responsibilityForm.get('nivelModalidades').setValue(levelModalityIdList);
                        this.responsibilityForm.get('nivelModalidades').updateValueAndValidity(); */

                const niveles = data.nivelModalidadIds.split(',');
                let nivelesIds: number[] = [];
                niveles.forEach((x) => {
                    nivelesIds.push(Number(x));
                });
                // const levelModalityIdList: string[] = this.data.nivelModalidades.map((i) => i.nivelModalidadId);

                this.responsibilityForm.get('nivelesModalidad').setValue(nivelesIds);
                this.responsibilityForm.get('nivelesModalidad').updateValueAndValidity();

                this.responsibilityForm.get('generica').setValue(this.data.generica);
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
        if (this.duplicateValue) {
            Alert.error('', 'El nombre y la dependencia no deben ser iguales.');
            this.responsibilityForm.setErrors({ nombre: true });
            return;
        }
        this.responsibilityForm.markAllAsTouched();
        if (this.responsibilityForm.invalid) {
            Alert.error('Verifique que los campos sean correctos');
            return;
        }
        clearForm(this.responsibilityForm);
        const tmp = this.responsibilityForm.getRawValue();
        const areaResponsable: AreaResponsableDTOV1 = new AreaResponsableDTOV1().deserialize(tmp);
        const levelModalityList: NivelModalidadDTOV1[] = this.levelModalityList.filter((i) => tmp.nivelModalidades == i.id);
        areaResponsable.nivelModalidades = levelModalityList;
        if (this.data.id) {
            areaResponsable.id = this.data.id;
            areaResponsable.fechaCreacion = this.data.fechaCreacion;
            areaResponsable.usuarioCreacion = this.data.usuarioCreacion;
            areaResponsable.fechaModificacion = new Date();
            areaResponsable.usuarioModificacion = this.users.userSession.nombre;
            this.responsibilityAreas.updateResponsibilityArea(areaResponsable).subscribe(() => {
                Alert.success('', 'Área responsable actualizado correctamente');
                this.ref.close(true);
            });
        } else {
            areaResponsable.id = '0';
            areaResponsable.fechaCreacion = new Date();
            areaResponsable.usuarioCreacion = this.users.userSession.nombre;
            this.responsibilityAreas.createResponsibilityArea(areaResponsable).subscribe(() => {
                Alert.success('', 'Area responsable creado correctamente');
                this.ref.close(true);
            });
        }
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

    checkRepeatedName($event: MatSelectChange) {
        const newname: string = this.responsibilityForm.controls['nombre'].value;
    }
    private getAllLevelAttention(): void {
        const filter = new TablePaginatorSearch();
        filter.inactives = true;
        this.levelAttention.getAllLevelAttention(filter).subscribe((response) => {
            if (response.data.data) {
                const data: NivelAtencionDTO[] = response.data.data.map((area) => new NivelAtencionDTO().deserialize(area));
                this.levelAttentionList = data.filter((item) => item.activo === true);
            }
        });
    }

    setSituationValidate($event: MatSelectChange) {
        const newname = this.responsibilityForm.controls['nombre'].value;
        const levelModalityList: AreaResponsableDTOV1 = this.responsabilityAreaList.find((i) => $event.value == i.id);
        if (levelModalityList != undefined) {
            if (levelModalityList.nombre == newname) {
                this.duplicateValue = true;
            } else {
                this.duplicateValue = false;
            }
        } else this.duplicateValue = false;
    }

    private getAllLevelModality(): void {
        const filter: TablePaginatorSearch = new TablePaginatorSearch();
        filter.inactives = true;
        this.levelModality.getAllLevelModality(filter).subscribe((response) => {
            if (response.output) {
                const data: NivelModalidadDTOV1[] = response.output.map((nivelModalidad) =>
                    new NivelModalidadDTOV1().deserialize(nivelModalidad)
                );
                this.levelModalityList = data.filter((item) => item.activo === true);
            }
        });
    }

    private getAllResponsabilitysAreas(): void {
        const filter: TablePaginatorSearch = new TablePaginatorSearch();
        filter.inactives = true;
        filter.pageSize = 100;
        this.responsibilityAreas.getAllResponsibilityAreas(filter).subscribe((response) => {
            if (response.output) {
                const data: AreaResponsableDTOV1[] = response.output.map((areaResponsable) =>
                    new AreaResponsableDTOV1().deserialize(areaResponsable)
                );
                this.responsabilityAreaList = data;
            }
        });
    }


    private getAllDependencyAreas(): void {
        const filter: TablePaginatorSearch = new TablePaginatorSearch();
        filter.inactives = true;
        filter.pageSize = 100;
        this.dependencyArea.getAllDependenciaAreas(filter).subscribe((response) => {
            if (response.output) {
                const data: DependenciaAreaDTOV1[] = response.output.map((areaResponsable) =>
                    new DependenciaAreaDTOV1().deserialize(areaResponsable)
                );
                this.dependencyAreaList = data;
            }
        });
    }

    // private trackingStatusForm(): void {
    //     this.subscription.add(this.responsibilityForm.statusChanges.subscribe(() => (this.status = true)));
    // }

    private trackingStatusForm(): void {
        this.subscription.add(this.responsibilityForm.statusChanges.subscribe(() => (this.edit = true)));
        // this.subscription.add(this.responsibilityForm.statusChanges.subscribe(() => (this.edit = true)));
    }
    private setPermissions(): void {
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_AREAS_RESPONSABLE);

        if (this.thisAccess && this.thisAccess.tipoAcceso && this.thisAccess.tipoAcceso.length && this.thisAccess.tipoAcceso.length > 0)   // consulta
        {
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
