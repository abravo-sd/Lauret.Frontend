import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FileResponse, Response, ResponseV1 } from 'src/app/utils/interfaces';
import {
  CatalogoUsuarioDTOV1,
  PageResult,
  PageResultV1,
  Perfil,
  Permiso,
  TablePaginatorSearch,
  UsuarioAddUpdateDTOV1,
  UsuarioDTO,
  UsuarioDTOV1,
  UsuarioActiveDirectory,
  Vista,
} from 'src/app/utils/models';
import { UsuarioPerfilPermisosDTO } from 'src/app/utils/models/usuario-perfil-permisos.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  permissions: Permiso[];
  userSession: Perfil;
  userCatalogList: UsuarioDTO[];

  constructor(private http: HttpClient) {
    this.permissions = [];
    this.userSession = new Perfil();
    this.userCatalogList = [];
  }

  get permissionList(): Permiso[] {
    return this.permissions;
  }

  getAllUsers(filters: TablePaginatorSearch): Observable<ResponseV1<PageResultV1<UsuarioDTOV1[]>>> {
    return this.http.get<ResponseV1<PageResultV1<UsuarioDTOV1[]>>>(environment.api.concat('/Usuario/GetAll'), {
      params: {
        pageSize: filters.pageSize,
        pageNumber: filters.pageNumber,
        // ordenar: filters.orderBy,
        // dir: filters.dir,
        // filtro: filters.search,
        // inactivos: filters.inactives,
      },
    });
  }

  searchUser(email: string): Observable<ResponseV1<UsuarioActiveDirectory>> {
    return this.http.get<ResponseV1<UsuarioActiveDirectory>>(
      environment.api.concat(`/Usuario/ExisteCuenta?correo=${email}`)
    );
  }

  getUserDataById(userId: string): Observable<Response<UsuarioDTO>> {
    return this.http.get<Response<UsuarioDTO>>(environment.api.concat(`/Usuario/GetById?id=${userId}`));
  }

  // getProfileUser(): Observable<Response<Perfil>> {
  //     return this.http.get<Response<Perfil>>(environment.api.concat('/Usuario/Perfil'));
  // }

  // getProfileUser(): Observable<Response<Perfil>> {
  //     return of(PERFIL_TEST);
  // }

  getUserProfilePermissions(mail: string): Observable<any> {
    return this.http.get<any>(environment.api.concat(`/UsuarioPerfilPermisos/GetAll?correo=${mail}`));
  }

  getUserById(userId: string | number): Observable<ResponseV1<CatalogoUsuarioDTOV1>> {
    return this.http.get<ResponseV1<CatalogoUsuarioDTOV1>>(
      environment.api.concat(`/Usuario/GetById?idUsuario=${userId}`)
    );
  }

  createUser(body: UsuarioAddUpdateDTOV1): Observable<ResponseV1<never>> {
    return this.http.post<ResponseV1<never>>(environment.api.concat('/Usuario/Add'), body);
  }

  updateUser(body: UsuarioAddUpdateDTOV1): Observable<ResponseV1<never>> {
    return this.http.put<ResponseV1<never>>(environment.api.concat('/Usuario/Update/'), body);
  }

  deleteUser(userId: string | number): Observable<never> {
    return this.http.delete<never>(environment.api.concat(`/Usuario/Disable?id=${userId}`));
  }

  getAllUsersExcel(filters: TablePaginatorSearch): Observable<FileResponse> {
    return this.http.get<FileResponse>(environment.api.concat('/Usuario/Excel/Descarga'), {
      params: {
        ordenar: filters.orderBy,
        dir: filters.dir,
        filtro: filters.search,
        inactivos: filters.inactives,
      },
    });
  }

  getUrlAllUsersExcel() {
    return environment.api.concat(`/Export/GetAll/Usuario`);
  }

  async setAllUsers(): Promise<void> {
    const filters = new TablePaginatorSearch();
    filters.inactives = true;
    filters.pageSize = -1;
    filters.pageNumber = 1;
    await new Promise((resolve) => {
      this.getAllUsers(filters).subscribe((response) => {
        if (response.output) {
          const data = response.output.map((area) => new UsuarioDTO().deserialize(area));
          this.userCatalogList = data.filter((item) => item.activo === true);
        }
        resolve(true);
      });
    });
  }
}

