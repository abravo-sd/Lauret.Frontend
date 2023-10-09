import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response, ResponseV1 } from 'src/app/utils/interfaces';
import { CapituloDTO, Ciclo, CicloV1, PageResult, PageResultV1, TablePaginatorSearch } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable()
export class CyclesService {
    cycleList: Ciclo[];
    constructor(private readonly http: HttpClient) {
        this.cycleList = [];
    }

    getAllCycles(filters: TablePaginatorSearch): Observable<Response<PageResult<CapituloDTO[]>>> {
        return this.http.get<Response<PageResult<CapituloDTO[]>>>(environment.api.concat('/api/Ciclo'), {
            params: {
                pageSize: filters.pageSize,
                pageNumber: filters.pageNumber,
                ordenar: filters.orderBy,
                dir: filters.dir,
                inactivos: filters.inactives,
            },
        });
    }

    getAllCyclesV2(filters: TablePaginatorSearch): Observable<ResponseV1<PageResultV1<CicloV1[]>>> {
        return this.http.get<ResponseV1<PageResultV1<CicloV1[]>>>(environment.api.concat('/CatCiclo/getAll'), {
            params: {
                pageSize: filters.pageSize,
                pageNumber: filters.pageNumber,
                ordenar: filters.orderBy,
                dir: filters.dir,
                inactivos: filters.inactives,
            },
        });
    }
    async setAllCycles(): Promise<void> {
        const filters = new TablePaginatorSearch();
        filters.inactives = true;
        filters.pageSize = -1;
        filters.pageNumber = 1;

        return new Promise((resolve) => {
            this.getAllCycles(filters).subscribe((response) => {
                if (response.data.data) {
                    const data = response.data.data.map((item) => new Ciclo().deserialize(item));
                    this.cycleList = data;
                }
                resolve();
            });
        });
    }
}
