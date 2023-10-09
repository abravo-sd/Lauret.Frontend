import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, Subject } from 'rxjs';

import { filter, takeUntil } from 'rxjs/operators';
import { AccountInfo, InteractionStatus, RedirectRequest } from '@azure/msal-browser';

import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import {
    CampusService,
    ComponentsService,
    CorporateAreaService,
    LevelModalityService,
    ProfileService,
    RegionsService,
    ResponsibilityAreasService,
    UsersService,
} from 'src/app/core/services';
import { Alert, clearForm } from 'src/app/utils/helpers';
import {
    AreaCorporativaDTO,
    AreaCorporativaDTOV1,
    AreaResponsableDTO,
    AreaResponsableDTOV1,
    CampusDTO,
    CampusDTOV1,
    CatalogoUsuarioDTO,
    CatalogoUsuarioDTOV1,
    ComponenteDTO,
    ComponenteDTOV1,
    NivelModalidadDTO,
    NivelModalidadDTOV1,
    PerfilDTO,
    PerfilDTOV1,
    RegionDTO,
    RegionDTOV1,
    TablePaginatorSearch,
    UsuarioDTO,
    UsuarioDTOV1,
    UsuarioAddUpdateDTOV1,
    Vista,
    UsuarioActiveDirectory,
} from 'src/app/utils/models';
import { UserData } from './user-record.service';
import { ModuleIdV2 } from 'src/app/utils/enums/modules-idV2';
//import { invokeInstruction } from '@angular/compiler/src/render3/view/util';
import { MatSelectChange } from '@angular/material/select';

export enum ModalTitle {
    NEW = 'Nuevo Usuario',
    EDIT = 'Editar Usuario',
}

@Component({
    selector: 'app-user-record',
    templateUrl: './user-record.component.html',
    styleUrls: ['./user-record.component.scss'],
})
export class UserRecordComponent implements OnInit, OnDestroy {
    @ViewChild('input', { static: true })
    inputSearch: ElementRef;
    userRecordForm: UntypedFormGroup;
    title: ModalTitle;
    data: CatalogoUsuarioDTOV1;
    userExists: boolean;
    edit: boolean;
    subscription: Subscription;
    disabled: boolean;
    permission: boolean;
    componentList: ComponenteDTOV1[];
    campusList: CampusDTOV1[];
    profileList: PerfilDTOV1[];

    //levelModalityList: string[];
    // levelModalityList: string[];

    responsbilityAreaList: AreaResponsableDTOV1[];
    coporateAreaList: AreaCorporativaDTOV1[];
    regionsList: RegionDTOV1[];
    thisAccess: Vista;
    permissions: boolean[];

    private _destroying$: Subject<void>;
    // regiones: { idUsuario: string | number, usuario: string, idRegion: string | number, region: string }[];
    // campus: { idUsuario: string | number, idCampus: string | number, campus: string }[];
    // nivelesModalidad: { idUsuario: string | number, idNivelModalidadId: string | number, nivel: string, modalidad: string }[];
    // areasResponsables: { idUsuario: string | number, idAreaResponsable: string | number, areaResponsable: string }[];
    // areasCorporativas: { idUsuario: string | number, idAreaCorporativa: string | number, areaCorporativa: string }[];

    constructor(
        @Inject(MAT_DIALOG_DATA)
        public readonly userData: UserData,

        private authService: MsalService,
        private broadcastService: MsalBroadcastService,

        private readonly formBuilder: UntypedFormBuilder,
        private readonly ref: MatDialogRef<never>,
        private users: UsersService,
        private readonly profiles: ProfileService,
        private readonly campus: CampusService,
        private readonly levelModality: LevelModalityService,
        private readonly responsibilityAreas: ResponsibilityAreasService,
        private readonly coporateArea: CorporateAreaService,
        private readonly regioons: RegionsService,
        private readonly component: ComponentsService
    ) {
        this.title = ModalTitle.NEW;
        this.data = new CatalogoUsuarioDTOV1();
        this.userExists = false;
        this.edit = null;
        this.disabled = null;
        this.permission = null;
        this.subscription = new Subscription();
        this.regionsList = [];
        this.profileList = [];
        this.campusList = [];
        // this.levelModalityList = [];
        this.responsbilityAreaList = [];
        this.coporateAreaList = [];

        this.userRecordForm = this.formBuilder.group({
            correo: [null, [Validators.required, Validators.email]],
            catNivelRevisionId: [null, [Validators.required]],
            nombre: [{ value: null, disabled: true}],
            apellidos: [{ value: null, disabled: true}],
            tblPerfilId: [null, [Validators.required]],
            catRegionId: [null, [Validators.required]],
            catCampusId: [null],
            // levelModalityIds: [null],
            responsbilityArea: [null, [Validators.required]],
            corporateArea: [null, [Validators.required]],
            activo: [true, []]
        });
        this.permissions = [false, false, false];
    }

