import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileResponse, Response, ResponseV1 } from 'src/app/utils/interfaces';
import {
  NivelModalidadDTO,
  NivelModalidadDTOV1,
  PageResult,
  PageResultV1,
  TablePaginatorSearch,
} from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LevelModalityService {
  list: NivelModalidadDTOV1[];

  constructor(private http: HttpClient) {
    this.list = [];
  }

  getAllLevelModality(filters: TablePaginatorSearch): Observable<ResponseV1<PageResultV1<NivelModalidadDTOV1[]>>> {
    return this.http.get<ResponseV1<PageResultV1<NivelModalidadDTOV1[]>>>(
      environment.api.concat('/CatNivelModalidad/GetAll'),
      {
        params: {
          pageSize: filters.pageSize,
          pageNumber: filters.pageNumber,
          // ordenar: filters.orderBy,
          // dir: filters.dir,
          // filtro: filters.search,
          // inactivos: filters.inactives,
        },
      }
    );
  }

  getLevelModalityById(levelModalityId: string): Observable<ResponseV1<NivelModalidadDTOV1>> {
    return this.http.get<ResponseV1<NivelModalidadDTOV1>>(
      environment.api.concat(`/CatNivelModalidad/GetById?id=${levelModalityId}`)
    );
  }

  createLevelModality(body: NivelModalidadDTOV1): Observable<ResponseV1<never>> {
    return this.http.post<ResponseV1<never>>(environment.api.concat('/CatNivelModalidad/Add'), body);
  }

  updateLevelModality(body: NivelModalidadDTOV1): Observable<ResponseV1<never>> {
    return this.http.put<ResponseV1<never>>(environment.api.concat('/CatNivelModalidad/Update/'), body);
  }

  deleteLevelModality(levelModalityId: string): Observable<never> {
    return this.http.delete<never>(environment.api.concat(`/CatNivelModalidad/Disable?id=${levelModalityId}`));
  }

/*   getAllLevelModalityExcel(filters: TablePaginatorSearch): Observable<FileResponse> {
    return this.http.get<FileResponse>(environment.api.concat('/CatNivelModalidad/Excel/Descarga'), {
      params: {
        ordenar: filters.orderBy,
        dir: filters.dir,
        filtro: filters.search,
        inactivos: filters.inactives,
      },
    });
  } */

  getUrlAllLevelModalityExcel() {
    return environment.api.concat(`/Export/GetAll/NivelModalidad`);
  }

  async setAllLevelModality(): Promise<void> {
    const filters = new TablePaginatorSearch();
    filters.inactives = true;
    filters.pageSize = -1;
    filters.pageNumber = 1;

    return new Promise((resolve) => {
      this.getAllLevelModality(filters).subscribe((response) => {
        if (response.output) {
          const data = response.output.map((item) => new NivelModalidadDTOV1().deserialize(item));
          this.list = data.filter((item) => item.activo === true);
        }
        resolve();
      });
    });
  }
}
