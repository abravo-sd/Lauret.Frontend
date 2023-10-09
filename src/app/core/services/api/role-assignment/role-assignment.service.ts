import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/utils/interfaces';
import { PageResult, TablePaginatorSearch, UsuarioRolProcesoDTO } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoleAssignmentService {
  constructor(private http: HttpClient) {}

  getAllRoles(
    filters: TablePaginatorSearch,
    process: string,
    career: string
  ): Observable<Response<PageResult<UsuarioRolProcesoDTO[]>>> {
    return this.http.get<Response<PageResult<UsuarioRolProcesoDTO[]>>>(environment.api.concat('/api/RolAsignado'), {
      params: {
        proceso: process,
        carrera: career,
        pageSize: filters.pageSize,
        pageNumber: filters.pageNumber,
        ordenar: filters.orderBy,
        dir: filters.dir,
      },
    });
  }

  getRoleById(
    process: string,
    career: string,
    userId: string,
    roleId: string
  ): Observable<Response<UsuarioRolProcesoDTO>> {
    return this.http.get<Response<UsuarioRolProcesoDTO>>(
      environment.api.concat(`/api/RolAsignado/${process}/carrera/${career}/usuario/${userId}/rol/${roleId}`)
    );
  }

  createRole(body: UsuarioRolProcesoDTO): Observable<Response<never>> {
    return this.http.post<Response<never>>(environment.api.concat('/api/RolAsignado'), body);
  }

  updateRole(body: UsuarioRolProcesoDTO): Observable<Response<never>> {
    return this.http.put<Response<never>>(environment.api.concat('/api/RolAsignado'), body);
  }

  deleteRole(rolId: string, process: number, career: string, user: string): Observable<Response<never>> {
    return this.http.delete<Response<never>>(
      environment.api.concat(`/api/RolAsignado/${process}/carrera/${career}/usuario/${user}/rol/${rolId}`)
    );
  }
}
