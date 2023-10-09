import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileResponse, Response, ResponseV1 } from 'src/app/utils/interfaces';
import {
  AreaResponsableDTO,
  AreaResponsableDTOV1,
  CopiadoRequest,
  CopiadoResult,
  PageResult,
  PageResultV1,
  TablePaginatorSearch,
} from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ResponsibilityAreasService {
  responsibilityAreasList: AreaResponsableDTOV1[];

  constructor(private http: HttpClient) {
    this.responsibilityAreasList = [];
  }

  getAllResponsibilityAreas(
    filters: TablePaginatorSearch
  ): Observable<ResponseV1<PageResultV1<AreaResponsableDTOV1[]>>> {
    return this.http.get<ResponseV1<PageResultV1<AreaResponsableDTOV1[]>>>(
      environment.api.concat('/CatAreaResponsable/GetAll'),
      {
        params: {
          pageSize: filters.pageSize,
          pageNumber: filters.pageNumber,
          ordenar: filters.orderBy,
          dir: filters.dir,
          filtro: filters.search,
          inactivos: filters.inactives,
        },
      }
    );
  }

  getResponsibilityAreaById(areaResponsabilidadId: string | number): Observable<ResponseV1<AreaResponsableDTOV1>> {
    return this.http.get<ResponseV1<AreaResponsableDTOV1>>(
      environment.api.concat(`/CatAreaResponsable/GetById?id=${areaResponsabilidadId}`)
    );
  }

  createResponsibilityArea(body: AreaResponsableDTOV1): Observable<ResponseV1<never>> {
    return this.http.post<ResponseV1<never>>(environment.api.concat('/CatAreaResponsable/Add'), body);
  }

  updateResponsibilityArea(body: AreaResponsableDTOV1): Observable<ResponseV1<never>> {
    return this.http.put<ResponseV1<never>>(environment.api.concat('/CatAreaResponsable/Update'), body);
  }

  deleteResponsibilityArea(areaResponsabilidadId: string | number): Observable<ResponseV1<never>> {
    return this.http.delete<ResponseV1<never>>(
      environment.api.concat(`/CatAreaResponsable/Disable?id=${areaResponsabilidadId}`)
    );
  }

  copyResponsibilityArea(body: CopiadoRequest): Observable<Response<CopiadoResult>> {
    return this.http.post<Response<CopiadoResult>>(environment.api.concat('/CatAreaResponsable/copiar'), body);
  }

/*   getAllAllResponsibilityAreasExcel(filters: TablePaginatorSearch): Observable<FileResponse> {
    return this.http.get<FileResponse>(environment.api.concat(`/Export/GetAll/AreaResponsable`), {
      params: {
        ordenar: filters.orderBy,
        dir: filters.dir,
        filtro: filters.search,
        inactivos: filters.inactives,
      },
    });
  } */

  getUrlAllResponsibilityAreasExcel() {
    return environment.api.concat(`/Export/GetAll/AreaResponsable`);
  }

  async setAllResponsibilityAreas(): Promise<void> {
    const filters = new TablePaginatorSearch();
    filters.inactives = true;
    filters.pageSize = -1;
    filters.pageNumber = 1;

    return new Promise((resolve) => {
      this.getAllResponsibilityAreas(filters).subscribe((response) => {
        if (response.output) {
          const data = response.output.map((item) => new AreaResponsableDTOV1().deserialize(item));
          this.responsibilityAreasList = data;
        }
        resolve();
      });
    });
  }
}
