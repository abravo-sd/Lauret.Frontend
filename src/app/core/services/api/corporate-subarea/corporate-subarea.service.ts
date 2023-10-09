import { SubAreaCorporativaDTOV1 } from './../../../../utils/models/subarea-corporativa.dto.v1';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileResponse, Response, ResponseV1 } from 'src/app/utils/interfaces';
import { PageResult, PageResultV1, TablePaginatorSearch } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CorporateSubAreaService {
    subAreaCorporateList: SubAreaCorporativaDTOV1[];
    constructor(private http: HttpClient) {
        this.subAreaCorporateList = [];
    }

    getAllCorporateSubAreas(
        filters: TablePaginatorSearch
    ): Observable<ResponseV1<PageResultV1<SubAreaCorporativaDTOV1[]>>> {
        return this.http.get<ResponseV1<PageResultV1<SubAreaCorporativaDTOV1[]>>>(
            environment.api.concat('/CatSubAreaCorporativa/GetAll'),
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

    getUrlAllCorporateSubAreas() {
        return environment.api.concat(`/Export/GetAll/SubAreaCorporativa`);
    }

    getCoporateSubAreaById(areaCorporativaId: string | number): Observable<ResponseV1<SubAreaCorporativaDTOV1>> {
        return this.http.get<ResponseV1<SubAreaCorporativaDTOV1>>(
            environment.api.concat(`/CatSubAreaCorporativa/GetById?id=${areaCorporativaId}`)
        );
    }
    createCorporateSubArea(body: SubAreaCorporativaDTOV1): Observable<ResponseV1<never>> {
        return this.http.post<ResponseV1<never>>(environment.api.concat('/CatSubAreaCorporativa/Add'), body);
    }

    updateCorporateSubArea(body: SubAreaCorporativaDTOV1): Observable<ResponseV1<never>> {
        return this.http.put<ResponseV1<never>>(environment.api.concat('/CatSubAreaCorporativa/Update'), body);
    }

    deleteCorporateSubArea(areaCorporativaId: string | number): Observable<never> {
        return this.http.delete<never>(environment.api.concat(`/CatSubAreaCorporativa/Disable/?id=${areaCorporativaId}`));
    }

    getAllCorpoateSubAreaExcel(filters: TablePaginatorSearch): Observable<FileResponse> {
        return this.http.get<FileResponse>(environment.api.concat('/CatSubAreaCorporativa/Excel/Descarga'), {
            params: {
                ordenar: filters.orderBy,
                dir: filters.dir,
                filtro: filters.search,
                inactivos: filters.inactives,
            },
        });
    }

    async setAllCorporateSubAreas(): Promise<void> {
        const filters = new TablePaginatorSearch();
        filters.inactives = true;
        filters.pageSize = -1;
        filters.pageNumber = 1;

        return new Promise((resolve) => {
            this.getAllCorporateSubAreas(filters).subscribe((response) => {
                if (response.output) {
                    const data = response.output.map((item) => new SubAreaCorporativaDTOV1().deserialize(item));
                    this.subAreaCorporateList = data.filter((item) => item.activo === true);
                }
                resolve();
            });
        });
    }
}

