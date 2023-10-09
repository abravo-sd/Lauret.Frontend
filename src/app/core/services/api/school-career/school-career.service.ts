import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileResponse, Response, ResponseV1 } from 'src/app/utils/interfaces';
import { CarreraDTO, CarreraDTOV1, PageResult, PageResultV1, TablePaginatorSearch } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SchoolCareerService {
    careersList: CarreraDTOV1[];
    constructor(private http: HttpClient) {
        this.careersList = [];
    }

    getAllCareers(filters: TablePaginatorSearch): Observable<ResponseV1<PageResultV1<CarreraDTOV1[]>>> {
        return this.http.get<ResponseV1<PageResultV1<CarreraDTOV1[]>>>(environment.api.concat('/Carrera/GetAll'));
        // return this.http.get<ResponseV1<PageResultV1<CarreraDTOV1[]>>>(environment.api.concat('/Carrera/GetAll'), {
        //     params: {
        //         pageSize: filters.pageSize,
        //         pageNumber: filters.pageNumber,
        //         ordenar: filters.orderBy,
        //         dir: filters.dir,
        //         filtro: filters.search,
        //         inactivos: filters.inactives,
        //     },
        // });
    }

    getCareerById(careerId: string): Observable<ResponseV1<CarreraDTOV1>> {
        return this.http.get<ResponseV1<CarreraDTOV1>>(environment.api.concat(`/api/Carrera/${careerId}`));
    }

    createCareer(body: CarreraDTOV1): Observable<ResponseV1<never>> {
        return this.http.post<ResponseV1<never>>(environment.api.concat('/api/Carrera'), body);
    }

    updateCareer(body: CarreraDTOV1): Observable<ResponseV1<never>> {
        return this.http.put<ResponseV1<never>>(environment.api.concat('/api/Carrera/'), body);
    }

    deleteCareer(careerId: string): Observable<never> {
        return this.http.delete<never>(environment.api.concat(`/api/Carrera/${careerId}`));
    }

    getAllCareersExcel(filters: TablePaginatorSearch): Observable<FileResponse> {
        return this.http.get<FileResponse>(environment.api.concat('/api/Carrera/Excel/Descarga'), {
            params: {
                ordenar: filters.orderBy,
                dir: filters.dir,
                filtro: filters.search,
                inactivos: filters.inactives,
            },
        });
    }

    async setAllCareers(): Promise<void> {
        const filters = new TablePaginatorSearch();
        filters.inactives = true;
        filters.pageSize = -1;
        filters.pageNumber = 1;

        return new Promise((resolve) => {
            this.getAllCareers(filters).subscribe((response) => {
                if (response.output) {
                    const data = response.output.map((item) => new CarreraDTOV1().deserialize(item));
                    this.careersList = data.filter((item) => item.activo === true);
                }
                resolve();
            });
        });
    }
}
