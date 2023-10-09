import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/utils/interfaces';
import { PageResult, RegistroEvidencia, RegistroEvidenciaRequest, TablePaginatorSearch } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class EvidenceLogService {
  evidenceLogList: RegistroEvidencia[];

  constructor(private http: HttpClient) {
    this.evidenceLogList = [];
  }

  getAllEvidenceLogs(
    filters: TablePaginatorSearch,
    process: string,
    career: string
  ): Observable<Response<PageResult<RegistroEvidencia[]>>> {
    return this.http.get<Response<PageResult<RegistroEvidencia[]>>>(environment.api.concat('/api/Registro'), {
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

  updateEvidenceLog(body: RegistroEvidencia): Observable<Response<never>> {
    return this.http.put<Response<never>>(environment.api.concat('/api/Registro'), body);
  }

  updateFilesAndURLs(
    fileList: RegistroEvidenciaRequest,
    evidenceRecord: RegistroEvidencia
  ): Observable<Response<never>> {
    return this.http.post<Response<never>>(
      environment.api.concat(
        `/api/Registro/${evidenceRecord.acreditadoraProcesoId}/${evidenceRecord.carreraId}/${evidenceRecord.criterioId}/${evidenceRecord.evidenciaId}/${evidenceRecord.subareaId}/${evidenceRecord.campusId}`
      ),
      fileList
    );
  }

  acceptEvidence(accept: boolean, evidenceRecord: RegistroEvidencia): Observable<Response<never>> {
    return this.http.post<Response<never>>(
      environment.api.concat(
        `/api/Registro/Aceptar/${evidenceRecord.acreditadoraProcesoId}/${evidenceRecord.carreraId}/${evidenceRecord.criterioId}/${evidenceRecord.evidenciaId}/${evidenceRecord.subareaId}/${evidenceRecord.campusId}`
      ),
      accept
    );
  }

  getEvidenceRecordFile(evidenceRecordFileId: number): Observable<Response<never>> {
    return this.http.get<Response<never>>(environment.api.concat(`/api/Registro/${evidenceRecordFileId}`));
  }

  getEvidenceRecordFileBlob(url: string): Observable<Response<Blob>> {
    return this.http.get<Response<Blob>>(url, {
      responseType: 'blob' as 'json',
    });
  }

  async setAllEvidenceLogList(process: string, career: string): Promise<void> {
    const filters = new TablePaginatorSearch();
    filters.inactives = true;
    filters.pageSize = -1;
    filters.pageNumber = 1;

    return new Promise((resolve) => {
      this.getAllEvidenceLogs(filters, process, career).subscribe((response) => {
        if (response.data.data) {
          const data = response.data.data.map((item) => new RegistroEvidencia().deserialize(item));
          this.evidenceLogList = data;
        }
        resolve();
      });
    });
  }
}
