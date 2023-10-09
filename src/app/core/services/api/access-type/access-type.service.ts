import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FileResponse, Response, ResponseV1 } from 'src/app/utils/interfaces';
import { PageResult, PageResultV1, TablePaginatorSearch, TipoAccesoDTO, TipoAccesoDTOV1 } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AccessTypeService {
    accessTypeList: TipoAccesoDTOV1[];
    constructor(private http: HttpClient) {
        this.accessTypeList = [];
    }

    getAllAccessType(filters: TablePaginatorSearch): Observable<ResponseV1<PageResultV1<TipoAccesoDTOV1[]>>> {
        return this.http.get<ResponseV1<PageResultV1<TipoAccesoDTOV1[]>>>(environment.api.concat('/CatTipoAcceso/GetAll'), {
            params: {
                pageSize: filters.pageSize,
                pageNumber: filters.pageNumber,
                // ordenar: filters.orderBy,
                // dir: filters.dir,
                // filtro: filters.search,
                // inactivos: filters.inactives,
            },
        });
    }

    // getAllAccessType(filters: TablePaginatorSearch): Observable<ResponseV1<PageResultV1<TipoAccesoDTOV1[]>>> {
    //     return of({ "id": null, "exito": true, "mensaje": null, "input": null, "output": TYPE_ACCESS, "error": null });
    // }
}

// const TYPE_ACCESS =JSON.parse(JSON.stringify([
//     {
//         id: 1,
//         nombre: "C",
//         descripcion: "Consulta",
//         activo: true,
//         fechaCreacion: "2023-06-06 00:00:00.000",
//         usuarioCreacion: "Pruebas SIAC",
//         fechaModificacion: "2023-06-06 00:00:00.000",
//         usuarioModificacion: "Pruebas SIAC",
//     },
//     {
//         id: 2,
//         nombre: "D",
//         descripcion: "Descarga",
//         activo: true,
//         fechaCreacion: "2023-06-06 00:00:00.000",
//         usuarioCreacion: "Pruebas SIAC",
//         fechaModificacion: "2023-06-06 00:00:00.000",
//         usuarioModificacion: "Pruebas SIAC",
//     },
//     {
//         id: 3,
//         nombre: "E",
//         descripcion: "Escritura",
//         activo: true,
//         fechaCreacion: "2023-06-06 00:00:00.000",
//         usuarioCreacion: "Pruebas SIAC",
//         fechaModificacion: "2023-06-06 00:00:00.000",
//         usuarioModificacion: "Pruebas SIAC",
//     }
// ]));
