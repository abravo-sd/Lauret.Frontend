import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileResponse, Response, ResponseV1 } from 'src/app/utils/interfaces';
import { TablePaginatorSearch, PageResult, PageResultV1, SedeDTO, SedeDTOV1 } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SitesService {
  sedeList: SedeDTOV1[];

  constructor(private http: HttpClient) {
    this.sedeList = [];
  }

  getAllSites(filters: TablePaginatorSearch): Observable<ResponseV1<PageResultV1<SedeDTOV1[]>>> {
    return this.http.get<ResponseV1<PageResultV1<SedeDTOV1[]>>>(environment.api.concat('/CatSede/GetAll'), {
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

  getSiteById(siteId: string): Observable<ResponseV1<SedeDTOV1>> {
    return this.http.get<ResponseV1<SedeDTOV1>>(environment.api.concat(`/CatSede/GetById?id=${siteId}`));
  }

  createSite(body: SedeDTOV1): Observable<ResponseV1<never>> {
    return this.http.post<ResponseV1<never>>(environment.api.concat('/CatSede/Add'), body);
  }

  updateSite(body: SedeDTOV1): Observable<ResponseV1<never>> {
    return this.http.put<ResponseV1<never>>(environment.api.concat('/CatSede/Update'), body);
  }

  deleteSite(siteId: string): Observable<never> {
    return this.http.delete<never>(environment.api.concat(`/CatSede/Disable?id=${siteId}`));
  }

  getAllSitesExcel(filters: TablePaginatorSearch): Observable<FileResponse> {
    return this.http.get<FileResponse>(environment.api.concat('/CatSede/Excel/Descarga'), {
      params: {
        ordenar: filters.orderBy,
        dir: filters.dir,
        filtro: filters.search,
        inactivos: filters.inactives,
      },
    });
  }

  getUrlAllSitesExcel() {
    return environment.api.concat(`/Export/GetAll/Sede`);
  }

  async setAllSites(): Promise<void> {
    const filters = new TablePaginatorSearch();
    filters.inactives = true;
    filters.pageSize = -1;
    filters.pageNumber = 1;

    return new Promise((resolve) => {
      this.getAllSites(filters).subscribe((response) => {
        if (response.output) {
          const data = response.output.map((item) => new SedeDTOV1().deserialize(item));
          this.sedeList = data.filter((item) => item.activo === true);
        }
        resolve();
      });
    });
  }
}
