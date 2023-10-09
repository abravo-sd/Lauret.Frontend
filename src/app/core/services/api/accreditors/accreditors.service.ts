import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  AcreditadoraDTO,
  AcreditadoraDTOV1,
  AcreditadoraProcesoDTOV1,
  PageResult,
  PageResultV1,
  TablePaginatorSearch,
} from 'src/app/utils/models';
import { FileResponse, Response, ResponseV1 } from 'src/app/utils/interfaces';
import { environment } from 'src/environments/environment';
//import { jitOnlyGuardedExpression } from '@angular/compiler/src/render3/util';

@Injectable({ providedIn: 'root' })
export class AccreditorsService {
  accreditorsList: AcreditadoraDTOV1[];
  proccessList: AcreditadoraProcesoDTOV1[];

  constructor(private http: HttpClient) {
    this.accreditorsList = [];
    this.proccessList = [];
  }

  getAllAccreditors(filters: TablePaginatorSearch): Observable<ResponseV1<PageResultV1<AcreditadoraDTOV1[]>>> {
    return this.http.get<ResponseV1<PageResultV1<AcreditadoraDTOV1[]>>>(
      environment.api.concat('/Acreditadora/GetAll'),
      {
        params: {
          pageSize: filters.pageSize,
          pageNumber: filters.pageNumber,
          ordenar: filters.orderBy,
          dir: filters.dir,
          filtro: filters.search,
          inactivos: filters.inactives,
        },
      }
    );
  }

  getAllAccreditorsProccess(accreditorId: string): Observable<ResponseV1<AcreditadoraProcesoDTOV1>> {
    return this.http.get<ResponseV1<AcreditadoraProcesoDTOV1>>(
      environment.api.concat(`/AcreditadoraProceso/GetAll?idAcreditadora=${accreditorId}`)
    );
  }

  createAccreditor(body: AcreditadoraDTOV1): Observable<ResponseV1<never>> {
    return this.http.post<ResponseV1<never>>(environment.api.concat('/Acreditadora/Add'), body);
  }

  updateAccreditor(body: AcreditadoraDTOV1): Observable<ResponseV1<never>> {
    return this.http.put<ResponseV1<never>>(environment.api.concat('/Acreditadora/Update'), body);
  }

  deleteAccreditor(accreditorId: string): Observable<ResponseV1<never>> {
    return this.http.delete<ResponseV1<never>>(environment.api.concat(`/Acreditadora/Disable?id=${accreditorId}`));
  }

  getAllAccreditorsExcel(filters: TablePaginatorSearch): Observable<FileResponse> {
    return this.http.get<FileResponse>(environment.api.concat('/Acreditadora/Excel/Descarga'), {
      params: {
        ordenar: filters.orderBy,
        dir: filters.dir,
        filtro: filters.search,
        inactivos: filters.inactives,
      },
    });
  }

  getUrlAllAccreditorsExcel() {
    return environment.api.concat(`/Export/GetAll/InstitucionesAcreditadoras`);
  }

  async setAllAccreditors(): Promise<void> {
    const filters = new TablePaginatorSearch();
    filters.inactives = true;
    filters.pageSize = -1;
    filters.pageNumber = 1;

    return new Promise((resolve) => {
      this.getAllAccreditors(filters).subscribe((response) => {
        if (response.output) {
          const data = response.output.map((item) => new AcreditadoraDTOV1().deserialize(item));
          this.accreditorsList = data.filter((item) => item.activo === true);
        }
        resolve();
      });
    });
  }

  async setAllAccreditorsProccess(accreditorId: string): Promise<void> {
    const filters = new TablePaginatorSearch();
    filters.inactives = true;
    filters.pageSize = -1;
    filters.pageNumber = 1;

    return new Promise((resolve) => {
      this.getAllAccreditorsProccess(accreditorId).subscribe((response) => {
        if (response.output) {
          const data = response.output.map((item) => new AcreditadoraProcesoDTOV1().deserialize(item));
          this.proccessList = data;
        }
        resolve();
      });
    });
  }
}

