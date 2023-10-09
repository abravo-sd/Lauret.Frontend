import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileResponse, Response, ResponseV1 } from 'src/app/utils/interfaces';
import {
    ComponenteUVMDTO,
    ComponenteUVMDTOV1,
    PageResult,
    PageResultV1,
    TablePaginatorSearch,
} from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ComponentUvmService {
    componentUvmList: ComponenteUVMDTOV1[];

    constructor(private http: HttpClient) {
        this.componentUvmList = [];
    }
    
    getAllComponentsUvm(filters: TablePaginatorSearch): Observable<ResponseV1<PageResultV1<ComponenteUVMDTOV1[]>>> {
        return this.http.get<ResponseV1<PageResultV1<ComponenteUVMDTOV1[]>>>(
            environment.api.concat('/ComponenteUvm/GetAll'),
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

    getComponentUvmById(componenteUvmId: string | number): Observable<ResponseV1<ComponenteUVMDTOV1>> {
        return this.http.get<ResponseV1<ComponenteUVMDTOV1>>(
            environment.api.concat(`/ComponenteUvm/GetById?id=${componenteUvmId}`)
        );
    }

    createComponentUvm(body: ComponenteUVMDTOV1): Observable<ResponseV1<never>> {
        return this.http.post<ResponseV1<never>>(environment.api.concat('/ComponenteUvm/Add'), body);
    }

    updateComponentUvm(body: ComponenteUVMDTOV1): Observable<ResponseV1<never>> {
        return this.http.put<ResponseV1<never>>(environment.api.concat('/ComponenteUvm/Update'), body);
    }

    deleteComponentUvm(componenteUvmId: string | number): Observable<never> {
        return this.http.delete<never>(environment.api.concat(`/ComponenteUvm/Disable?id=${componenteUvmId}`));
    }

    getAllComponentUvmExcel(filters: TablePaginatorSearch): Observable<FileResponse> {
        return this.http.get<FileResponse>(environment.api.concat('/ComponenteUvm/Excel/Descarga'), {
            params: {
                ordenar: filters.orderBy,
                dir: filters.dir,
                filtro: filters.search,
                inactivos: filters.inactives,
            },
        });
    }

    getUrlAllComponentUvmExcel() {
        return environment.api.concat(`/Export/GetAll/ComponenteUvm`);
    }

    async setAllComponentsUvm(): Promise<void> {
        const filters = new TablePaginatorSearch();
        filters.inactives = true;
        filters.pageSize = -1;
        filters.pageNumber = 1;

        return new Promise((resolve) => {
            this.getAllComponentsUvm(filters).subscribe((response) => {
                if (response.output) {
                    const data = response.output.map((item) => new ComponenteUVMDTOV1().deserialize(item));
                    this.componentUvmList = data.filter((item) => item.activo === true);
                }
                resolve();
            });
        });
    }
}
