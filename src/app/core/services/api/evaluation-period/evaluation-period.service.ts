import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileResponse, Response, ResponseV1 } from 'src/app/utils/interfaces';
import {
    PageResult,
    PageResultV1,
    PeriodoEvaluacionDTO,
    PeriodoEvaluacionDTOV1,
    PeriodoEvaluacionAddUpdateDTOV1,
    PeriodoEvaluacionEtapaAddUpdateDTOV1,
    TablePaginatorSearch,
} from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class EvaluationPeriodService {
    evaluationPeriodList: PeriodoEvaluacionDTOV1[];
    constructor(private http: HttpClient) {
        this.evaluationPeriodList = [];
    }

    getAllPeriodEvaluation(
        filters: TablePaginatorSearch
    ): Observable<ResponseV1<PageResultV1<PeriodoEvaluacionDTOV1[]>>> {
        return this.http.get<ResponseV1<PageResultV1<PeriodoEvaluacionDTOV1[]>>>(
            environment.api.concat('/CatPeriodoEvaluacion/GetAll'),
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

    getPeriodEvaluationById(periodoEvaluacionId: string): Observable<ResponseV1<PeriodoEvaluacionDTOV1>> {
        return this.http.get<ResponseV1<PeriodoEvaluacionDTOV1>>(
            environment.api.concat(`/CatPeriodoEvaluacion/GetById?id=${periodoEvaluacionId}`)
        );
    }

    getProccess(
        anio: string | number,
        ciclo: string | number,
        institucion: string | number
    ): Observable<ResponseV1<PeriodoEvaluacionDTOV1>> {
        return this.http.get<ResponseV1<PeriodoEvaluacionDTOV1>>(
            environment.api.concat(
                `/CatPeriodoEvaluacion/GetProcesoSiguiente?anio=${anio}&ciclo=${ciclo}&institucion=${institucion}`
            )
        );
    }

    createPeriodEvaluation(body: PeriodoEvaluacionAddUpdateDTOV1): Observable<ResponseV1<never>> {
        return this.http.post<ResponseV1<never>>(environment.api.concat('/CatPeriodoEvaluacion/Add'), body);
    }

    updatePeriodEvaluation(body: PeriodoEvaluacionAddUpdateDTOV1): Observable<ResponseV1<never>> {
        return this.http.put<ResponseV1<never>>(environment.api.concat('/CatPeriodoEvaluacion/Update'), body);
    }

    deletePeriodEvaluation(periodoEvaluacionId: string): Observable<never> {
        return this.http.delete<never>(environment.api.concat(`/CatPeriodoEvaluacion/Disable?id=${periodoEvaluacionId}`));
    }
    getAllPeriodEvaluationExcel(filters: TablePaginatorSearch): Observable<FileResponse> {
        return this.http.get<FileResponse>(environment.api.concat('/CatPeriodoEvaluacion/Excel/Descarga'), {
            params: {
                ordenar: filters.orderBy,
                dir: filters.dir,
                filtro: filters.search,
                inactivos: filters.inactives,
            },
        });
    }

    getUrlAllPeriodEvaluationExcel() {
        return environment.api.concat(`/Export/GetAll/PeriodoEvaluacion`);
    }

    async setAllPeriodEvaluation(): Promise<void> {
        const filters = new TablePaginatorSearch();
        filters.inactives = true;
        filters.pageSize = -1;
        filters.pageNumber = 1;

        return new Promise((resolve) => {
            this.getAllPeriodEvaluation(filters).subscribe((response) => {
                if (response.output) {
                    const data = response.output.map((item) => new PeriodoEvaluacionDTOV1().deserialize(item));
                    this.evaluationPeriodList = data.filter((item) => item.activo === true);
                }
                resolve();
            });
        });
    }
}
