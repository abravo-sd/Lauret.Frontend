import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileResponse, Response, ResponseV1 } from 'src/app/utils/interfaces';
import {
  AreaResponsableDTO,
  AreaResponsableDTOV1,
  ElementoEvaluacionDTO,
  ElementoEvaluacionProccess,
  ElementoEvaluacionDTOV1,
  ElementoEvaluacionAddUpdateDTO,
  PageResult,
  PageResultV1,
  TablePaginatorSearch,
  Anio,
  ElementoEvaluacionCycle,
} from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EvaluationElementService {
  evaluationElementList: ElementoEvaluacionDTOV1[];

  constructor(private http: HttpClient) {
    this.evaluationElementList = [];
  }

  getAllEvaluationElements(
    filters: TablePaginatorSearch
  ): Observable<ResponseV1<PageResultV1<ElementoEvaluacionDTOV1[]>>> {
    return this.http.get<ResponseV1<PageResultV1<ElementoEvaluacionDTOV1[]>>>(
      environment.api.concat('/ConfiguracionElementoEvaluacion/GetAll'),
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

  getYears(filters: TablePaginatorSearch): Observable<ResponseV1<PageResultV1<Anio[]>>> {
    return this.http.get<ResponseV1<PageResultV1<Anio[]>>>(
      environment.api.concat('/ConfiguracionElementoEvaluacion/Parametros/GetAnios'),
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

  getCycles(
    anio: string | number,
    filters: TablePaginatorSearch
  ): Observable<ResponseV1<PageResultV1<ElementoEvaluacionCycle[]>>> {
    return this.http.get<ResponseV1<PageResultV1<ElementoEvaluacionCycle[]>>>(
      environment.api.concat('/ConfiguracionElementoEvaluacion/Parametros/GetCiclos'),
      {
        params: {
          anio: anio,
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

  getInstitutions(
    anio: string | number,
    cycle: string | number,
    filters: TablePaginatorSearch
  ): Observable<ResponseV1<PageResultV1<ElementoEvaluacionCycle[]>>> {
    return this.http.get<ResponseV1<PageResultV1<ElementoEvaluacionCycle[]>>>(
      environment.api.concat('/ConfiguracionElementoEvaluacion/Parametros/GetInstituciones'),
      {
        params: {
          anio: anio,
          idCiclo: cycle,
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

  getProccess(
    anio: string | number,
    cycle: string | number,
    institution: string | number,
    filters: TablePaginatorSearch
  ): Observable<ResponseV1<PageResultV1<ElementoEvaluacionProccess[]>>> {
    return this.http.get<ResponseV1<PageResultV1<ElementoEvaluacionProccess[]>>>(
      environment.api.concat('/ConfiguracionElementoEvaluacion/Parametros/GetProcesos'),
      {
        params: {
          anio: anio,
          idCiclo: cycle,
          idInstitucion: institution,
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

  getEvaluationElementById(evaluationElementId: string | number): Observable<ResponseV1<ElementoEvaluacionDTOV1>> {
    return this.http.get<ResponseV1<ElementoEvaluacionDTOV1>>(
      environment.api.concat(`/ConfiguracionElementoEvaluacion/GetById?id=${evaluationElementId}`)
    );
  }

  getAllProccess(
    anio: string | number,
    ciclo: string | number,
    institucion: string | number
  ): Observable<ResponseV1<PageResultV1<ElementoEvaluacionProccess[]>>> {
    return this.http.get<ResponseV1<PageResultV1<ElementoEvaluacionProccess[]>>>(
      environment.api.concat(
        `/ConfiguracionElementoEvaluacion/Parametros/GetProcesos?anio=${anio}&idCiclo=${ciclo}&idInstitucion=${institucion}`
      )
    );
  }

  createEvaluationElement(body: ElementoEvaluacionAddUpdateDTO): Observable<ResponseV1<never>> {
    return this.http.post<ResponseV1<never>>(environment.api.concat('/ConfiguracionElementoEvaluacion/Add'), body);
  }

  async createEvaluationElementPromise(body: ElementoEvaluacionAddUpdateDTO): Promise<ResponseV1<never>> {
    const response = await this.http
      .post<ResponseV1<never>>(environment.api.concat('/ConfiguracionElementoEvaluacion/Add'), body)
      .toPromise();
    return response;
  }

  updateEvaluationElement(body: ElementoEvaluacionAddUpdateDTO): Observable<ResponseV1<never>> {
    return this.http.put<ResponseV1<never>>(environment.api.concat('/ConfiguracionElementoEvaluacion/Update'), body);
  }

  deleteEvaluationElement(evaluationElementId: string | number): Observable<never> {
    return this.http.delete<never>(
      environment.api.concat(`/ConfiguracionElementoEvaluacion/Disable?id=${evaluationElementId}`)
    );
  }

  getGenericResponsbilitysAreas(generica: boolean): Observable<ResponseV1<AreaResponsableDTOV1[]>> {
    return this.http.get<ResponseV1<AreaResponsableDTOV1[]>>(
      environment.api.concat(`/ConfiguracionElementoEvaluacion/ElementoEvaluacion/${generica}/AreasResponsables`)
    );
  }

  getEvaluationElementLevelModality(id: string | number): Observable<ResponseV1<AreaResponsableDTOV1[]>> {
    return this.http.get<ResponseV1<AreaResponsableDTOV1[]>>(
      environment.api.concat(`/ConfiguracionElementoEvaluacion/ElementoEvaluacion/${id}/NivelModalidad`)
    );
  }

  getAllEvaluationElementsExcel(filters: TablePaginatorSearch): Observable<FileResponse> {
    return this.http.get<FileResponse>(environment.api.concat('/ConfiguracionElementoEvaluacion/Excel/Descarga'), {
      params: {
        ordenar: filters.orderBy,
        dir: filters.dir,
        filtro: filters.search,
        inactivos: filters.inactives,
      },
    });
  }

  async setAllEvaluationElement(): Promise<void> {
    const filters = new TablePaginatorSearch();
    filters.inactives = true;
    filters.pageSize = -1;
    filters.pageNumber = 1;

    return new Promise((resolve) => {
      this.getAllEvaluationElements(filters).subscribe((response) => {
        if (response.output) {
          const data = response.output.map((item) => new ElementoEvaluacionDTOV1().deserialize(item));
          this.evaluationElementList = data.filter((item) => item.activo === true);
        }
        resolve();
      });
    });
  }

  getEvaluationElementFileById(archivoId: string | number): Observable<ResponseV1<string>> {
    return this.http.get<ResponseV1<string>>(
      environment.api.concat(`/ConfiguracionElementoEvaluacion/getFileById?id=${archivoId}`)
    );
  }
}
