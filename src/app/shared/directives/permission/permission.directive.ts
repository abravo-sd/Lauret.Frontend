import { Directive, Input, OnChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { RolesService, UsersService } from 'src/app/core/services';
import { MODULESCATALOG, MODULESCATALOGV2 } from 'src/app/utils/constants';
import { Auth } from 'src/app/utils/helpers';
import { Perfil } from 'src/app/utils/models';

@Directive({
  selector: '[appPermission]',
})
export class PermissionDirective implements OnChanges {
  @Input() appPermission: string;
  DatosSesion: Perfil;

  constructor(
    private users: UsersService,
    private readonly roles: RolesService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    this.DatosSesion = Auth.getSession();
    this.users.userSession = this.DatosSesion;
  }

  ngOnChanges(): void {
    this.updateView();
  }

  updateView(): void {
    this.viewContainer.clear();

    if (this.users.userSession.esAdmin) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      return;
    }

    const viewList = this.users.userSession.vistas;
    const userModules = MODULESCATALOGV2.filter((item) => viewList.find((view) => view.vistaId === item.id.toString()));
    const validUrl = userModules.find((item) => item.url.includes(this.appPermission));
    if (validUrl) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
