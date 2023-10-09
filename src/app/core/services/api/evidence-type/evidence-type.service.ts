import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileResponse, Response } from 'src/app/utils/interfaces';
import { PageResult, TablePaginatorSearch, TipoEvidenciaDTO } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class EvidenceTypeService {
    public evidenceTypeList: TipoEvidenciaDTO[];

    constructor(private http: HttpClient) {
        this.evidenceTypeList = [];
    }

    getAllEvidenceType(filters: TablePaginatorSearch): Observable<Response<PageResult<TipoEvidenciaDTO[]>>> {
        return this.http.get<Response<PageResult<TipoEvidenciaDTO[]>>>(environment.api.concat('/api/TipoEvidencia'), {
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

    getEvidenceTypeById(evidenceTypeId: string): Observable<Response<TipoEvidenciaDTO>> {
        return this.http.get<Response<TipoEvidenciaDTO>>(environment.api.concat(`/api/TipoEvidencia/${evidenceTypeId}`));
    }

    createEvidenceType(body: TipoEvidenciaDTO): Observable<Response<never>> {
        return this.http.post<Response<never>>(environment.api.concat('/api/TipoEvidencia'), body);
    }

    updateEvidenceType(body: TipoEvidenciaDTO): Observable<Response<never>> {
        return this.http.put<Response<never>>(environment.api.concat('/api/TipoEvidencia/'), body);
    }

    deleteEvidenceType(evidenceTypeId: string): Observable<never> {
        return this.http.delete<never>(environment.api.concat(`/api/TipoEvidencia/${evidenceTypeId}`));
    }

    getAllEvidenceTypeExcel(filters: TablePaginatorSearch): Observable<FileResponse> {
        return this.http.get<FileResponse>(environment.api.concat('/api/TipoEvidencia/Excel/Descarga'), {
            params: {
                ordenar: filters.orderBy,
                dir: filters.dir,
                filtro: filters.search,
                inactivos: filters.inactives,
            },
        });
    }

    async setAllEvidenceType(): Promise<void> {
        const filters = new TablePaginatorSearch();
        filters.inactives = true;
        filters.pageSize = -1;
        filters.pageNumber = 1;

        return new Promise((resolve) => {
            this.getAllEvidenceType(filters).subscribe((response) => {
                if (response.data.data) {
                    const data = response.data.data.map((item) => new TipoEvidenciaDTO().deserialize(item));
                    this.evidenceTypeList = data.filter((item) => item.activo === true);
                }
                resolve();
            });
        });
    }
}
