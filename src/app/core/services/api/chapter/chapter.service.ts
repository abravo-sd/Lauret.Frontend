import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response, ResponseV1 } from 'src/app/utils/interfaces';
import {
    CapituloDTO,
    CapituloDTOV1,
    CopiadoRequest,
    CopiadoResult,
    CriterioDTO,
    PageResult,
    PageResultV1,
    TablePaginatorSearch,
} from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ChapterService {
    chaptersList: CapituloDTOV1[];

    constructor(private http: HttpClient) {
        this.chaptersList = [];
    }

    getAllChapters(filters: TablePaginatorSearch, process: string | number): Observable<ResponseV1<PageResultV1<CapituloDTOV1[]>>> {
        return this.http.get<ResponseV1<PageResultV1<CapituloDTOV1[]>>>(environment.api.concat('/Capitulo/GetAll'), {
            params: {
                idAcreditadoraProceso: process,
                pageSize: filters.pageSize,
                pageNumber: filters.pageNumber
                // ordenar: filters.orderBy,
                // dir: filters.dir,
                // inactivos: filters.inactives,
            },
        });
    }

    getAllChaptersByAccreditorProccessId(idAcreditadoraProceso: string | number): Observable<ResponseV1<PageResultV1<CapituloDTOV1[]>>> {
        return this.http.get<ResponseV1<PageResultV1<CapituloDTOV1[]>>>(environment.api.concat(`/Capitulo/GetAll?idAcreditadoraProceso=${idAcreditadoraProceso}`));
    }

    createChapter(body: CapituloDTOV1): Observable<ResponseV1<never>> {
        return this.http.post<ResponseV1<never>>(environment.api.concat('/Capitulo/Add'), body);
    }

    updateChapter(body: CapituloDTOV1): Observable<ResponseV1<never>> {
        return this.http.put<ResponseV1<never>>(environment.api.concat('/Capitulo/Update'), body);
    }

    deleteChapter(chapterId: string, process: number): Observable<ResponseV1<never>> {
        return this.http.delete<ResponseV1<never>>(environment.api.concat(`/Capitulo/Disable?id${chapterId}`), {
            params: {
                proceso: process,
            },
        });
    }

    copyChapters(body: CopiadoRequest): Observable<Response<CopiadoResult>> {
        return this.http.post<Response<CopiadoResult>>(environment.api.concat('/Capitulo/copiar'), body);
    }

    getCriteriaByChapter(
        filters: TablePaginatorSearch,
        process: number,
        career: string,
        chapterId: string
    ): Observable<Response<CriterioDTO[]>> {
        return this.http.get<Response<CriterioDTO[]>>(environment.api.concat(`/Capitulo/${chapterId}/Criterios`), {
            params: {
                proceso: process,
                carrera: career,
                pageSize: filters.pageSize,
                pageNumber: filters.pageNumber,
                ordenar: filters.orderBy,
                dir: filters.dir,
            },
        });
    }

    async setAllChapters(process: string): Promise<void> {
        const filters = new TablePaginatorSearch();
        filters.inactives = true;
        filters.pageSize = -1;
        filters.pageNumber = 1;

        return new Promise((resolve) => {
            this.getAllChapters(filters, process).subscribe((response) => {
                if (response.output) {
                    const data = response.output.map((item) => new CapituloDTOV1().deserialize(item));
                    this.chaptersList = data;
                }
                resolve();
            });
        });
    }
}
