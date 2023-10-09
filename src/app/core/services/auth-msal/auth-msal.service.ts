import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Auth } from 'src/app/utils/helpers';
import { Perfil } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';
import { UsersService } from '../api/users/users.service';

@Injectable({
    providedIn: 'root',
})
export class AuthMsalService {
    constructor(
        private authService: MsalService,
        private readonly users: UsersService,
        private readonly router: Router
    ) { }

    logout(redirectURL?: string) {
        this.users.userSession = new Perfil();
        Auth.logout();
        this.authService.logoutRedirect({
            postLogoutRedirectUri: `${environment.msal.redirect}${redirectURL ? redirectURL : ''}`,
        });
    }
}
