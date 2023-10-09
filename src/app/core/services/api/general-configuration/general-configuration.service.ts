import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileResponse, Response } from 'src/app/utils/interfaces';
import {
    AreaCorporativaDTO,
    ConfNivelAreaResponsableDTO,
    NivelModalidadDTO,
    PageResult,
    TablePaginatorSearch,
} from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class GeneralConfigurationService {
    generalConfigurationList: ConfNivelAreaResponsableDTO[];
    constructor(private http: HttpClient) {
        this.generalConfigurationList = [];
    }

    getAllGeneralConfigurations(
        filters: TablePaginatorSearch
    ): Observable<Response<PageResult<ConfNivelAreaResponsableDTO[]>>> {
        return this.http.get<Response<PageResult<ConfNivelAreaResponsableDTO[]>>>(
            environment.api.concat('/api/ConfiguracionGeneral'),
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

    getGeneralConfigurationById(generalConfigurationId: number): Observable<Response<ConfNivelAreaResponsableDTO>> {
        return this.http.get<Response<ConfNivelAreaResponsableDTO>>(
            environment.api.concat(`/api/ConfiguracionGeneral/${generalConfigurationId}`)
        );
    }

    createGeneralConfiguration(body: ConfNivelAreaResponsableDTO): Observable<Response<never>> {
        // console.log(body);
        return this.http.post<Response<never>>(environment.api.concat('/api/ConfiguracionGeneral'), body);
    }

    updateGeneralConfiguration(body: ConfNivelAreaResponsableDTO): Observable<Response<never>> {
        return this.http.put<Response<never>>(environment.api.concat('/api/ConfiguracionGeneral/'), body);
    }

    deleteGeneralConfiguration(generalConfigurationId: number): Observable<never> {
        return this.http.delete<never>(environment.api.concat(`/api/ConfiguracionGeneral/${generalConfigurationId}`));
    }

    getAllGeneralConfigurationsExcel(filters: TablePaginatorSearch): Observable<FileResponse> {
        return this.http.get<FileResponse>(environment.api.concat('/api/ConfiguracionGeneral/Excel/Descarga'), {
            params: {
                ordenar: filters.orderBy,
                dir: filters.dir,
                filtro: filters.search,
                inactivos: filters.inactives,
            },
        });
    }

    async setAllGeneralConfigurations(): Promise<void> {
        const filters = new TablePaginatorSearch();
        filters.inactives = true;
        filters.pageSize = -1;
        filters.pageNumber = 1;

        return new Promise((resolve) => {
            this.getAllGeneralConfigurations(filters).subscribe((response) => {
                if (response.data.data) {
                    const data = response.data.data.map((item) => new ConfNivelAreaResponsableDTO().deserialize(item));
                    this.generalConfigurationList = data.filter((item) => item.activo === true);
                }
                resolve();
            });
        });
    }

    getGeneralConfigurationLevelModality(): Observable<Response<NivelModalidadDTO[]>> {
        return this.http.get<Response<NivelModalidadDTO[]>>(
            environment.api.concat('/api/ConfiguracionGeneral/NivelModalidad')
        );
    }

    getGeneralConfigurationResponsibiltyAreas(nivelModalidadId: string): Observable<Response<AreaCorporativaDTO[]>> {
        return this.http.get<Response<AreaCorporativaDTO[]>>(
            environment.api.concat(`/api/ConfiguracionGeneral/NivelModalidad/${nivelModalidadId}/AreaResponsable`),
            {}
        );
    }
}
