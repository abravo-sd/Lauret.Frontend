import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MatrizUvmDTO, MatrizUvmDTOV1, TablePaginatorSearch, PageResult, PageResultV1 } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';
import { FileResponse, Response, ResponseV1 } from 'src/app/utils/interfaces';
@Injectable({
    providedIn: 'root',
})
export class UvmMatrixService {
    matrizUvmList: MatrizUvmDTOV1[];
    constructor(private http: HttpClient) {
        this.matrizUvmList = [];
    }

    getAllMatrizUvm(filters: TablePaginatorSearch): Observable<ResponseV1<PageResultV1<MatrizUvmDTOV1[]>>> {
        return this.http.get<ResponseV1<PageResultV1<MatrizUvmDTOV1[]>>>(environment.api.concat('/catMatrizUvm/GetAll'), {
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

    getMatrizUvmById(indicatorId: string | number): Observable<ResponseV1<MatrizUvmDTOV1>> {
        return this.http.get<ResponseV1<MatrizUvmDTOV1>>(environment.api.concat(`/catMatrizUvm/GetById?id=${indicatorId}`));
    }

    createMatrizUvm(body: MatrizUvmDTOV1): Observable<ResponseV1<never>> {
        return this.http.post<ResponseV1<never>>(environment.api.concat('/catMatrizUvm/Add'), body);
    }

    updateMatrizUvm(body: MatrizUvmDTOV1): Observable<ResponseV1<never>> {
        return this.http.put<ResponseV1<never>>(environment.api.concat('/catMatrizUvm/Update'), body);
    }

    deleteMatrizUvm(indicatorId: string | number): Observable<never> {
        return this.http.delete<never>(environment.api.concat(`/catMatrizUvm/Disable?id=${indicatorId}`));
    }

    getAllMatrizUvmExcell(filters: TablePaginatorSearch): Observable<FileResponse> {
        return this.http.get<FileResponse>(environment.api.concat('/catMatrizUvm/Excel/Descarga'), {
            params: {
                ordenar: filters.orderBy,
                dir: filters.dir,
                filtro: filters.search,
                inactivos: filters.inactives,
            },
        });
    }

    async setAllMatrizUvm(): Promise<void> {
        const filters = new TablePaginatorSearch();
        filters.inactives = true;
        filters.pageSize = -1;
        filters.pageNumber = 1;
        return new Promise((resolve) => {
            this.getAllMatrizUvm(filters).subscribe((response) => {
                if (response.output) {
                    const data = response.output.map((item) => new MatrizUvmDTOV1().deserialize(item));
                    this.matrizUvmList = data.filter((item) => item.activo === true);
                }
                resolve();
            });
        });
    }
}
