import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileResponse, Response } from 'src/app/utils/interfaces';
import { IndicadorDTO, PageResult, TablePaginatorSearch } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IndicatorService {
  indicadorList: IndicadorDTO[];
  constructor(private http: HttpClient) {
    this.indicadorList = [];
  }

  getAllIndicators(filters: TablePaginatorSearch): Observable<Response<PageResult<IndicadorDTO[]>>> {
    return this.http.get<Response<PageResult<IndicadorDTO[]>>>(environment.api.concat('/api/Indicator'), {
      params: {
        pageSize: filters.pageSize,
        pageNumber: filters.pageNumber,
        ordenar: filters.orderBy,
        dir: filters.dir,
        filtro: filters.search,
        inactivos: filters.inactives,
      },
    });
  }

  getIndicatorById(indicatorId: string): Observable<Response<IndicadorDTO>> {
    return this.http.get<Response<IndicadorDTO>>(environment.api.concat(`/api/Indicador/${indicatorId}`));
  }

  createIndicator(body: IndicadorDTO): Observable<Response<never>> {
    return this.http.post<Response<never>>(environment.api.concat('/api/Indicador'), body);
  }

  updateIndicator(body: IndicadorDTO): Observable<Response<never>> {
    return this.http.put<Response<never>>(environment.api.concat('/api/Indicador/'), body);
  }

  deleteIndicator(indicatorId: string): Observable<never> {
    return this.http.delete<never>(environment.api.concat(`/api/Indicador/${indicatorId}`));
  }

  getAllIndicatorExcell(filters: TablePaginatorSearch): Observable<FileResponse> {
    return this.http.get<FileResponse>(environment.api.concat('/api/Indicator/Excel/Descarga'), {
      params: {
        ordenar: filters.orderBy,
        dir: filters.dir,
        filtro: filters.search,
        inactivos: filters.inactives,
      },
    });
  }

  async setAllIndicator(): Promise<void> {
    const filters = new TablePaginatorSearch();
    filters.inactives = true;
    filters.pageSize = -1;
    filters.pageNumber = 1;
    return new Promise((resolve) => {
      this.getAllIndicators(filters).subscribe((response) => {
        if (response.data.data) {
          const data = response.data.data.map((item) => new IndicadorDTO().deserialize(item));
          this.indicadorList = data.filter((item) => item.activo === true);
        }
        resolve();
      });
    });
  }
}
