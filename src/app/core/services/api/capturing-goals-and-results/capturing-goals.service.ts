import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileResponse, Response, ResponseV1 } from 'src/app/utils/interfaces';
import { CampusDTO, CampusDTOV1,  PageResult, PageResultV1, TablePaginatorSearch } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

import { MetasResultadoDTOV2} from 'src/app/utils/models/metas-resultadoV2.dto';

@Injectable({ providedIn: 'root' })
export class CapturingGoalService {
  campusList: CampusDTOV1[];

  constructor(private http: HttpClient) {
    this.campusList = [];
  }

  getAllCapturingGoals(filters: TablePaginatorSearch): Observable<ResponseV1<PageResultV1<MetasResultadoDTOV2[]>>> {
    return this.http.get<ResponseV1<PageResultV1<MetasResultadoDTOV2[]>>>(environment.api.concat('/getAllCapturingGoals/GetAll'), {
      params: {
        pageSize: filters.pageSize,
        pageNumber: filters.pageNumber,

      },
    });
  }

  // getCampusById(campusId: string): Observable<ResponseV1<CampusDTOV1>> {
  //   return this.http.get<ResponseV1<CampusDTOV1>>(environment.api.concat(`/CatCampus/GetById?id=${campusId}`));
  // }

  // createCampus(body: CampusDTOV1): Observable<ResponseV1<never>> {
  //   return this.http.post<ResponseV1<never>>(environment.api.concat('/CatCampus/Add'), body);
  // }

  // updateCampus(body: CampusDTOV1): Observable<ResponseV1<never>> {
  //   return this.http.put<ResponseV1<never>>(environment.api.concat('/CatCampus/Update'), body);
  // }

  // deleteCampus(campusId: string): Observable<never> {
  //   return this.http.delete<never>(environment.api.concat(`/CatCampus/Disable?id=${campusId}`));
  // }

  // getAllCampusExcel(filters: TablePaginatorSearch): Observable<FileResponse> {
  //   return this.http.get<FileResponse>(environment.api.concat('/CatCampus/Excel/Descarga'), {
  //     params: {
  //       ordenar: filters.orderBy,
  //       dir: filters.dir,
  //       filtro: filters.search,
  //       inactivos: filters.inactives,
  //     },
  //   });
  // }

  // getUrlAllCampusExcel() {
  //   return environment.api.concat(`/Export/GetAll/Campus`);
  // }

  // async setAllCampus(): Promise<void> {
  //   const filters = new TablePaginatorSearch();
  //   filters.inactives = true;
  //   filters.pageSize = -1;
  //   filters.pageNumber = 1;

  //   return new Promise((resolve) => {
  //     this.getAllCampus(filters).subscribe((response) => {
  //       if (response.output) {
  //         const data = response.output.map((item) => new CampusDTOV1().deserialize(item));
  //         this.campusList = data.filter((item) => item.activo === true);
  //       }
  //       resolve();
  //     });
  //   });
  // }

}
