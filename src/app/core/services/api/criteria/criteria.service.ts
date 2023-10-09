import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response, ResponseV1 } from 'src/app/utils/interfaces';
import { CopiadoRequest, CopiadoResult, CriterioDTO, CriterioDTOV1, PageResult, PageResultV1, TablePaginatorSearch } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CriteriaService {
    public criteriaList: CriterioDTOV1[];

    constructor(private http: HttpClient) {
        this.criteriaList = [];
    }

    getAllCriteria(
        filters: TablePaginatorSearch,
        process: string,
        career: string
    ): Observable<ResponseV1<PageResultV1<CriterioDTOV1[]>>> {
        return this.http.get<ResponseV1<PageResultV1<CriterioDTOV1[]>>>(environment.api.concat('/Criterio/GetAll'), {
            params: {
                idAcreditadora: process,
                idCarrera: career,
                pageSize: filters.pageSize,
                pageNumber: filters.pageNumber,
                ordenar: filters.orderBy,
                dir: filters.dir,
            },
        });
    }

    getCriteriaListByCareer(
        filters: TablePaginatorSearch,
        process: string,
        careerList: string[]
    ): Observable<ResponseV1<PageResultV1<CriterioDTOV1[]>>> {
        return this.http.post<ResponseV1<PageResultV1<CriterioDTOV1[]>>>(
            environment.api.concat('/api/Criterio/Carreras'),
            careerList,
            {
                params: {
                    proceso: process,
                    pageSize: filters.pageSize,
                    pageNumber: filters.pageNumber,
                    ordenar: filters.orderBy,
                    dir: filters.dir,
                },
            }
        );
    }

    getCriteriaById(processId: number, criteriaId: string): Observable<ResponseV1<CriterioDTOV1>> {
        return this.http.get<ResponseV1<CriterioDTOV1>>(environment.api.concat(`/Criterio/${criteriaId}`), {
            params: {
                proceso: processId,
            },
        });
    }

    createCriteria(body: CriterioDTOV1): Observable<ResponseV1<never>> {
        return this.http.post<ResponseV1<never>>(environment.api.concat('/Criterio/Add'), body);
    }

    updateCriteria(body: CriterioDTOV1): Observable<ResponseV1<never>> {
        return this.http.put<ResponseV1<never>>(environment.api.concat('/Criterio/Update'), body);
    }

    deleteCriteria(criteriaId: string, process: number): Observable<ResponseV1<never>> {
        return this.http.delete<ResponseV1<never>>(environment.api.concat(`/Criterio/Disable?id=${criteriaId}`), {
            params: {
                proceso: process,
            },
        });
    }

    copyCriteria(body: CopiadoRequest): Observable<Response<CopiadoResult>> {
        return this.http.post<Response<CopiadoResult>>(environment.api.concat('/Criterio/copiar'), body);
    }

    async setAllCriteria(process: string, career: string): Promise<void> {
        const filters = new TablePaginatorSearch();
        filters.inactives = true;
        filters.pageSize = -1;
        filters.pageNumber = 1;

        return new Promise((resolve) => {
            this.getAllCriteria(filters, process, career).subscribe((response) => {
                if (response.output) {
                    const data = response.output.map((item) => new CriterioDTOV1().deserialize(item));
                    this.criteriaList = data;
                }
                resolve();
            });
        });
    }
}
