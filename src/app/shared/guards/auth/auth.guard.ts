import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/utils/helpers';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private readonly router: Router,
        private authService: MsalService,
        private broadcastService: MsalBroadcastService
    ) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (state.url.indexOf('login') > -1) {
            if (Auth.checkSession()) {
                return this.router.createUrlTree(['/']);
            } else {
                return true;
            }
        } else {
            if (!Auth.checkSession()) {
                return this.router.createUrlTree(['/login']);
            } else {
                return true;
            }
        }
    }
}
