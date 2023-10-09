import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileResponse, ResponseV1 } from 'src/app/utils/interfaces';
import { InstitucionDTOV1, PageResultV1, TablePaginatorSearch } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable()
export class InstitutionService {
  institutionList: InstitucionDTOV1[];
  constructor(private readonly http: HttpClient) {
    this.institutionList = [];
  }

  getAllInstitucions(filters: TablePaginatorSearch): Observable<ResponseV1<PageResultV1<InstitucionDTOV1[]>>> {
    return this.http.get<ResponseV1<PageResultV1<InstitucionDTOV1[]>>>(
      environment.api.concat('/CatInstitucion/GetAll'),
      {
        params: {
          pageSize: filters.pageSize,
          pageNumber: filters.pageNumber,
          // ordenar: filters.orderBy,
          // dir: filters.dir,
          // inactivos: filters.inactives,
        },
      }
    );
  }

  // async getAllInstitutions(): Promise<void> {
  //   const filters = new TablePaginatorSearch();
  //   filters.inactives = true;
  //   filters.pageSize = -1;
  //   filters.pageNumber = 1;

  //   return new Promise((resolve) => {
  //     this.getAllInstitucions(filters).subscribe((response) => {
  //       if (response.output) {
  //         const data = response.output.map((item) => new InstitucionDTOV1().deserialize(item));
  //         this.institutionList = data;
  //       }
  //       resolve();
  //     });
  //   });
  // }
  getAllInstitutions(filters: TablePaginatorSearch): Observable<ResponseV1<PageResultV1<InstitucionDTOV1[]>>> {
    return this.http.get<ResponseV1<PageResultV1<InstitucionDTOV1[]>>>(
      environment.api.concat('/CatInstitucion/GetAll'),
      {
        params: {
          pageNumber: filters.pageNumber,
          pageSize: filters.pageSize,
          // ordenar: filters.orderBy,
          // dir: filters.dir,
          // filtro: filters.search,
          // inactivos: filters.inactives,
        },
      }
    );
  }

  //todo j031
  getInstitutionById(InstitutionId: string | number): Observable<ResponseV1<InstitucionDTOV1>> {
    return this.http.get<ResponseV1<InstitucionDTOV1>>(
      environment.api.concat(`/CatInstitucion/GetById?id=${InstitutionId}`)
    );
  }

  createInstitution(body: InstitucionDTOV1): Observable<ResponseV1<never>> {
    return this.http.post<ResponseV1<never>>(environment.api.concat('/CatInstitucion/Add'), body);
  }

  updateInstitution(body: InstitucionDTOV1): Observable<ResponseV1<never>> {
    return this.http.put<ResponseV1<never>>(environment.api.concat('/CatInstitucion/Update'), body);
  }

  deleteInstitution(InstitutionId: string | number): Observable<never> {
    return this.http.delete<never>(environment.api.concat(`/CatInstitucion/Disable/?id=${InstitutionId}`));
  }

  getAllInstitutionsExcel(filters: TablePaginatorSearch): Observable<FileResponse> {
    return this.http.get<FileResponse>(environment.api.concat('/CatInstitucion/Excel/Descarga'), {
      params: {
        ordenar: filters.orderBy,
        dir: filters.dir,
        filtro: filters.search,
        inactivos: filters.inactives,
      },
    });
  }

  getUrlAllInstitutionsExcel() {
    return environment.api.concat(`/Export/GetAll/Institution`);
  }
}
