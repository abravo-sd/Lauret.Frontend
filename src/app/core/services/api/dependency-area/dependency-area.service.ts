import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileResponse, Response, ResponseV1 } from 'src/app/utils/interfaces';
import { PageResult, PageResultV1, TablePaginatorSearch } from 'src/app/utils/models';
import { DependenciaAreaDTOV1 } from 'src/app/utils/models/dependencia-area.dto.v1';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DependencyAreaService {
  constructor(private http: HttpClient) {}

  getAllDependenciaAreas(filters: TablePaginatorSearch): Observable<ResponseV1<PageResultV1<DependenciaAreaDTOV1[]>>> {
    return this.http.get<ResponseV1<PageResultV1<DependenciaAreaDTOV1[]>>>(
      environment.api.concat('/CatDependenciaArea/GetAll'),
      {
        params: {
          pageNumber: filters.pageNumber,
          pageSize: filters.pageSize,
          // ordenar: filters.orderBy,
          // dir: filters.dir,
          // filtro: filters.search,
          // inactivos: filters.inactives,
        },
      }
    );
  }

  getDependenciaAreaById(regionId: string): Observable<ResponseV1<DependenciaAreaDTOV1>> {
    return this.http.get<ResponseV1<DependenciaAreaDTOV1>>(
      environment.api.concat(`/CatDependenciaArea/GetById?id=${regionId}`)
    );
  }

  createDependenciaArea(body: DependenciaAreaDTOV1): Observable<ResponseV1<never>> {
    return this.http.post<ResponseV1<never>>(environment.api.concat('/CatDependenciaArea/Add'), body);
  }

  updateDependenciaArea(body: DependenciaAreaDTOV1): Observable<ResponseV1<never>> {
    return this.http.put<ResponseV1<never>>(environment.api.concat('/CatDependenciaArea/Update'), body);
  }

  deleteDependenciaArea(regionId: string): Observable<never> {
    return this.http.delete<never>(environment.api.concat(`/CatDependenciaArea/Disable/?id=${regionId}`));
  }

  getAllDependenciaAreasExcel(filters: TablePaginatorSearch): Observable<FileResponse> {
    return this.http.get<FileResponse>(environment.api.concat('/CatDependenciaArea/Excel/Descarga'), {
      params: {
        ordenar: filters.orderBy,
        dir: filters.dir,
        filtro: filters.search,
        inactivos: filters.inactives,
      },
    });
  }

  getUrlAllDependenciaAreasExcel(){
    return environment.api.concat(`/Export/GetAll/DependenciaArea`);
  }
}