// const dataP : AcreditadoraProcesoDTOV1[] = [{
//     "acreditadoraProcesoId": 1,
//     "nombre": "Proceso 1",
//     "fechaInicio": "2022-11-01T06:00:00",
//     "fechaFin": "2022-11-30T06:00:00",
//     "deserialize": null
// }, {
//     "acreditadoraProcesoId": 2,
//     "nombre": "Proceso 2",
//     "fechaInicio": "2022-11-01T06:00:00",
//     "fechaFin": "2022-11-30T06:00:00",
//     "deserialize": null
// }, {
//     "acreditadoraProcesoId": 3,
//     "nombre": "Proceso 3",
//     "fechaInicio": "2022-11-01T06:00:00",
//     "fechaFin": "2022-11-30T06:00:00",
//     "deserialize": null
// }, {
//     "acreditadoraProcesoId": 4,
//     "nombre": "Proceso 4",
//     "fechaInicio": "2022-11-01T06:00:00",
//     "fechaFin": "2022-11-30T06:00:00",
//     "deserialize": null
// }, {
//     "acreditadoraProcesoId": 5,
//     "nombre": "Proceso 5",
//     "fechaInicio": "2022-11-01T06:00:00",
//     "fechaFin": "2022-11-30T06:00:00",
//     "deserialize": null
// }, {
//     "acreditadoraProcesoId": 6,
//     "nombre": "Proceso 6",
//     "fechaInicio": "2022-11-01T06:00:00",
//     "fechaFin": "2022-11-30T06:00:00",
//     "deserialize": null
// }, {
//     "acreditadoraProcesoId": 7,
//     "nombre": "Proceso 7",
//     "fechaInicio": "2022-11-01T06:00:00",
//     "fechaFin": "2022-11-30T06:00:00",
//     "deserialize": null
// }, {
//     "acreditadoraProcesoId": 8,
//     "nombre": "Proceso 8",
//     "fechaInicio": "2022-11-01T06:00:00",
//     "fechaFin": "2022-11-30T06:00:00",
//     "deserialize": null
// }, {
//     "acreditadoraProcesoId": 9,
//     "nombre": "Proceso 9",
//     "fechaInicio": "2022-11-01T06:00:00",
//     "fechaFin": "2022-11-30T06:00:00",
//     "deserialize": null
// }, {
//     "acreditadoraProcesoId": 10,
//     "nombre": "Proceso 10",
//     "fechaInicio": "2022-11-01T06:00:00",
//     "fechaFin": "2022-11-30T06:00:00",
//     "deserialize": null
// }, {
//     "acreditadoraProcesoId": 11,
//     "nombre": "Proceso 11",
//     "fechaInicio": "2022-11-01T06:00:00",
//     "fechaFin": "2022-11-30T06:00:00",
//     "deserialize": null
// }, {
//     "acreditadoraProcesoId": 12,
//     "nombre": "Proceso 12",
//     "fechaInicio": "2022-11-01T06:00:00",
//     "fechaFin": "2022-11-30T06:00:00",
//     "deserialize": null
// }, {
//     "acreditadoraProcesoId": 13,
//     "nombre": "Proceso 13",
//     "fechaInicio": "2022-11-01T06:00:00",
//     "fechaFin": "2022-11-30T06:00:00",
//     "deserialize": null
// }, {
//     "acreditadoraProcesoId": 14,
//     "nombre": "Proceso 14",
//     "fechaInicio": "2022-11-01T06:00:00",
//     "fechaFin": "2022-11-30T06:00:00",
//     "deserialize": null
// }, {
//     "acreditadoraProcesoId": 15,
//     "nombre": "Proceso 15",
//     "fechaInicio": "2022-11-01T06:00:00",
//     "fechaFin": "2022-11-30T06:00:00",
//     "deserialize": null
// }];

// const dataA: AcreditadoraDTOV1[] = [{
//     "acreditadoraId": "Acr_1",
//     "nombre": "Prueba",
//     "activo": true,
//     "fechaCreacion": "2023-04-18T17:58:59.263",
//     "usuarioCreacion": "a701a527-3e1b-4ab9-a8c2-b630bce123e2",
//     "fechaModificacion": "2023-04-18T17:58:59.263",
//     "usuarioModificacion": "a701a527-3e1b-4ab9-a8c2-b630bce123e2",
//     "esFimpes": true,
//     "acreditadoraProcesos": dataP,
//     "deserialize": null
// }]
