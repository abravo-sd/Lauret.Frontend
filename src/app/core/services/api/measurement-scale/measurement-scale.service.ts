import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileResponse, Response, ResponseV1 } from 'src/app/utils/interfaces';
import {
    EscalaMedicionDTO,
    EscalaMedicionDTOV1,
    CatalogEscalaMedicionDTOV1,
    PageResult,
    PageResultV1,
    TablePaginatorSearch,
    EscalaMedicionUpdateDTO
} from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class MeasurementScaleService {
    measurementScaleList: EscalaMedicionDTO[];

    constructor(private http: HttpClient) {
        this.measurementScaleList = [];
    }

    getAllMeasurementScaleCatalog(filters: TablePaginatorSearch): Observable<ResponseV1<PageResultV1<CatalogEscalaMedicionDTOV1[]>>> {
        return this.http.get<ResponseV1<PageResultV1<CatalogEscalaMedicionDTOV1[]>>>(environment.api.concat('/CatEscalaMedicion/GetAll'), {
            params: {
                pageNumber: filters.pageNumber,
                pageSize: filters.pageSize,

            },
        });
    }

    getAllMeasurementScale(filters: TablePaginatorSearch): Observable<ResponseV1<PageResultV1<EscalaMedicionDTOV1[]>>> {
        return this.http.get<ResponseV1<PageResultV1<EscalaMedicionDTOV1[]>>>(environment.api.concat('/ConfiguracionEscalaMedicion/GetAll'), {
            params: {
                pageNumber: filters.pageNumber,
                pageSize: filters.pageSize,

            },
        });
    }
    // getAllMeasurementScale(filters: TablePaginatorSearch): Observable<Response<PageResult<EscalaMedicionDTO[]>>> {
    //   return this.http.get<Response<PageResult<EscalaMedicionDTO[]>>>(environment.api.concat('/api/EscalaMedicion'), {
    //     params: {
    //       pageSize: filters.pageSize,
    //       pageNumber: filters.pageNumber,
    //       ordenar: filters.orderBy,
    //       dir: filters.dir,
    //       filtro: filters.search,
    //       inactivos: filters.inactives,
    //     },
    //   });
    // }

    getMeasurementScaleById(measurementScaleId: number): Observable<ResponseV1<EscalaMedicionDTOV1>> {
        return this.http.get<ResponseV1<EscalaMedicionDTOV1>>(
            environment.api.concat(`/ConfiguracionEscalaMedicion/GetById?id=${measurementScaleId}`)
        );
    }

    createMeasurementScale(body: EscalaMedicionUpdateDTO): Observable<ResponseV1<never>> {
        return this.http.post<ResponseV1<never>>(environment.api.concat('/ConfiguracionEscalaMedicion/Add'), body);
    }

    updateMeasurementScale(body: EscalaMedicionUpdateDTO): Observable<ResponseV1<never>> {
        return this.http.put<ResponseV1<never>>(environment.api.concat('/ConfiguracionEscalaMedicion/Update'), body);
    }

    deleteMeasurementScale(measurementScaleId: number): Observable<never> {
        return this.http.delete<never>(environment.api.concat(`/api/EscalaMedicion/${measurementScaleId}`));
    }

    getAllMeasurementScaleExcel(filters: TablePaginatorSearch): Observable<FileResponse> {
        return this.http.get<FileResponse>(environment.api.concat('/api/EscalaMedicion/Excel/Descarga'), {
            params: {
                ordenar: filters.orderBy,
                dir: filters.dir,
                filtro: filters.search,
                inactivos: filters.inactives,
            },
        });
    }

    async setAllMeasurementScale(): Promise<void> {
        const filters = new TablePaginatorSearch();
        filters.inactives = true;
        2;
        filters.pageSize = -1;
        filters.pageNumber = 1;

        return new Promise((resolve) => {
            this.getAllMeasurementScale(filters).subscribe((response) => {
                if (response.output) {
                    const data = response.output.map((item) => new EscalaMedicionDTO().deserialize(item));
                    this.measurementScaleList = data.filter((item) => item.activo === true);
                }
                resolve();
            });
        });
    }
}
