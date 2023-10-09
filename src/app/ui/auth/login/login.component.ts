import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { AccountInfo, InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthMsalService, UsersService } from 'src/app/core/services';
import { MODULESCATALOG } from 'src/app/utils/constants';
import { Alert, Auth } from 'src/app/utils/helpers';
import { Perfil, TipoAcceso, Vista } from 'src/app/utils/models';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
    private _destroying$: Subject<void>;

    constructor(
        @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
        private authService: MsalService,
        private broadcastService: MsalBroadcastService,
        private readonly router: Router,
        private readonly users: UsersService,
        private authMsal: AuthMsalService
    ) {
        this._destroying$ = new Subject<void>();
    }

    ngOnInit(): void {
        this.broadcastService.inProgress$
            .pipe(
                filter((status: InteractionStatus) => status === InteractionStatus.None),
                takeUntil(this._destroying$)
            )
            .subscribe(() => {
                let account: AccountInfo = this.authService.instance.getAllAccounts().find(() => true);
                if (!!account) {
                    // const data = PERFIL_TEST;
                    // this.users.userSession = data;
                    // Auth.login(data);
                    // this.router.navigate(['/mi-perfil']);

                    //CODIGO LIM
                    //SE OBTIENEN LOS PERMISOS
                    this.users.getUserProfilePermissions(account.username).subscribe({
                        next: (response) => {
                            if (response && !response.output) {
                                Alert.error(response.mensaje);
                                this.router.navigate(['/unauthorized']);
                            }

                            if (!response.exito) {
                                Alert.error(response.mensaje);
                                this.router.navigate(['/unauthorized']);
                            }

                            let data = new Perfil();
                            data.nombre = response.output.nombre;
                            data.correo = response.output.correo;
                            data.perfil = response.output.perfil;
                            data.campus = response.output.campus;
                            data.region = response.output.region;
                            data.areaResponsable = response.output.areaResponsable;
                            response.output.vistas.forEach((x: any) => {
                                let vista = new Vista();
                                vista.vistaId = x.vistaId.toString();
                                vista.vistaNombre = x.nombre.toString();
                                vista.nombre = x.nombre;

                                x.permisos.forEach((element: any) => {
                                    let acceso = new TipoAcceso();
                                    acceso.id = element.id;
                                    acceso.nombre = element.nombre;
                                    acceso.descripcion = element.descripcion;
                                    vista.tipoAcceso.push(acceso);
                                });

                                data.vistas.push(vista);
                            });
                            this.users.userSession = data;
                            Auth.login(data);
                            this.router.navigate(['/mi-perfil']);
                        },
                        error: (error) => {
                            Alert.error(
                                'Ha ocurrido un error al validar tu cuenta. Vuelve a intentar el inicio de sesión',
                                'Validación de Cuenta'
                            );
                            this.router.navigate(['/unauthorized']);
                        },
                    });

                    //SE COMENTA POR LIM
                    /* this.users.getProfileUser().subscribe({
                                  next: (response) => {
                                      if (response && !response.data) {
                                          Alert.error(response.message);
                                          this.router.navigate(['/unauthorized']);
                                      }
                                      const data = new Perfil().deserialize(response.data);
                                       this.users.userSession = data;
                                       Auth.login(data);
          
                                      // if (data.vistas.length === 0 || !response.data.vistaInicial) {
                                      //     Alert.info('Usuario no cuenta con un rol asignado. Favor de validarlo el administrador.');
                                      //     this.router.navigate(['unauthorized']);
                                      //     return;
                                      // }
          
                                      if (data.vistas.length === 0) {
                                          Alert.info('Usuario no cuenta con un rol asignado. Favor de validarlo el administrador.');
                                          this.router.navigate(['unauthorized']);
                                          return;
                                      }
          
                                      // const initalViewId: number = parseInt(data.vistaInicial.vistaId);
                                      // const initialView = MODULESCATALOG.find((item) => item.id === initalViewId);
          
                                      // if (initialView) {
                                      //     this.router.navigate(['/' + initialView.url]);
                                      // } else {
                                      //     this.router.navigate(['/']);
                                      // }
          
                                      this.router.navigate(['/mi-perfil']);
                                  },
                                  error: (error) => {
                                      Alert.error(
                                          'Ha ocurrido un error al validar tu cuenta. Vuelve a intentar el inicio de sesión',
                                          'Validación de Cuenta'
                                      );
                                      this.router.navigate(['/unauthorized']);
                                  },
                                  complete: () => {}
                              }); */
                }
            });
    }

    login() {
        if (this.msalGuardConfig.authRequest) {
            this.authService.loginRedirect({
                ...this.msalGuardConfig.authRequest,
            } as RedirectRequest);
        } else {
            this.authService.loginRedirect();
        }
    }

    ngOnDestroy(): void {
        this._destroying$.next(undefined);
        this._destroying$.complete();
    }
}
