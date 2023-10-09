import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CyclesService, LevelModalityService, ResponsibilityAreasService, UsersService } from 'src/app/core/services';
import { GeneralConfigurationService } from 'src/app/core/services/api/general-configuration/general-configuration.service';
import { ValidatorService } from 'src/app/shared/validators';
import { Alert, clearForm, YearHelp } from 'src/app/utils/helpers';
import {
    Anio,
    AreaResponsableDTO,
    AreaResponsableDTOV1,
    Ciclo,
    ConfNivelAreaResponsableDTO,
    NivelModalidadDTO,
    NivelModalidadDTOV1,
    TablePaginatorSearch,
} from 'src/app/utils/models';
import { GeneralConfigurationData } from './general-configuration-record.service';

export enum ModalTitle {
    NEW = 'Nueva configuración',
    EDIT = 'Editar configruación',
}

@Component({
    templateUrl: './general-configuration-record.component.html',
    styleUrls: ['./general-configuration-record.component.scss'],
})
export class GeneralConfigurationRecordComponent implements OnInit {
    generalConfigurationRecorForom: UntypedFormGroup;
    title: ModalTitle;
    data: ConfNivelAreaResponsableDTO;
    edit: boolean;
    subscription: Subscription;
    disabled: boolean;
    permission: boolean;
    nivelModalidadList: NivelModalidadDTOV1[];
    areasResponsablesList: AreaResponsableDTOV1[];
    cycleList: Ciclo[];
    yearList: Anio[];
    constructor(
        @Inject(MAT_DIALOG_DATA)
        private readonly generalConfigurationData: GeneralConfigurationData,
        private readonly generalConfiguration: GeneralConfigurationService,
        public readonly cycles: CyclesService,
        public readonly levelModality: LevelModalityService,
        public readonly responsibilityAreas: ResponsibilityAreasService,
        private readonly formBuilder: UntypedFormBuilder,
        private readonly ref: MatDialogRef<never>,
        private users: UsersService,
        private readonly validator: ValidatorService
    ) {
        this.title = ModalTitle.NEW;
        this.data = new ConfNivelAreaResponsableDTO();
        this.edit = null;
        this.disabled = null;
        this.permission = null;
        this.nivelModalidadList = [];
        this.areasResponsablesList = [];
        this.cycleList = [];
        this.yearList = [];
        this.subscription = new Subscription();
        this.generalConfigurationRecorForom = this.formBuilder.group({
            configuracionNivelAreaResponsableId: [0],
            anio: [null, [Validators.required, this.validator.noWhitespace]],
            cicloId: [null, [Validators.required, this.validator.noWhitespace]],
            nivelModalidadId: [null, [Validators.required]],
            generica: [null],
            areaResponsableId: [[], [Validators.required]],
            areaResponsableNombre: [],
            activo: [true, []],
        });
    }

    ngOnInit(): void {
        this.title = this.generalConfigurationData ? ModalTitle.EDIT : ModalTitle.NEW;
        this.getAllLevelModality();
        this.getAllResponsibilityAreas();
        this.getAllCycles();
        this.yearList = YearHelp.getListAnio();
        if (this.generalConfigurationData) {
            this.generalConfiguration
                .getGeneralConfigurationById(this.generalConfigurationData.data.configuracionGeneralId)
                .subscribe((response) => {
                    // console.log(response.data);

                    if (!response.data) {
                        return;
                    }
                    const data = new ConfNivelAreaResponsableDTO().deserialize(response.data);
                    this.data = data;
                    this.generalConfigurationRecorForom.patchValue(data);
                    if (this.data.generica == true) {
                        this.generalConfigurationRecorForom.get('generica').setValue('1');
                    } else {
                        this.generalConfigurationRecorForom.get('generica').setValue('0');
                    }
                    this.trackingStatusForm();
                });
        } else {
            this.trackingStatusForm();
        }
    }

    submit(): void {
        this.generalConfigurationRecorForom.markAllAsTouched();
        if (this.generalConfigurationRecorForom.invalid) {
            Alert.error('Verifique que los campos sean correctos');
            return;
        }
        clearForm(this.generalConfigurationRecorForom);
        const tmp = this.generalConfigurationRecorForom.getRawValue();
        const configuracionGeneral: ConfNivelAreaResponsableDTO = new ConfNivelAreaResponsableDTO().deserialize(tmp);
        if (tmp.generica == 1) {
            configuracionGeneral.generica = true;
        } else {
            configuracionGeneral.generica = false;
        }

        // console.log(configuracionGeneral);
        if (this.data.configuracionGeneralId) {
            configuracionGeneral.configuracionGeneralId = this.data.configuracionGeneralId;
            this.generalConfiguration.updateGeneralConfiguration(configuracionGeneral).subscribe(() => {
                Alert.success('', 'Configuración actualizado correctamente');
                this.ref.close(true);
            });
        } else {
            this.generalConfiguration.createGeneralConfiguration(configuracionGeneral).subscribe(() => {
                Alert.success('', 'Configuración creado correctamente');
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
        this.subscription.add(this.generalConfigurationRecorForom.statusChanges.subscribe(() => (this.edit = true)));
    }

    private getAllResponsibilityAreas(): void {
        const filters = new TablePaginatorSearch();
        filters.pageSize = -1;
        this.responsibilityAreas.getAllResponsibilityAreas(filters).subscribe((response) => {
            if (response.output) {
                this.areasResponsablesList = response.output.map((areaResponsable) =>
                    new AreaResponsableDTOV1().deserialize(areaResponsable)
                );
            }
        });
    }

    private getAllLevelModality(): void {
        const filters = new TablePaginatorSearch();
        filters.pageSize = -1;
        this.levelModality.getAllLevelModality(filters).subscribe((response) => {
            if (response.output) {
                this.nivelModalidadList = response.output.map((nivelModalidad) =>
                    new NivelModalidadDTOV1().deserialize(nivelModalidad)
                );
            }
        });
    }

    private getAllCycles(): void {
        const filters = new TablePaginatorSearch();
        this.cycles.getAllCycles(filters).subscribe((response) => {
            if (response.data.data) {
                this.cycleList = response.data.data.map((ciclo) => new Ciclo().deserialize(ciclo));
            }
        });
    }
}
