import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { fromEvent, Subject } from 'rxjs';
import { UsersService } from 'src/app/core/services';
import { Auth } from 'src/app/utils/helpers';
import { Perfil, UserSession } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  isDesktopMode: boolean;
  showSubmenuCatalogs: boolean;
  showSubmenuConfigurations: boolean;
  showSubmenuOperations: boolean;
  showSubmenuMatrizUvm: boolean;
  showSubmenuMetasResultados: boolean;
  

  DatosSesion: Perfil;

  private readonly _destroying$ = new Subject<void>();
  private name: string;

  constructor(private authService: MsalService, private readonly router: Router, private readonly users: UsersService) {
    this.DatosSesion = Auth.getSession();

    this.isDesktopMode = true;
    this.isDesktopMode = null;
    this.name = null;
    this.showSubmenuCatalogs = null;
    this.showSubmenuConfigurations = null;
    this.showSubmenuOperations = null;
    this.showSubmenuMatrizUvm = null;
    this.showSubmenuMetasResultados= null;
  }

  ngOnInit(): void {
    this.name = this.DatosSesion.nombre;
    this.trackingResizeWindow();
    setTimeout(() => {
      this.openSubMenu();
    }, 500);
  }

  get currentUserName(): string {
    return this.name;
  }

  get getCurrentRoute(): string {
    return this.router.url;
  }

  private trackingResizeWindow(): void {
    fromEvent(window, 'resize').subscribe((event) => {
      const windowEvent = event.target as Window;
      if (windowEvent.innerWidth > 767) {
        this.isDesktopMode = true;
      } else {
        this.isDesktopMode = false;
      }
    });
    if (window.innerWidth > 767) {
      this.isDesktopMode = true;
    } else {
      this.isDesktopMode = false;
    }
  }

  private openSubMenu(): void {
    if (this.getCurrentRoute.includes('/catalogo')) {
      this.showSubmenuCatalogs = true;
    } else if (this.getCurrentRoute.includes('/configuracion')) {
      this.showSubmenuConfigurations = true;
    } else if (this.getCurrentRoute.includes('/operacion')) {
      this.showSubmenuOperations = true;
    } else if (this.getCurrentRoute.includes('/catalogo/matriz-uvm')) {
      this.showSubmenuMatrizUvm = true;
    } else if (this.getCurrentRoute.includes('/metas-resultados')) {
      this.showSubmenuMetasResultados = true;}
  }

  logout() {
    this.users.userSession = new Perfil();
    Auth.logout();
    this.authService.logoutRedirect({
      postLogoutRedirectUri: environment.msal.redirect,
    });
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
