import { NgModule } from '@angular/core';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ComponentsService, LevelModalityService, UsersService } from 'src/app/core/services';
import { WeightService } from 'src/app/core/services/api/weight/weight.service';

import { ValidatorService } from 'src/app/shared/validators';
import { Alert, clearForm } from 'src/app/utils/helpers';
import {
    ComponenteDTO,
    ComponenteDTOV1,
    NivelModalidadDTO,
    NivelModalidadDTOV1,
    PonderacionDTO,
    PonderacionDTOV1,
    TablePaginatorSearch,
    Vista
} from 'src/app/utils/models';
import { PonderacionData } from './weight-record.service';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';
import { MatTableDataSource } from '@angular/material/table';
export enum ModalTitle {
    NEW = 'Nueva ponderación',
    EDIT = 'Editar ponderación',
}
@Component({
    templateUrl: './weight-record.component.html',
    styleUrls: ['./weight-record.component.scss'],
})
export class WeightRecordComponent implements OnInit, OnDestroy {
    dataSource: MatTableDataSource<PonderacionDTOV1>;
    totalPuntuacion: number;
    ponderacionRecordForm: FormGroup;
    title: ModalTitle;
    data: PonderacionDTOV1;
    edit: boolean;
    subscription: Subscription;
    disabled: boolean;
    permission: boolean;
    componenteList: ComponenteDTOV1[];
    nivelModalidadList: NivelModalidadDTOV1[];
    thisAccess: Vista;
    permissions: boolean[];
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public readonly ponderacionData: PonderacionData,
        public readonly levelModality: LevelModalityService,
        private readonly formBuilder: FormBuilder,
        private readonly weight: WeightService,
        private readonly ref: MatDialogRef<never>,
        private componenteService: ComponentsService,
        private users: UsersService,
        private readonly validator: ValidatorService
    ) {
        this.title = ModalTitle.NEW;
        this.data = new PonderacionDTOV1();
        this.edit = null;
        this.disabled = null;
        this.permission = null;
        this.componenteList = [];
        this.nivelModalidadList = [];
        this.subscription = new Subscription();
        this.ponderacionRecordForm = this.formBuilder.group({
            nivelModalidadId: [null, [Validators.required]],
            componenteId: [null, [Validators.required]],
            puntuacion: [null, [Validators.required, Validators.min(0), Validators.max(100), this.validator.noWhitespace]],
            activo: [true, []]
        });

        this.dataSource = new MatTableDataSource<PonderacionDTOV1>([]);
        this.totalPuntuacion = 0;
        // this.dataSource.filterPredicate = function (record: PonderacionDTOV1, filter: string): boolean {
        //     return record.nivelModalidad.toLowerCase().includes(filter.toLowerCase()) ||
        //         record.nombre.toLowerCase().includes(filter.toLowerCase()) ||
        //         record.puntuacion.toString().toLowerCase().includes(filter.toLowerCase());
        // };
        this.permissions = [false, false, false];
    }

    ngOnInit(): void {
        this.setPermissions();
        this.disabled=!this.checkPermission(2);
        this.title = this.ponderacionData ? ModalTitle.EDIT : ModalTitle.NEW;
        this.getAllComponents();
        this.getAllNivelModality();
        if (this.ponderacionData) {
            const data = new PonderacionDTOV1().deserialize(this.ponderacionData.data);
            this.data = data;
            this.ponderacionRecordForm.patchValue(data);
            this.trackingStatusForm();
            this.ponderacionRecordForm.get('nivelModalidadId').setValue(data.idNivelModalidad);
            this.ponderacionRecordForm.get('nivelModalidadId').updateValueAndValidity();
            this.ponderacionRecordForm.get('nivelModalidadId').disable(); 
            this.ponderacionRecordForm.get('componenteId').disable();
            this.onNivelModalidadSelected(data.idNivelModalidad);
        } else {
            this.trackingStatusForm();
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    updatePuntuacion(row: PonderacionDTOV1, event: any) {
        const newValue = event.target.value;
        // Encuentra el índice del objeto 'row' dentro de la matriz de datos
        const rowIndex = this.dataSource.data.indexOf(row);
        console.log('nuevo valor: '+newValue);
        if (rowIndex !== -1) {
            // Actualiza la propiedad 'puntuacion' en el objeto 'row'
            row.puntuacion = parseFloat(newValue);

            // Actualiza la matriz de datos con el objeto modificado
            const updatedData = this.dataSource.data.slice();
            updatedData[rowIndex] = row;

            // Asigna la matriz de datos actualizada a 'dataSource'
            this.dataSource.data = updatedData;
        }
        this.actualizaTotalPuntuaciones();
    }

    public actualizaTotalPuntuaciones()
    {
        this.totalPuntuacion = 0;
         // Actualiza la suma de puntuaciones en la matriz de datos
        this.dataSource.data.forEach(item => {
            this.totalPuntuacion += item.puntuacion;
        });
        if (!isNaN(parseFloat(this.ponderacionRecordForm.get('puntuacion').value))) {
            this.totalPuntuacion += parseFloat(this.ponderacionRecordForm.get('puntuacion').value);
        }
        
        console.table(this.dataSource.data);
    }
    private getAllComponents(): void {
        const filters = new TablePaginatorSearch();
        this.componenteService.getAllComponents(filters).subscribe((response) => {
            if (response.output) {
                this.componenteList = response.output.map((componente) => new ComponenteDTOV1().deserialize(componente));
                if (this.componenteList.length == 0) {
                    this.ponderacionRecordForm.get('componenteId').disable();
                }
            }
        });
    }

    private getAllNivelModality(): void {
        const filters = new TablePaginatorSearch();
        this.levelModality.getAllLevelModality(filters).subscribe((response) => {
            if (response.output) {
                this.nivelModalidadList = response.output.map((nivelModalidad) =>
                    new NivelModalidadDTOV1().deserialize(nivelModalidad)
                );
                if (this.nivelModalidadList.length == 0) {
                    this.ponderacionRecordForm.get('nivelModalidadId').disable(); 
                }
            }
        });
    }

    submit(): void {
        this.ponderacionRecordForm.markAllAsTouched();
        if (this.ponderacionRecordForm.invalid) {
            Alert.error('Verifique que los campos sean correctos');
            return;
        }
        clearForm(this.ponderacionRecordForm);
        const tmp = this.ponderacionRecordForm.getRawValue();
        const ponderacion: PonderacionDTOV1 = new PonderacionDTOV1().deserialize(tmp);
        // const componente: ComponenteDTO = new ComponenteDTO();
        // Suponiendo que tienes un dataSource poblado con instancias de PonderacionDTOV1
        
        for (const item of this.dataSource.data) {
            const puntuacionObj = { id: item.id, puntuacion: item.puntuacion };
            ponderacion.puntuacionPonderaciones.push(puntuacionObj);
        }
        
        if (this.data.id) {
            ponderacion.id = this.data.id;
            ponderacion.fechaCreacion = this.data.fechaCreacion;
            ponderacion.usuarioCreacion = this.data.usuarioCreacion;
            ponderacion.fechaModificacion = new Date();
            ponderacion.usuarioModificacion = this.users.userSession.nombre;
            this.weight.updatWeight(ponderacion).subscribe(() => {
                Alert.success('', 'Ponderación actualizada correctamente');
                this.ref.close(true);
            });
        } else {
            ponderacion.id = '0';
            ponderacion.fechaCreacion = new Date();
            ponderacion.usuarioCreacion = this.users.userSession.nombre;
            this.weight.createWeight(ponderacion).subscribe(() => {
                Alert.success('', 'Ponderación creada correctamente');
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
        this.subscription.add(this.ponderacionRecordForm.statusChanges.subscribe(() => (this.edit = true)));
    }

    private setPermissions(): void {
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_PODERACION);

        if (this.thisAccess && this.thisAccess.tipoAcceso && this.thisAccess.tipoAcceso.length && this.thisAccess.tipoAcceso.length >0)   // consulta
        {
            this.thisAccess.tipoAcceso.forEach((element, index) => {
                if (element.id == 1) this.permissions[0] =  true ;
                if (element.id == 2) this.permissions[1] =  true ;
                if (element.id == 3) this.permissions[2] =  true ;
            });
        }
    }

    checkPermission(p: number): boolean {
        return this.permissions[p];
    }

    onNivelModalidadSelected(selectedValue: any) {
        //const selectedValue = event.value;
        console.log('Valor seleccionado:', selectedValue);
        console.log(this.data);
        let PonderacionId = this.data.id !== null ? this.data.id : '0';

        this.weight.getWeightByNivelModalidadId(selectedValue,PonderacionId).subscribe((response) => {
            if (response.output) {
                //this.data = response.output.map((ponderacion) => new PonderacionDTOV1().deserialize(ponderacion));
                this.dataSource.data = response.output.map((ponderacion) => new PonderacionDTOV1().deserialize(ponderacion));
                //this.dataSource.paginator = this.paginator;
                this.actualizaTotalPuntuaciones();
            }
        });

      }
}
