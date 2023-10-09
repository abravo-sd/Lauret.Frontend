import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormArray, UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {
    AccessTypeService,
    CampusService,
    LevelModalityService,
    ProfileService,
    UsersService,
    ViewsService,
} from 'src/app/core/services';
import { ValidatorService } from 'src/app/shared/validators';
import { MODULESCATALOG } from 'src/app/utils/constants';
import { Alert, clearForm } from 'src/app/utils/helpers';
import {
    CampusDTO,
    CampusDTOV1,
    ModulesCatalog,
    PerfilDTO,
    PerfilDTOV1,
    TablePaginatorSearch,
    TipoAccesoDTO,
    TipoAccesoDTOV1,
    Vista,
    VistaDTOV1,
    PerfilVistaDTOV1,
    PerfilVistaTipoAccesoDTOV1,
    PerfilAddUpdateDTOV1,
    PerfilVistasAddUpdateDTOV1
} from 'src/app/utils/models';

import { ProfileData } from './profile-record.service';

export enum ModalTitle {
    NEW = 'Nuevo perfil',
    EDIT = 'Editar perfil',
}
@Component({
    templateUrl: './profile-record.component.html',
    styleUrls: ['./profile-record.component.scss'],
})
export class ProfileRecordComponent implements OnInit, OnDestroy {
    profileRecordForm: UntypedFormGroup;
    title: ModalTitle;
    data: PerfilDTOV1;
    edit: boolean;
    subscription: Subscription;
    disabled: boolean;
    permission: boolean;
    // campusList: CampusDTOV1[];
    modulesList: ModulesCatalog[];
    catalogList: VistaDTOV1[];
    accessTypeList: TipoAccesoDTOV1[];
    viewList: VistaDTOV1[];
    private accessVoid: boolean;
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public readonly profileData: ProfileData,
        public readonly profile: ProfileService,
        public readonly levelModality: LevelModalityService,
        private readonly formBuilder: UntypedFormBuilder,
        public readonly view: ViewsService,
        public readonly campus: CampusService,
        private readonly ref: MatDialogRef<never>,
        private users: UsersService,
        private readonly validator: ValidatorService,
        private readonly accessType: AccessTypeService,
    ) {
        this.title = ModalTitle.NEW;
        this.data = new PerfilDTOV1();
        this.edit = null;
        this.disabled = null;
        this.permission = null;
        this.modulesList = [];
        this.catalogList = [];
        // this.campusList = [];
        this.accessTypeList = [];
        this.viewList = [];
        this.accessVoid = false;
        this.subscription = new Subscription();
        this.profileRecordForm = this.formBuilder.group({
            // clave: [null, [Validators.required, Validators.maxLength(5), this.validator.noWhitespace]],
            nombre: [null, [Validators.required, Validators.maxLength(100), this.validator.noWhitespace]],
            // vistaInicialId: [, [Validators.required]],
            vistInicialNombre: [null],
            // campuses: [[], [Validators.required]],
            activo: [true, []],
            catalogs: new UntypedFormArray([])
            // modules: new FormArray([]),
        });
    }

    get catalogListArr(): UntypedFormArray {
        return this.profileRecordForm.get('catalogs') as UntypedFormArray;
    }

    // get moduleListArr(): FormArray {
    //     return this.profileRecordForm.get('modules') as FormArray;
    // }

    ngOnInit(): void {
        this.title = this.profileData ? ModalTitle.EDIT : ModalTitle.NEW;
        // this.getAllCampus();
        this.getAllTypeAccess();
        // Promise.all([this.getModuleCatalogList()]).then(() => {
        //     this.buildCatalogFormArr();
        // });
        Promise.all([this.getViewCatalogList()]).then(() => {
            this.buildCatalogFormArr();
        });
        if (this.profileData) {
            this.profile.getProfileById(this.profileData.data.id).subscribe((response) => {
                if (!response.output) {
                    return;
                }
                const data: PerfilDTOV1 = new PerfilDTOV1().deserialize(response.output[0]);
                this.data = data;
                this.profileRecordForm.patchValue(data);
                // this.profileRecordForm.get('clave').disable();
                // const campusList: string[] = this.data.campuses.map((i) => i.id);
                // this.profileRecordForm.get('campuses').setValue(campusList);
                const viewList: PerfilVistaDTOV1[] = this.data.relPerfilvista;
                setTimeout(() => {this.assignViewStatusLoad(viewList); this.edit = false; }, 100)
                // this.profileRecordForm.get('vistaInicialId').setValue(Number(this.data.vistaInicialId));
                this.trackingStatusForm();
                // this.checkPermission();
            });
        } else {
            this.trackingStatusForm();
            this.checkPermission();
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    submit(): void {
        this.accessVoid = false;
        this.profileRecordForm.markAllAsTouched();
        clearForm(this.profileRecordForm);
        const perfil: PerfilAddUpdateDTOV1 = new PerfilAddUpdateDTOV1();
        // perfil.vistaInicialId = String(this.profileRecordForm.get('vistaInicialId').value);
        // const vistaInicial: ModulesCatalog = this.viewList.find((i) => i.id === Number(perfil.vistaInicialId));
        // perfil.vistaInicialNombre = vistaInicial.key;
        // const campusesListString: string[] = this.profileRecordForm.get('campuses').value;
        // campusesListString.forEach((i) => {
        //     const campus: CampusDTOV1 = this.campusList.find((campus) => campus.id === i);
        //     perfil.campuses.push(campus);
        // });

        const catalogs: AbstractControl[] = this.getControlsSelected(this.catalogListArr.controls);
        // const modules: AbstractControl[] = this.getControlsSelected(this.moduleListArr.controls);
        catalogs.forEach((c) => {
            const vista: PerfilVistasAddUpdateDTOV1 = new PerfilVistasAddUpdateDTOV1();
            vista.id = c.get('idVista').value;
            vista.tipoAcceso = c.get('tipoAccesoIds').value;
            perfil.vistas.push(vista);
            if (!vista.tipoAcceso || vista.tipoAcceso.length === 0) {
                this.accessVoid = true;
            }
        });

        // modules.forEach((c) => {
        //     const vista: PerfilVistasAddUpdateDTOV1 = new PerfilVistasAddUpdateDTOV1();
        //     vista.id = c.get('vistaId').value;
        //     vista.tipoAcceso = c.get('tipoAccesoIds').value;
        //     perfil.vistas.push(vista);
        //     if (!vista.tipoAcceso || vista.tipoAcceso.length === 0) {
        //         this.accessVoid = true;
        //     }
        // });

        if (this.accessVoid) {
            Alert.error('Para poder guardar deberá asignar un permiso ');
            return;
        }

        if (this.data.id) {
            perfil.id = this.data.id;
            // perfil.clave = this.profileRecordForm.get('clave').value;
            perfil.nombre = this.profileRecordForm.get('nombre').value;
            perfil.activo = this.profileRecordForm.get('activo').value;
            perfil.fechaCreacion = this.data.fechaCreacion;
            perfil.usuarioCreacion = this.data.usuarioCreacion;
            perfil.fechaModificacion = new Date();
            perfil.usuarioModificacion = this.users.userSession.nombre;
            // console.log(perfil);
            this.profile.updateProfile(perfil).subscribe(() => {
                Alert.success('', 'Perfil actualizado correctamente');
                this.ref.close(true);
            });
        } else {
            perfil.id = '0';
            // perfil.clave = this.profileRecordForm.get('clave').value;
            perfil.nombre = this.profileRecordForm.get('nombre').value;
            perfil.activo = this.profileRecordForm.get('activo').value;
            perfil.fechaCreacion = new Date();
            perfil.usuarioCreacion = this.users.userSession.nombre;
            // console.log(perfil);
            this.profile.createProfile(perfil).subscribe(() => {
                Alert.success('', 'Perfil creado correctamente');
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

    // private getRelPerfilVistaId(vistaId: string | number): string | number {
    //     const perfilVista: PerfilVistaDTOV1 = this.data.relPerfilvista.find((rel) => rel.vistaId === vistaId )
    //     if (perfilVista) {
    //         return perfilVista.id;
    //     }
    //     return 0;
    // }

    checkCatalogs(idVista: string | number, event: MatCheckboxChange): void {
        const view: VistaDTOV1 = this.catalogList.find((item) => item.idVista == idVista);
        const data: AbstractControl[] = this.catalogListArr.controls;
        const control: AbstractControl = data.find((item) => item.get('idVista').value == idVista);
        if (!event.checked) {
            this.viewList = this.viewList.filter((item) => item.idVista != idVista);
            control.get('tipoAccesoIds').reset();
            return;
        } else {
            this.viewList.push(view);
        }
    }

    private getControlsSelected(controlSelectd: AbstractControl[]): AbstractControl[] {
        return controlSelectd.filter((i) => i.get('vistaSelected').value === true);
    }

    private getAllTypeAccess(): void {
        const filters: TablePaginatorSearch = new TablePaginatorSearch();
        this.accessType.getAllAccessType(filters).subscribe((response) => {
            if (response.output) {
                this.accessTypeList = response.output.map((tipoAcceso) => new TipoAccesoDTOV1().deserialize(tipoAcceso));
            }
        });
    }

    private getViewCatalogList(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.view.getAllViews().subscribe(response => {
                if (response.output) {
                    this.catalogList = response.output.map((vista) => new VistaDTOV1().deserialize(vista));
                    resolve(true);
                }
            });
        });
    }

    private buildCatalogFormArr(): void {
        this.catalogList.forEach((catalog) => {
            this.catalogListArr.push(this.createItem(catalog));
        });
    }

    private createItem(control: VistaDTOV1): UntypedFormGroup {
        return this.formBuilder.group({
            idVista: [control.idVista],
            vistaSelected: [false],
            vistaNombre: [control.nombre],
            tipoAccesoIds: [[]],
        });
    }

    getViewName(idVista: string | number): string {
        const vista: VistaDTOV1 = this.catalogList.find((vista) => vista.idVista == idVista);
        if (vista) {
            return vista.nombre;
        }
        return '';
    }

    private assignViewStatusLoad(viewList: PerfilVistaDTOV1[]): void {
        const catalogList: AbstractControl[] = this.catalogListArr.controls;
        // const moduleList: AbstractControl[] = this.moduleListArr.controls;
        viewList.forEach((view) => {
            const control: AbstractControl = catalogList.find((control) => control.get('idVista').value == view.vistaId);
            const accessType: (string | number)[] = view.relPerfilvistatipoaccesos.map((i) => {
                return i.catTipoAccesoId;
            });

            if (control) {
                control.get('vistaSelected').setValue(true);
                const tmpView: VistaDTOV1 = this.catalogList.find((item) => item.idVista === view.vistaId);
                control.get('tipoAccesoIds').setValue(accessType);
                this.viewList.push(tmpView);
            }
        });
    }

    private trackingStatusForm(): void {
        this.subscription.add(this.profileRecordForm.statusChanges.subscribe(() => (this.edit = true)));
    }

    private checkPermission(): void {
        // this.permission = this.users.checkPermission(Modules.REGION, true);
        // if (!this.permission) {
        //   this.profileRecordForm.disable();
        // }
    }
}
