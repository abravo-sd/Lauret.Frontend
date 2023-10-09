import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    TablePaginatorSearch,
    PageResult,
    PageResultV1,
    IndicadorUVMDTO,
    IndicadorUVMDTOV1,
} from 'src/app/utils/models';

import { environment } from 'src/environments/environment';
import { FileResponse, Response, ResponseV1 } from 'src/app/utils/interfaces';

@Injectable({
    providedIn: 'root',
})
export class IndicatorUvmService {
    indicatorUvmList: IndicadorUVMDTOV1[];

    constructor(private http: HttpClient) {
        this.indicatorUvmList = [];
    }
    getAllIndicatorsUvm(filters: TablePaginatorSearch): Observable<ResponseV1<PageResultV1<IndicadorUVMDTOV1[]>>> {
        return this.http.get<ResponseV1<PageResultV1<IndicadorUVMDTOV1[]>>>(
            environment.api.concat('/IndicadorUvm/GetAll'),
            {
                params: {
                    pageSize: filters.pageSize,
                    pageNumber: filters.pageNumber,
                    // ordenar: filters.orderBy,
                    // dir: filters.dir,
                    // filtro: filters.search,
                    // inactivos: filters.inactives,
                },
            }
        );
    }

    getIndicatorsUvmById(indicadorUvmId: string | number): Observable<ResponseV1<IndicadorUVMDTOV1>> {
        return this.http.get<ResponseV1<IndicadorUVMDTOV1>>(
            environment.api.concat(`/IndicadorUvm/GetById?id=${indicadorUvmId}`)
        );
    }

    createIndicatorUvm(body: IndicadorUVMDTOV1): Observable<ResponseV1<never>> {
        return this.http.post<ResponseV1<never>>(environment.api.concat('/IndicadorUvm/Add'), body);
    }

    updateIndicatorUvm(body: IndicadorUVMDTOV1): Observable<ResponseV1<never>> {
        return this.http.put<ResponseV1<never>>(environment.api.concat('/IndicadorUvm/Update'), body);
    }

    deleteIndicatorUvm(indicadorUvmId: string | number): Observable<never> {
        return this.http.delete<never>(environment.api.concat(`/IndicadorUvm/Disable?id=${indicadorUvmId}`));
    }

    getAllIndicatorsUvmExcel(filters: TablePaginatorSearch): Observable<FileResponse> {
        return this.http.get<FileResponse>(environment.api.concat('/IndicadorUvm/Excel/Descarga'), {
            params: {
                ordenar: filters.orderBy,
                dir: filters.dir,
                filtro: filters.search,
                inactivos: filters.inactives,
            },
        });
    }

    getUrlAllIndicatorsUvmExcel() {
        return environment.api.concat(`/Export/GetAll/IndicadorUvm`);
    }

    async setAllIndicatorsUvm(): Promise<void> {
        const filters = new TablePaginatorSearch();
        filters.inactives = true;
        filters.pageSize = -1;
        filters.pageNumber = 1;

        return new Promise((resolve) => {
            this.getAllIndicatorsUvm(filters).subscribe((response) => {
                if (response.output) {
                    const data = response.output.map((item) => new IndicadorUVMDTOV1().deserialize(item));
                    this.indicatorUvmList = data.filter((item) => item.activo === true);
                }
                resolve();
            });
        });
    }
}
