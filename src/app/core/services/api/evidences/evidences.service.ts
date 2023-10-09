import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/utils/interfaces';
import { CopiadoRequest, CopiadoResult, Evidencia, PageResult } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable()
export class EvidencesService {
    constructor(private http: HttpClient) { }

    getAllEvidenceIndexList(processId: number, careerId: number): Observable<Response<PageResult<Evidencia[]>>> {
        return this.http.get<Response<PageResult<Evidencia[]>>>(environment.api.concat('/api/Evidencia'), {
            params: {
                proceso: processId,
                carrera: careerId,
            },
        });
    }

    createEvidence(body: Evidencia): Observable<Response<never>> {
        return this.http.post<Response<never>>(environment.api.concat('/api/Evidencia'), body);
    }

    updateEvidence(body: Evidencia): Observable<Response<never>> {
        return this.http.put<Response<never>>(environment.api.concat('/api/Evidencia/'), body);
    }

    getEvidenceByFilters(processId: number, careerId: number, criterionId: number): Observable<Response<Evidencia>> {
        return this.http.get<Response<Evidencia>>(
            environment.api.concat(`/api/Evidencia/${processId}/carrera/${careerId}/criterio/${criterionId}`)
        );
    }

    getEvidenceByEvidenceFile(evidenceFileId: number): Observable<Response<Evidencia>> {
        return this.http.get<Response<Evidencia>>(environment.api.concat(`/api/Evidencia/Archivo`), {
            params: {
                evidenciaArchivoId: evidenceFileId,
            },
        });
    }

    copyEvidenceIndex(body: CopiadoRequest): Observable<Response<CopiadoResult>> {
        return this.http.post<Response<CopiadoResult>>(environment.api.concat('/api/Evidencia/Copiar'), body);
    }
}
