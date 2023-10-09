import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ComponentUvmService, IndicatorUvmService, SubindicatorUvmService } from 'src/app/core/services';
import { UvmMatrixService } from 'src/app/core/services/api/uvm-matrix/uvm-matrix.service';
import { ValidatorService } from 'src/app/shared/validators';
import { Alert, clearForm } from 'src/app/utils/helpers';
import {
    ComponenteUVMDTO,
    ComponenteUVMDTOV1,
    IndicadorUVMDTO,
    IndicadorUVMDTOV1,
    SubIndicadorUVMDTO,
    SubIndicadorUVMDTOV1,
    TablePaginatorSearch,
    MatrizUvmDTO,
    MatrizUvmDTOV1
} from 'src/app/utils/models';
import { MatrixUvmData } from './uvm-matrix-record.service';

export enum ModalTitle {
    NEW = 'Asociar elementos UVM',
    EDIT = 'Editar elementos UVM',
}

@Component({
    selector: 'app-uvm-matrix-record',
    templateUrl: './uvm-matrix-record.component.html',
    styleUrls: ['./uvm-matrix-record.component.scss'],
})
export class UvmMatrixRecordComponent implements OnInit {
    title: ModalTitle;
    data: MatrizUvmDTOV1;
    edit: boolean;
    subscription: Subscription;
    disabled: boolean;
    permission: boolean;
    matrixUvmRecordForm: UntypedFormGroup;
    componentUvmList: ComponenteUVMDTOV1[];
    indicatorUvmList: IndicadorUVMDTOV1[];
    subIndicatorUvmList: SubIndicadorUVMDTOV1[];
    filters: TablePaginatorSearch;
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public readonly matrixUvmData: MatrixUvmData,
        private readonly formBuilder: UntypedFormBuilder,
        private readonly ref: MatDialogRef<never>,
        private readonly validator: ValidatorService,
        private readonly indicatorService: IndicatorUvmService,
        private readonly subIndicatorService: SubindicatorUvmService,
        private readonly componentUvmService: ComponentUvmService,
        private readonly uvmMatrixService: UvmMatrixService
    ) {
        this.subscription = new Subscription();
        this.title = ModalTitle.NEW;
        this.data = new MatrizUvmDTOV1();
        this.edit = null;
        this.disabled = null;
        this.permission = null;
        this.componentUvmList = [];
        this.indicatorUvmList = [];
        this.subIndicatorUvmList = [];
        this.filters = new TablePaginatorSearch();
        this.matrixUvmRecordForm = this.formBuilder.group({
            clave: [null, [Validators.required, Validators.maxLength(50), this.validator.noWhitespace]],
            componenteUvmId: [null, [Validators.required]],
            descripcionComponenteUvm: [null, []],
            indicadorUvms: [[], [Validators.required]],
            subIndicadorUvms: [[], [Validators.required]],
            activo: [true, []],
        });
    }

    ngOnInit(): void {
        this.getAllComponentsUvm(this.filters);
        this.getAllIndicatorsUvm(this.filters);
        this.getAllSubIndicatorsUvm(this.filters);
        this.title = this.matrixUvmData ? ModalTitle.EDIT : ModalTitle.NEW;
        if (this.matrixUvmData) {
            this.uvmMatrixService.getMatrizUvmById(this.matrixUvmData.data.id).subscribe((response) => {
                if (!response.output) {
                    return;
                }
                const data = new MatrizUvmDTOV1().deserialize(response.output[0]);
                this.data = data;
                this.matrixUvmRecordForm.patchValue(data);
                const subIndicatorList: string[] = this.data.subIndicadorUvms.map((i) => i.id);
                const IndicatorList: string[] = this.data.subIndicadorUvms.map((i) => i.id);
                this.matrixUvmRecordForm.get('indicadorUvms').setValue(IndicatorList);
                this.matrixUvmRecordForm.get('subIndicadorUvms').setValue(subIndicatorList);
                // this.checkPermission();
                this.trackingStatusForm();
            });
        } else {
            // this.checkPermission();
            this.trackingStatusForm();
        }
    }

    submit(): void {
        this.matrixUvmRecordForm.markAllAsTouched();
        if (this.matrixUvmRecordForm.invalid) {
            Alert.error('Verifique que los campos sean correctos');
            return;
        }
        clearForm(this.matrixUvmRecordForm);
        const tmp = this.matrixUvmRecordForm.getRawValue();
        const matrizUvm: MatrizUvmDTOV1 = new MatrizUvmDTOV1().deserialize(tmp);
        const indicadorUvmListSelect = this.indicatorUvmList.filter((i) => tmp.indicadorUvms.includes(i.id));
        const subIndicadorUvmListSelect = this.subIndicatorUvmList.filter((i) =>
            tmp.subIndicadorUvms.includes(i.id)
        );
        matrizUvm.indicadorUvms = indicadorUvmListSelect;
        matrizUvm.subIndicadorUvms = subIndicadorUvmListSelect;
        // console.log(matrizUvm);
        if (this.data.componenteUvmId) {
            matrizUvm.id = this.data.id;
            this.uvmMatrixService.updateMatrizUvm(matrizUvm).subscribe(() => {
                Alert.success('', 'Matriz uvm actualizado correctamente');
                this.ref.close(true);
            });
        } else {
            this.uvmMatrixService.createMatrizUvm(matrizUvm).subscribe(() => {
                Alert.success('', 'Matriz uvm creado correctamente');
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

    componentUvmSelect(componenteUvmId: string): void {
        const componenteUvm: ComponenteUVMDTOV1 = this.componentUvmList.find((i) => i.id == componenteUvmId);
        this.matrixUvmRecordForm.get('descripcionComponenteUvm').setValue(componenteUvm.descripcionComponenteUvm);
    }

    private trackingStatusForm(): void {
        this.subscription.add(this.matrixUvmRecordForm.statusChanges.subscribe(() => (this.edit = true)));
    }

    private getAllIndicatorsUvm(filter: TablePaginatorSearch): void {
        filter.inactives = true;
        filter.pageSize = -1;
        this.indicatorService.getAllIndicatorsUvm(filter).subscribe((response) => {
            if (response.output) {
                this.indicatorUvmList = response.output.map((indicador) => new IndicadorUVMDTOV1().deserialize(indicador));
            }
        });
    }

    private getAllSubIndicatorsUvm(filter: TablePaginatorSearch): void {
        filter.inactives = true;
        filter.pageSize = -1;
        this.subIndicatorService.getAllSubIndicatorsUvm(filter).subscribe((response) => {
            if (response.output) {
                this.subIndicatorUvmList = response.output.map((subIndicador) =>
                    new SubIndicadorUVMDTOV1().deserialize(subIndicador)
                );
            }
        });
    }

    private getAllComponentsUvm(filter: TablePaginatorSearch): void {
        filter.inactives = true;
        filter.pageSize = -1;
        this.componentUvmService.getAllComponentsUvm(filter).subscribe((response) => {
            if (response.output) {
                this.componentUvmList = response.output.map((subIndicador) =>
                    new ComponenteUVMDTOV1().deserialize(subIndicador)
                );
            }
        });
    }
}
