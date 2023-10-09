import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileResponse, Response, ResponseV1 } from 'src/app/utils/interfaces';
import {
    TablePaginatorSearch,
    PageResult,
    PageResultV1,
    SubIndicadorUVMDTO,
    SubIndicadorUVMDTOV1,
} from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SubindicatorUvmService {
    subIndicatorUvmList: SubIndicadorUVMDTOV1[];

    constructor(private http: HttpClient) {
        this.subIndicatorUvmList = [];
    }
    getAllSubIndicatorsUvm(filters: TablePaginatorSearch): Observable<ResponseV1<PageResultV1<SubIndicadorUVMDTOV1[]>>> {
        return this.http.get<ResponseV1<PageResultV1<SubIndicadorUVMDTOV1[]>>>(
            environment.api.concat('/SubIndicadorUvm/GetAll'),
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

    getSubIndicatorUvmById(subIndicadorUvmId: string | number): Observable<ResponseV1<SubIndicadorUVMDTOV1>> {
        return this.http.get<ResponseV1<SubIndicadorUVMDTOV1>>(
            environment.api.concat(`/SubIndicadorUvm/GetById?id=${subIndicadorUvmId}`)
        );
    }

    createSubIndicatortUvm(body: SubIndicadorUVMDTOV1): Observable<ResponseV1<never>> {
        return this.http.post<ResponseV1<never>>(environment.api.concat('/SubIndicadorUvm/Add'), body);
    }

    updateSubIndicatorUvm(body: SubIndicadorUVMDTOV1): Observable<ResponseV1<never>> {
        return this.http.put<ResponseV1<never>>(environment.api.concat('/SubIndicadorUvm/Update'), body);
    }

    deleteSubIndicatorUvm(subIndicadorUvmId: string | number): Observable<never> {
        return this.http.delete<never>(environment.api.concat(`/SubIndicadorUvm/Disable?id=${subIndicadorUvmId}`));
    }

    getAllSubIndicatorUvmExcel(filters: TablePaginatorSearch): Observable<FileResponse> {
        return this.http.get<FileResponse>(environment.api.concat('/SubIndicadorUvm/Excel/Descarga'), {
            params: {
                ordenar: filters.orderBy,
                dir: filters.dir,
                filtro: filters.search,
                inactivos: filters.inactives,
            },
        });
    }

    getUrlAllSubIndicatorUvmExcel() {
        return environment.api.concat(`/Export/GetAll/SubIndicadorUvm`);
    }

    async setAllSubIndicatorsUvm(): Promise<void> {
        const filters = new TablePaginatorSearch();
        filters.inactives = true;
        filters.pageSize = -1;
        filters.pageNumber = 1;

        return new Promise((resolve) => {
            this.getAllSubIndicatorsUvm(filters).subscribe((response) => {
                if (response.output) {
                    const data = response.output.map((item) => new SubIndicadorUVMDTOV1().deserialize(item));
                    this.subIndicatorUvmList = data.filter((item) => item.activo === true);
                }
                resolve();
            });
        });
    }
}
