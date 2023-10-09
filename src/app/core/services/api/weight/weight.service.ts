import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileResponse, Response, ResponseV1 } from 'src/app/utils/interfaces';
import { PageResult, PageResultV1, PonderacionDTO, PonderacionDTOV1, TablePaginatorSearch } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class WeightService {
    ponderacionList: PonderacionDTOV1[];
    constructor(private http: HttpClient) {
        this.ponderacionList = [];
    }
    getAllWeights(filters: TablePaginatorSearch): Observable<ResponseV1<PageResultV1<PonderacionDTOV1[]>>> {
        return this.http.get<ResponseV1<PageResultV1<PonderacionDTOV1[]>>>(
            environment.api.concat('/CatPonderacion/GetAll'),
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

    getWeightByNivelModalidadId(ComponentId: string, PonderacionId: string): Observable<ResponseV1<PageResultV1<PonderacionDTOV1[]>>>{
        return this.http.get<ResponseV1<PageResultV1<PonderacionDTOV1[]>>>(environment.api.concat(`/CatPonderacion/GetByNivelModalidadId/${ComponentId}/${PonderacionId}`));
    }

    getWeightById(ponderacionId: string): Observable<ResponseV1<PonderacionDTOV1>> {
        return this.http.get<ResponseV1<PonderacionDTOV1>>(environment.api.concat(`/CatPonderacion/${ponderacionId}`));
    }

    createWeight(body: PonderacionDTOV1): Observable<ResponseV1<never>> {
        // console.log(body);
        return this.http.post<ResponseV1<never>>(environment.api.concat('/CatPonderacion/Add'), body);
    }

    updatWeight(body: PonderacionDTOV1): Observable<ResponseV1<never>> {
        return this.http.put<ResponseV1<never>>(environment.api.concat('/CatPonderacion/Update'), body);
    }

    deleteWeight(idComponente: string | number, idNivelModalidad: string | number): Observable<never> {
        return this.http.delete<never>(
            environment.api.concat(
                `/CatPonderacion/Disable?idComponente=${idComponente}&idNivelModalidad=${idNivelModalidad}`
            )
        );
    }

    getAllWeightsExcel(filters: TablePaginatorSearch): Observable<FileResponse> {
        return this.http.get<FileResponse>(environment.api.concat('/CatPonderacion/Excel/Descarga'), {
            params: {
                ordenar: filters.orderBy,
                dir: filters.dir,
                filtro: filters.search,
                inactivos: filters.inactives,
            },
        });
    }

    getUrlAllWeightsExcel() {
        return environment.api.concat(`/Export/GetAll/Ponderacion`);
    }

    async setAllWeights(): Promise<void> {
        const filters = new TablePaginatorSearch();
        filters.inactives = true;
        filters.pageSize = -1;
        filters.pageNumber = 1;

        return new Promise((resolve) => {
            this.getAllWeights(filters).subscribe((response) => {
                if (response.output) {
                    const data = response.output.map((item) => new PonderacionDTOV1().deserialize(item));
                    this.ponderacionList = data.filter((item) => item.activo === true);
                }
                resolve();
            });
        });
    }
}
