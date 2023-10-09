import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UsersService } from 'src/app/core/services';
import { Alert, Auth } from 'src/app/utils/helpers';
import { Perfil, TipoAcceso, Vista } from 'src/app/utils/models';

@Injectable({
    providedIn: 'root',
})
export class AppGuard implements CanActivate {
    constructor(
        private authService: MsalService,
        private readonly router: Router,
        private readonly users: UsersService
    ) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let account: AccountInfo = this.authService.instance.getAllAccounts().find(() => true);

        if (Auth.checkSession()) {
            this.users.getUserProfilePermissions(account.username).subscribe({
                next: (response) => {
                    if (response && response.output) {
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
                        return true;
                    } else {
                        return of(this.router.createUrlTree(['/unauthorized']))
                    }
                },
                error: (error) => { of(this.router.createUrlTree(['/unauthorized']))}
            })
        }
        return this.router.createUrlTree(['/login'])

        // if (Auth.checkSession()) {
        //     return this.users.getProfileUser().pipe(
        //         map((response) => {
        //             if (!response.data) {
        //                 Alert.error(response.message);
        //                 return this.router.createUrlTree(['/unauthorized']);
        //             }
        //             const data = new Perfil().deserialize(response.data);
        //             this.users.userSession = data;
        //             return true;
        //         }),
        //         catchError(() => of(this.router.createUrlTree(['/unauthorized'])))
        //     );
        // }
        // return this.router.createUrlTree(['/login']);
        // if (!!account) {
    
        // }
    }
}
