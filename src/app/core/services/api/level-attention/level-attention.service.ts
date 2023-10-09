import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileResponse, Response } from 'src/app/utils/interfaces';
import { NivelAtencionDTO, PageResult, TablePaginatorSearch } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LevelAttentionService {
  levelAttentionList: NivelAtencionDTO[];

  constructor(private http: HttpClient) {
    this.levelAttentionList = [];
  }

  getAllLevelAttention(filters: TablePaginatorSearch): Observable<Response<PageResult<NivelAtencionDTO[]>>> {
    return this.http.get<Response<PageResult<NivelAtencionDTO[]>>>(environment.api.concat('/api/NivelAtencion'), {
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

  getLevelAttentionById(levelAttentionId: string): Observable<Response<NivelAtencionDTO>> {
    return this.http.get<Response<NivelAtencionDTO>>(environment.api.concat(`/api/NivelAtencion/${levelAttentionId}`));
  }

  createLevelAttention(body: NivelAtencionDTO): Observable<Response<never>> {
    return this.http.post<Response<never>>(environment.api.concat('/api/NivelAtencion'), body);
  }

  updateLevelAttention(body: NivelAtencionDTO): Observable<Response<never>> {
    return this.http.put<Response<never>>(environment.api.concat('/api/NivelAtencion/'), body);
  }

  deleteLevelAttention(levelAttentionId: string): Observable<never> {
    return this.http.delete<never>(environment.api.concat(`/api/NivelAtencion/${levelAttentionId}`));
  }

  getAllLevelAttentionExcel(filters: TablePaginatorSearch): Observable<FileResponse> {
    return this.http.get<FileResponse>(environment.api.concat('/api/NivelAtencion/Excel/Descarga'), {
      params: {
        ordenar: filters.orderBy,
        dir: filters.dir,
        filtro: filters.search,
        inactivos: filters.inactives,
      },
    });
  }

  async setAllLevelAttention(): Promise<void> {
    const filters = new TablePaginatorSearch();
    filters.inactives = true;
    filters.pageSize = -1;
    filters.pageNumber = 1;

    return new Promise((resolve) => {
      this.getAllLevelAttention(filters).subscribe((response) => {
        if (response.data.data) {
          const data = response.data.data.map((item) => new NivelAtencionDTO().deserialize(item));
          this.levelAttentionList = data.filter((item) => item.activo === true);
        }
        resolve();
      });
    });
  }
}