const VISTAS_TEST = JSON.parse(
  JSON.stringify([
    {
      vistaId: '1',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Áreas de reponsabilidad',
    },
    {
      vistaId: '10',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Roles',
    },
    {
      vistaId: '11',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Sedes',
    },
    {
      vistaId: '12',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Subáreas',
    },
    {
      vistaId: '13',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Tipos de evidencia',
    },
    {
      vistaId: '15',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Carga de archivos',
    },
    {
      vistaId: '16',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Índice de evidencias',
    },
    {
      vistaId: '17',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Usuarios',
    },
    {
      vistaId: '18',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Libro electrónico',
    },
    {
      vistaId: '19',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Registro de evidencias - Validación',
    },
    {
      vistaId: '2',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Campus',
    },
    {
      vistaId: '20',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Seguimiento evaluación',
    },
    {
      vistaId: '21',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Reportes',
    },
    {
      vistaId: '22',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Asignación de roles',
    },
    {
      vistaId: '23',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Carga de archivos',
    },
    {
      vistaId: '24',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Visualización de libro electrónico',
    },
    {
      vistaId: '25',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Instituciones acreditadoras - proceso',
    },
    {
      vistaId: '26',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Reportes',
    },
    {
      vistaId: '27',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Registro de evidencias - Carga',
    },
    {
      vistaId: '28',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Perfiles',
    },
    {
      vistaId: '29',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Nivel/Modalidad',
    },
    {
      vistaId: '3',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Cápitulos',
    },
    {
      vistaId: '30',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Usuarios',
    },
    {
      vistaId: '31',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Periodo de Evaluación',
    },
    {
      vistaId: '32',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Áreas responsable',
    },
    {
      vistaId: '33',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Áreas corporativas',
    },
    {
      vistaId: '34',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Componentes',
    },
    {
      vistaId: '35',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Ponderación',
    },
    {
      vistaId: '36',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Matriz UVM',
    },
    {
      vistaId: '37',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Normativa',
    },
    {
      vistaId: '38',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Configuración general',
    },
    {
      vistaId: '39',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Elementos de evaluación',
    },
    {
      vistaId: '4',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Carreras',
    },
    {
      vistaId: '40',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Indicadores',
    },
    {
      vistaId: '41',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Escala de medición',
    },
    {
      vistaId: '42',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Proceso de copiado',
    },
    {
      vistaId: '43',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Captura de metas y resultados',
    },
    {
      vistaId: '44',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Carga de evidencias SIAC',
    },
    {
      vistaId: '45',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Ejecución de autoevaluación',
    },
    {
      vistaId: '46',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Revisión de autoevaluación',
    },
    {
      vistaId: '47',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Plan de mejora',
    },
    {
      vistaId: '48',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Auditoria',
    },
    {
      vistaId: '49',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Reportes y seguimiento',
    },
    {
      vistaId: '5',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Criterios',
    },
    {
      vistaId: '6',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Instituciones acreditadoras',
    },
    {
      vistaId: '7',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Niveles de atención',
    },
    {
      vistaId: '8',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Niveles organizacional',
    },
    {
      vistaId: '9',
      vistaNombre: null,
      tipoAccesoIds: [],
      nombre: 'Regiones',
    },
  ])
);

const PERFIL_TEST = JSON.parse(
  JSON.stringify({
    message: 'Ok',
    statusCode: 200,
    success: true,
    data: {
      id: '8ABBB2AB-6D2A-43E6-933A-A644AA3BE934',
      nombre: 'Pruebas SIAC',
      correo: 'siac.test@qaLaureateLATAMMX.onmicrosoft.com',
      activo: true,
      esAdmin: true,
      vistaInicial: null,
      vistas: VISTAS_TEST,
    },
  })
);
