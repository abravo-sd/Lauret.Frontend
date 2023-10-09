import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/utils/interfaces';
import { CopiadoRequest, CopiadoResult, PageResult, RolProcesoDTO, TablePaginatorSearch } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RolesService {
  rolProcessList: RolProcesoDTO[];

  constructor(private http: HttpClient) {
    this.rolProcessList = [];
  }

  getAllRolProcess(filters: TablePaginatorSearch, process: string): Observable<Response<PageResult<RolProcesoDTO[]>>> {
    return this.http.get<Response<PageResult<RolProcesoDTO[]>>>(environment.api.concat('/api/RolProceso'), {
      params: {
        proceso: process,
        pageSize: filters.pageSize,
        pageNumber: filters.pageNumber,
        ordenar: filters.orderBy,
        dir: filters.dir,
      },
    });
  }

  createRolProcess(body: RolProcesoDTO): Observable<Response<never>> {
    return this.http.post<Response<never>>(environment.api.concat('/api/RolProceso'), body);
  }

  updateRolProcess(body: RolProcesoDTO): Observable<Response<never>> {
    return this.http.put<Response<never>>(environment.api.concat('/api/RolProceso'), body);
  }

  deleteRolProcess(rolProcessId: string, process: number): Observable<Response<never>> {
    return this.http.delete<Response<never>>(environment.api.concat(`/api/RolProceso/${rolProcessId}`), {
      params: {
        proceso: process,
      },
    });
  }

  copyRolProcess(body: CopiadoRequest): Observable<Response<CopiadoResult>> {
    return this.http.post<Response<CopiadoResult>>(environment.api.concat('/api/RolProceso/copiar'), body);
  }

  async setAllRolProcessList(process: string): Promise<void> {
    const filters = new TablePaginatorSearch();
    filters.inactives = true;
    filters.pageSize = -1;
    filters.pageNumber = 1;

    return new Promise((resolve) => {
      this.getAllRolProcess(filters, process).subscribe((response) => {
        if (response.data.data) {
          const data = response.data.data.map((item) => new RolProcesoDTO().deserialize(item));
          this.rolProcessList = data;
        }
        resolve();
      });
    });
  }
}
