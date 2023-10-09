import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { verifyHostBindings } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FileResponse, Response, ResponseV1 } from 'src/app/utils/interfaces';
import {
  TablePaginatorSearch,
  PageResult,
  PageResultV1,
  AreaResponsableDTO,
  AreaResponsableDTOV1,
  ConfiguracionIndicadorSiacDTOV1,
  ConfiguracionIndicadorSiacAddUpdateDTOV1,
  FileAzureStorage,
} from 'src/app/utils/models';
import { ConfiguracionIndicadorSiacDTO } from 'src/app/utils/models/configuracion-indicador-siac.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationIndicatorSiacService {
  configuracionIndicadorSiacList: ConfiguracionIndicadorSiacDTOV1[];
  azureStorageFiles: number[];

  constructor(private http: HttpClient) {
    this.configuracionIndicadorSiacList = [];
    this.azureStorageFiles = [];
  }

  getAllConfigurationIndicatorSiac(
    filters: TablePaginatorSearch
  ): Observable<ResponseV1<PageResultV1<ConfiguracionIndicadorSiacDTOV1[]>>> {
    return this.http.get<ResponseV1<PageResultV1<ConfiguracionIndicadorSiacDTOV1[]>>>(
      environment.api.concat('/ConfiguracionIndicadorSIAC/GetAll'),
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

  getConfigurationIndicatorSiacById(
    ConfiguracionIndicadorSiacId: string | number
  ): Observable<ResponseV1<ConfiguracionIndicadorSiacDTOV1>> {
    return this.http.get<ResponseV1<ConfiguracionIndicadorSiacDTOV1>>(
      environment.api.concat('/ConfiguracionIndicadorSIAC/GetById'),
      {
        params: {
          id: ConfiguracionIndicadorSiacId,
        },
      }
    );
  }

  createConfigurationIndicatorSiac(body: ConfiguracionIndicadorSiacAddUpdateDTOV1): Observable<ResponseV1<never>> {
    return this.http.post<ResponseV1<never>>(environment.api.concat('/ConfiguracionIndicadorSIAC/Add'), body);
  }

  uploadAzureStorageFile(body: FormData): Observable<ResponseV1<never>> {
    return this.http.post<ResponseV1<never>>(environment.api.concat('/AzureStorage/Upload'), body);
  }

  async uploadAzureStorageFilePromise(body: FormData): Promise<ResponseV1<never>> {
    const response = await this.http
      .post<ResponseV1<never>>(environment.api.concat('/AzureStorage/Upload'), body)
      .toPromise();
    return response;
  }

  downloadAzureStorageFile(id: string | number): Observable<any> {
    // const options = { observe: 'response', responseType: 'blob' as 'json' };
    const options = { headers: new HttpHeaders({ accept: '*/*' }) };
    // return this.http.get<Blob>(environment.api.concat(`/AzureStorage/Download/${id}`), { observe: 'response', responseType: 'blob' as 'json' });
    return this.http.get(environment.api.concat(`/AzureStorage/Download/${id}`), { responseType: 'blob' });
  }

  // async createAzureStorageFilePromise(files: FormData[]) {
  //     this.azureStorageFiles = [];
  //     files.forEach(async (file) => {
  //         const data = await this.http.post<ResponseV1<never>>(environment.api.concat('/AzureStorage/Upload'), file).toPromise();
  //         if (data) {
  //             this.azureStorageFiles.push(data.id)
  //         }
  //     });
  // }

  updatConfigurationIndicatorSiac(body: ConfiguracionIndicadorSiacAddUpdateDTOV1): Observable<ResponseV1<never>> {
    return this.http.put<ResponseV1<never>>(environment.api.concat('/ConfiguracionIndicadorSIAC/Update'), body);
  }

  deleteConfigurationIndicatorSiac(ConfiguracionIndicadorSiacId: string | number): Observable<never> {
    return this.http.delete<never>(
      environment.api.concat(`/ConfiguracionIndicadorSIAC/Disable?id=${ConfiguracionIndicadorSiacId}`)
    );
  }

  getEvaluationElementLevelModality(id: number): Observable<ResponseV1<PageResultV1<AreaResponsableDTOV1[]>>> {
    return this.http.get<ResponseV1<PageResultV1<AreaResponsableDTOV1[]>>>(
      environment.api.concat(`/ConfiguracionIndicadorSIAC/ConfiguracionIndicadorSiac/${id}/NivelModalidad`)
    );
  }

  getGenericResponsbilitysAreas(generica: boolean): Observable<ResponseV1<PageResultV1<AreaResponsableDTOV1[]>>> {
    return this.http.get<ResponseV1<PageResultV1<AreaResponsableDTOV1[]>>>(
      environment.api.concat(`/ConfiguracionIndicadorSIAC/ConfiguracionIndicadorSiac/${generica}/AreasResponsables`)
    );
  }

  getAllConfigurationIndicatorSiacExcel(filters: TablePaginatorSearch): Observable<FileResponse> {
    return this.http.get<FileResponse>(environment.api.concat('/ConfiguracionIndicadorSIAC/Excel/Descarga'), {
      params: {
        ordenar: filters.orderBy,
        dir: filters.dir,
        filtro: filters.search,
        inactivos: filters.inactives,
      },
    });
  }

  async setAllComponentsUvm(): Promise<void> {
    const filters = new TablePaginatorSearch();
    filters.inactives = true;
    filters.pageSize = -1;
    filters.pageNumber = 1;

    return new Promise((resolve) => {
      this.getAllConfigurationIndicatorSiac(filters).subscribe((response) => {
        if (response.output) {
          const data = response.output.map((item) => new ConfiguracionIndicadorSiacDTOV1().deserialize(item));
          this.configuracionIndicadorSiacList = data.filter((item) => item.activo === true);
        }
        resolve();
      });
    });
  }
}
