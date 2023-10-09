import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileResponse, Response, ResponseV1 } from 'src/app/utils/interfaces';
import {
  IndicadorSiacDTO,
  IndicadorSiacDTOV1,
  PageResult,
  PageResultV1,
  TablePaginatorSearch,
} from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IndicatorSiacService {
  indicatorSiacList: IndicadorSiacDTOV1[];

  constructor(private http: HttpClient) {
    this.indicatorSiacList = [];
  }

  getAllIndicatorsSiac(filters: TablePaginatorSearch): Observable<ResponseV1<PageResultV1<IndicadorSiacDTOV1[]>>> {
    return this.http.get<ResponseV1<PageResultV1<IndicadorSiacDTOV1[]>>>(
      environment.api.concat('/CatIndicadorSiac/GetAll'),
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

  getIndicatorSiacById(indicadorSiacId: string): Observable<ResponseV1<IndicadorSiacDTOV1>> {
    return this.http.get<ResponseV1<IndicadorSiacDTOV1>>(
      environment.api.concat(`/CatIndicadorSiac/GetById?id=${indicadorSiacId}`)
    );
  }

  createIndicatorSiac(body: IndicadorSiacDTOV1): Observable<ResponseV1<never>> {
    return this.http.post<ResponseV1<never>>(environment.api.concat('/CatIndicadorSiac/Add'), body);
  }

  updateIndicatorSiac(body: IndicadorSiacDTOV1): Observable<ResponseV1<never>> {
    return this.http.put<ResponseV1<never>>(environment.api.concat('/CatIndicadorSiac/Update'), body);
  }

  deleteIndicatorSiac(indicadorSiacId: string): Observable<never> {
    return this.http.delete<never>(environment.api.concat(`/CatIndicadorSiac/Disable?id=${indicadorSiacId}`));
  }

  getAllIndicadorSiacExcel(filters: TablePaginatorSearch): Observable<FileResponse> {
    return this.http.get<FileResponse>(environment.api.concat('/CatIndicadorSiac/Excel/Descarga'), {
      params: {
        ordenar: filters.orderBy,
        dir: filters.dir,
        filtro: filters.search,
        inactivos: filters.inactives,
      },
    });
  }

  getUrlAllIndicadorSiacExcel(){
    return environment.api.concat(`/Export/GetAll/IndicadorSIAC`);
  }

  async setAllIndicatorSiac(): Promise<void> {
    const filters = new TablePaginatorSearch();
    filters.inactives = true;
    filters.pageSize = -1;
    filters.pageNumber = 1;

    return new Promise((resolve) => {
      this.getAllIndicatorsSiac(filters).subscribe((response) => {
        if (response.output) {
          const data = response.output.map((item) => new IndicadorSiacDTOV1().deserialize(item));
          this.indicatorSiacList = data.filter((item) => item.activo === true);
        }
        resolve();
      });
    });
  }
}
