import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CriterioDTO, PageResult, TablePaginatorSearch } from 'src/app/utils/models';
import { Response } from 'src/app/utils/interfaces';
import { environment } from 'src/environments/environment';
import { ComentarioDTO } from 'src/app/utils/models/comentario';

@Injectable({ providedIn: 'root' })
export class FollowupService {
  criteriaList: ComentarioDTO[];

  constructor(private http: HttpClient) {
    this.criteriaList = [];
  }

  getAllFollowupComments(
    filters: TablePaginatorSearch,
    process: string,
    career: string
  ): Observable<Response<PageResult<ComentarioDTO[]>>> {
    return this.http.get<Response<PageResult<ComentarioDTO[]>>>(environment.api.concat('/api/Seguimiento'), {
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

  createComment(body: ComentarioDTO): Observable<Response<never>> {
    return this.http.post<Response<never>>(environment.api.concat('/api/Seguimiento'), body);
  }

  updateComment(body: ComentarioDTO): Observable<Response<never>> {
    return this.http.put<Response<never>>(environment.api.concat('/api/Seguimiento'), body);
  }

  deleteCriteria(comentarioSeguimientoId: number): Observable<Response<never>> {
    return this.http.delete<Response<never>>(environment.api.concat(`/api/Seguimiento/${comentarioSeguimientoId}`), {
      params: {},
    });
  }

  async setAllFollowupComments(process: string, career: string): Promise<void> {
    const filters = new TablePaginatorSearch();
    filters.inactives = true;
    filters.pageSize = -1;
    filters.pageNumber = 1;

    return new Promise((resolve) => {
      this.getAllFollowupComments(filters, process, career).subscribe((response) => {
        if (response.data.data) {
          const data = response.data.data.map((item) => new ComentarioDTO().deserialize(item));
          this.criteriaList = data;
        }
        resolve();
      });
    });
  }
}