    ngOnInit() {
        this.setPermissions();
        this.disabled = !this.checkPermission(2);
        this.getAllProfiles();
        this.getAllRegions();
        Promise.all([this.campus.setAllCampus()]).then(() => { });
        this.getAllResponsibilityAreas();
        this.getAllCorporateAreas();
        this.title = this.userData ? ModalTitle.EDIT : ModalTitle.NEW;
        if (this.userData) {
            this.users.getUserById(this.userData.data.idUsuario).subscribe((response) => {
                if (!response.output) {
                    return;
                }
                this.userExists = true;
                const data = new CatalogoUsuarioDTOV1().deserialize(response.output[0]);
                this.data = data;
                const idRegion: (string | number) = (data.regiones.length && data.regiones[0] && data.regiones[0].idRegion) ? data.regiones[0].idRegion : null;
                const idCampus: (string | number) = (data.campus.length && data.campus[0] && data.campus[0].idCampus) ? data.campus[0].idCampus : null;
                this.userRecordForm.get('catRegionId').patchValue(idRegion, { emitEvent: false });
                Promise.all([this.setCampusByRegion(idRegion)]).then(() => { });
                this.userRecordForm.get('catCampusId').patchValue(idCampus);
                // this.setLevelModalityByCampus(idCampus);
                const responsibilityAreaIdList: (string | number)[] = [];
                this.data.areasResponsables.forEach((item: any) => {
                    responsibilityAreaIdList.push(item.idAreaResponsable);
                });
                this.userRecordForm.get('responsbilityArea').patchValue(responsibilityAreaIdList);
                const corporateAreaIdList: (string | number)[] = [];
                this.data.areasCorporativas.forEach((item: any) => {
                    corporateAreaIdList.push(item.idAreaCorporativa);
                });
                this.userRecordForm.get('corporateArea').patchValue(corporateAreaIdList);
                this.userRecordForm.patchValue(data);
                this.userRecordForm.get('correo').disable();
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
        this.userRecordForm.markAllAsTouched();
        if (this.userRecordForm.invalid) {
            Alert.error('Verifique que los campos sean correctos');
            return;
        }
        clearForm(this.userRecordForm);
        const tmp = this.userRecordForm.getRawValue();
        const user: UsuarioAddUpdateDTOV1 = new UsuarioAddUpdateDTOV1();
        user.correo = this.userRecordForm.get('correo').value;
        user.catNivelRevisionId = this.userRecordForm.get('catNivelRevisionId').value;
        user.nombre = this.userRecordForm.get('nombre').value;
        user.apellidos = this.userRecordForm.get('apellidos').value;
        user.tblPerfilId = this.userRecordForm.get('tblPerfilId').value;
        user.regiones.push(this.userRecordForm.get('catRegionId').value);
        user.campus.push(this.userRecordForm.get('catCampusId').value);
        // user.nivelesModalidad = this.userRecordForm.get('levelModalityIds').value ? this.userRecordForm.get('levelModalityIds').value.trim().length > 0 ? this.userRecordForm.get('levelModalityIds').value.split(',') : [] : [];
        user.areasResponsables = this.userRecordForm.get('responsbilityArea').value;
        user.areasCorporativas = this.userRecordForm.get('corporateArea').value;
        user.activo = this.userRecordForm.get('activo').value;

        if (this.userData) {
            user.id = this.userData.data.idUsuario;
            user.fechaCreacion = this.data.fechaCreacion;
            user.usuarioCreacion = this.data.usuarioCreacion;
            user.fechaModificacion = new Date();
            user.usuarioModificacion = this.users.userSession.nombre;
            this.users.updateUser(user).subscribe(() => {
                Alert.success('', 'Usuario actualizado correctamente');
                this.ref.close(true);
            });
        } else {
            user.id = '0';
            user.fechaCreacion = new Date();
            user.usuarioCreacion = this.users.userSession.nombre;
            user.fechaModificacion = user.fechaCreacion;
            user.usuarioModificacion = user.usuarioCreacion;
            this.users.createUser(user).subscribe(() => {
                Alert.success('', 'Usuario creado correctamente');
                this.ref.close(true);
            });
        }

        // this.broadcastService.inProgress$
        //     .subscribe(() => {
        //         let correoUsuario = user.correo;
        //         let account: AccountInfo = this.authService.instance.getAccountByUsername(correoUsuario);
        //         if (account) {
        //             //let splitted = account.name.split(" "); 
        //             if (!account.name.includes(user.nombre) &&
        //                 !account.name.includes(user.apellidos)) {
        //                 Alert.error('Verifique Nombre y/o Apellidos');
        //                 return;
        //             } else {
        //             }
        //         } else {
        //             Alert.error('Verifique las cuenta de correo');
        //             return;
        //         }
        //     });
    }

    closeModalByConfimation(): void {
        if (!this.edit || !this.userRecordForm.dirty) {
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

    searchUser(): void {
        const email: string = this.userRecordForm.get('correo').value;
        if (!email) {
            return;
        }
        this.users.searchUser(email).subscribe((response) => {
            if (!response.output) {
                return;
            }
            const data = new UsuarioActiveDirectory().deserialize(response.output);
            this.userExists = true;
            this.userRecordForm.get('correo').disable();
            this.userRecordForm.get('nombre').patchValue(data.nombre ? data.nombre.trim() : 'N/A');
            this.userRecordForm.get('apellidos').patchValue(data.apellidos ? data.apellidos.trim() : 'N/A');
            this.userRecordForm.updateValueAndValidity();
        });
    }

    undoUserSearch(): void {
        this.userExists = false;
        this.userRecordForm.get('correo').patchValue(null);
        this.userRecordForm.get('nombre').patchValue(null);
        this.userRecordForm.get('apellidos').patchValue(null);
        this.userRecordForm.get('correo').enable();
    }

    // search(term: string): void {
    //     this.users.validateIfUserExist(term).subscribe((response) => {
    //         if (!response.data) {
    //             return;
    //         }
    //         const data = new CatalogoUsuarioDTOV1().deserialize(response.data);
    //         this.data = data;
    //         this.userRecordForm.patchValue(data);
    //     });
    // }

    private getAllRegions(): void {
        const filters = new TablePaginatorSearch();
        filters.pageSize = -1;
        this.regioons.getAllRegions(filters).subscribe((response) => {
            if (response.output) {
                this.regionsList = response.output.map((region) => new RegionDTOV1().deserialize(region));
            }
        });
    }

    private getAllProfiles(): void {
        const filters = new TablePaginatorSearch();
        filters.pageSize = -1;
        this.profiles.getAllProfiles(filters).subscribe((response) => {
            if (response.output) {
                this.profileList = response.output.map((profile) => new PerfilDTOV1().deserialize(profile));
            }
        });
    }

    private getAllResponsibilityAreas(): void {
        const filters = new TablePaginatorSearch();
        filters.pageSize = -1;
        this.responsibilityAreas.getAllResponsibilityAreas(filters).subscribe((response) => {
            if (response.output) {
                this.responsbilityAreaList = response.output.map((areaResponsable) =>
                    new AreaResponsableDTOV1().deserialize(areaResponsable)
                );
            }
        });
    }

    private getAllCorporateAreas(): void {
        const filters = new TablePaginatorSearch();
        filters.pageSize = -1;
        this.coporateArea.getAllCorporateAreas(filters).subscribe((response) => {
            if (response.output) {
                this.coporateAreaList = response.output.map((areaCorporativa) =>
                    new AreaCorporativaDTOV1().deserialize(areaCorporativa)
                );
            }
        });

    }

    onRegionChange(event: MatSelectChange): void {
        this.campusList = [];
        // this.levelModalityList = [];
        this.userRecordForm.get('catCampusId').patchValue(null);
        this.userRecordForm.get('catCampusId').updateValueAndValidity();
        Promise.all([this.setCampusByRegion(event.value)]).then(() => { });
    }

    setCampusByRegion(value: string | number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.campusList = this.campus.campusList.filter(
                (item: CampusDTOV1) => (item.idRegion == value)
            );
            resolve(true);
        });
    }

    // onCampusChange(event: MatSelectChange): void {
    //     this.levelModalityList = [];
    //     Promise.all([this.setLevelModalityByCampus(event.value)]).then(() => { });
    // }

    // private setLevelModalityByCampus(id: string | number): void {
    //     this.levelModalityList = [];
    //     this.campus.getCampusById(id).subscribe((response) => {
    //         if (response.output) {
    //             const data = new CampusDTOV1().deserialize(response.output[0]);
    //             // const levelModalityIds: (string | number)[] = data.nivelModalidadIds ? data.nivelModalidadIds.trim().length > 0 ? data.nivelModalidadIds.split(',') : [] : [];
    //             this.userRecordForm.get('levelModalityIds').setValue(data.nivelModalidadIds ? data.nivelModalidadIds : null);
    //             const levelModality: string[] = data.nivelModalidad ? data.nivelModalidad.trim().length > 0 ? data.nivelModalidad.split(',') : [] : [];
    //             levelModality.forEach((item: string) => {
    //                 this.levelModalityList.push(item);
    //             });
    //         }
    //     });
    // }   

    private setPermissions(): void {
        this.thisAccess = this.users.userSession.vistas.find(element => element.vistaId == ModuleIdV2.CAT_USUARIO_SIAC);

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

    private trackingStatusForm(): void {
        this.subscription.add(this.userRecordForm.statusChanges.subscribe(() => (this.edit = true)));
    }
}
