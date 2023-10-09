import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  PageResult,
  PageResultV1,
  PerfilDTO,
  PerfilDTOV1,
  PerfilAddUpdateDTOV1,
  TablePaginatorSearch,
} from 'src/app/utils/models';
import { Observable } from 'rxjs';
import { FileResponse, Response, ResponseV1 } from 'src/app/utils/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profileList: PerfilDTOV1[];
  constructor(private http: HttpClient) {
    this.profileList = [];
  }

  getAllProfiles(filters: TablePaginatorSearch): Observable<ResponseV1<PageResultV1<PerfilDTOV1[]>>> {
    return this.http.get<ResponseV1<PageResultV1<PerfilDTOV1[]>>>(environment.api.concat('/Perfil/GetAll'), {
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

  getProfileById(perfilId: string | number): Observable<ResponseV1<PerfilDTOV1>> {
    return this.http.get<ResponseV1<PerfilDTOV1>>(environment.api.concat(`/Perfil/GetById?id=${perfilId}`));
  }

  createProfile(body: PerfilAddUpdateDTOV1): Observable<Response<never>> {
    return this.http.post<Response<never>>(environment.api.concat('/Perfil/Add'), body);
  }

  updateProfile(body: PerfilAddUpdateDTOV1): Observable<Response<never>> {
    return this.http.put<Response<never>>(environment.api.concat('/Perfil/Update'), body);
  }

  deleteProfile(perfilId: string | number): Observable<never> {
    return this.http.delete<never>(environment.api.concat(`/Perfil/Disable?id=${perfilId}`));
  }

  getAllProfilesExcel(filters: TablePaginatorSearch): Observable<FileResponse> {
    return this.http.get<FileResponse>(environment.api.concat('/Perfil/Excel/Descarga'), {
      params: {
        ordenar: filters.orderBy,
        dir: filters.dir,
        filtro: filters.search,
        inactivos: filters.inactives,
      },
    });
  }

  getUrlAllProfilesExcel() {
    return environment.api.concat(`/Export/GetAll/Perfil`);
  }

  async setAllProfiles(): Promise<void> {
    const filters = new TablePaginatorSearch();
    filters.inactives = true;
    filters.pageSize = -1;
    filters.pageNumber = 1;

    return new Promise((resolve) => {
      this.getAllProfiles(filters).subscribe((response) => {
        if (response.output) {
          const data = response.output.map((item) => new PerfilDTOV1().deserialize(item));
          this.profileList = data.filter((item) => item.activo === true);
        }
        resolve();
      });
    });
  }
}
