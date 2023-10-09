import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/utils/interfaces';
import { CopiadoRequest, CopiadoResult, Evidencia, PageResult, TablePaginatorSearch } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class EvidenceIndexService {
  evidenceIndexList: Evidencia[];

  constructor(private http: HttpClient) {
    this.evidenceIndexList = [];
  }

  getAllEvidences(
    filters: TablePaginatorSearch,
    process: string,
    career: string
  ): Observable<Response<PageResult<Evidencia[]>>> {
    return this.http.get<Response<PageResult<Evidencia[]>>>(environment.api.concat('/api/Evidencia'), {
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

  createEvidence(body: Evidencia): Observable<Response<never>> {
    return this.http.post<Response<never>>(environment.api.concat('/api/Evidencia'), body);
  }

  updateEvidence(body: Evidencia): Observable<Response<never>> {
    return this.http.put<Response<never>>(environment.api.concat('/api/Evidencia'), body);
  }

  deleteEvidence(evidenceId: number, process: number, career: string, criteria: string): Observable<Response<never>> {
    return this.http.delete<Response<never>>(
      environment.api.concat(`/api/Evidencia/${process}/carrera/${career}/criterio/${criteria}/id/${evidenceId}`),
      {
        params: {},
      }
    );
  }

  getEvidencesToEbookLinks(process: number, career: string, criteria: string): Observable<Response<Evidencia[]>> {
    return this.http.get<Response<Evidencia[]>>(
      environment.api.concat(`/api/Evidencia/${process}/carrera/${career}/criterio/${criteria}`)
    );
  }

  copyEvidence(body: CopiadoRequest): Observable<Response<CopiadoResult>> {
    return this.http.post<Response<CopiadoResult>>(environment.api.concat('/api/Evidencia/copiar'), body);
  }

  async setAllEvidenceIndexList(process: string, career: string): Promise<void> {
    const filters = new TablePaginatorSearch();
    filters.inactives = true;
    filters.pageSize = -1;
    filters.pageNumber = 1;

    return new Promise((resolve) => {
      this.getAllEvidences(filters, process, career).subscribe((response) => {
        if (response.data.data) {
          const data = response.data.data.map((item) => new Evidencia().deserialize(item));
          this.evidenceIndexList = data;
        }
        resolve();
      });
    });
  }
}
