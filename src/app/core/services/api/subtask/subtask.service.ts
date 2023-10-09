import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileResponse, Response } from 'src/app/utils/interfaces';
import { PageResult, SubareaDTO, TablePaginatorSearch } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SubtaskService {
  subtasksList: SubareaDTO[];

  constructor(private http: HttpClient) {
    this.subtasksList = [];
  }

  getAllSubtasks(filters: TablePaginatorSearch): Observable<Response<PageResult<SubareaDTO[]>>> {
    return this.http.get<Response<PageResult<SubareaDTO[]>>>(environment.api.concat('/api/Subarea'), {
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

  getSubtaskById(subtaskId: string): Observable<Response<SubareaDTO>> {
    return this.http.get<Response<SubareaDTO>>(environment.api.concat(`/api/Subarea/${subtaskId}`));
  }

  createSubtask(body: SubareaDTO): Observable<Response<never>> {
    return this.http.post<Response<never>>(environment.api.concat('/api/Subarea'), body);
  }

  updateSubtask(body: SubareaDTO): Observable<Response<never>> {
    return this.http.put<Response<never>>(environment.api.concat('/api/Subarea/'), body);
  }

  deleteSubtask(subtaskId: string): Observable<never> {
    return this.http.delete<never>(environment.api.concat(`/api/Subarea/${subtaskId}`));
  }

  getAllSubtasksExcel(filters: TablePaginatorSearch): Observable<FileResponse> {
    return this.http.get<FileResponse>(environment.api.concat('/api/Subarea/Excel/Descarga'), {
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

  async setAllSubtasks(): Promise<void> {
    const filters = new TablePaginatorSearch();
    filters.inactives = true;
    filters.pageSize = -1;
    filters.pageNumber = 1;

    return new Promise((resolve) => {
      this.getAllSubtasks(filters).subscribe((response) => {
        if (response.data.data) {
          const data = response.data.data.map((item) => new SubareaDTO().deserialize(item));
          this.subtasksList = data;
        }
        resolve();
      });
    });
  }
}
