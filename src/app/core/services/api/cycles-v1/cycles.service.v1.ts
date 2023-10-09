import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response, ResponseV1 } from 'src/app/utils/interfaces';
import { CicloV1, PageResult, PageResultV1, TablePaginatorSearch } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable()
export class CyclesServiceV1 {
    cycleList: CicloV1[];
    constructor(private readonly http: HttpClient) {
        this.cycleList = [];
    }

    getAllCycles(filters: TablePaginatorSearch): Observable<ResponseV1<PageResultV1<CicloV1[]>>> {
        return this.http.get<ResponseV1<PageResultV1<CicloV1[]>>>(environment.api.concat('/CatCiclo/GetAll'), {
            params: {
                pageSize: filters.pageSize,
                pageNumber: filters.pageNumber
                // ordenar: filters.orderBy,
                // dir: filters.dir,
                // inactivos: filters.inactives,
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
                if (response.output) {
                    const data = response.output.map((item) => new CicloV1().deserialize(item));
                    this.cycleList = data;
                }
                resolve();
            });
        });
    }
}
