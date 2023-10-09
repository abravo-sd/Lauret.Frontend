import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response, ResponseV1 } from 'src/app/utils/interfaces';
import { CopiadoRequest, CopiadoResult, EvidenceDTO, PageResult, PageResultV1, TablePaginatorSearch } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable()
export class EvidencesCatalogService {
    constructor(private http: HttpClient) { }

    getAllEvidence(filters: TablePaginatorSearch): Observable<ResponseV1<PageResultV1<EvidenceDTO[]>>> {
        return this.http.get<ResponseV1<PageResultV1<EvidenceDTO[]>>>(environment.api.concat('/CatEvidencia/GetAll'), {
            params: {
                pageNumber: filters.pageNumber,
                pageSize: filters.pageSize,
                // ordenar: filters.orderBy,
                // dir: filters.dir,
                // filtro: filters.search,
                // inactivos: filters.inactives,
            },
        });
    }

    getEvidenceById(evidenceId: string | number): Observable<ResponseV1<EvidenceDTO>> {
        return this.http.get<ResponseV1<EvidenceDTO>>(environment.api.concat(`/CatEvidencia/GetById?id=${evidenceId}`));
    }

    createEvidence(body: EvidenceDTO): Observable<ResponseV1<never>> {
        return this.http.post<ResponseV1<never>>(environment.api.concat('/CatEvidencia/Add'), body);
    }

    updateEvidence(body: EvidenceDTO): Observable<ResponseV1<never>> {
        return this.http.put<ResponseV1<never>>(environment.api.concat('/CatEvidencia/Update'), body);
    }

    deleteEvidence(evidenceId: string | number): Observable<never> {
        return this.http.delete<never>(environment.api.concat(`/CatEvidencia/Disable/?id=${evidenceId}`));
    }

    getUrlAllEvidencesExcel() {
        return environment.api.concat(`/Export/GetAll/Evidence`);
    }

    getEvidenceByEvidenceFile(evidenceId: number): Observable<Response<EvidenceDTO>> {
        return this.http.get<Response<EvidenceDTO>>(environment.api.concat(`/CatEvidencia/GetById?id=${evidenceId}`), {
            params: {
                evidenciaArchivoId: evidenceId,
            },
        });
    }
}
