import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response, ResponseV1 } from 'src/app/utils/interfaces';
import { PageResult, PageResultV1, Vista, VistaDTOV1 } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ViewsService {
    constructor(private readonly http: HttpClient) { }

    getAllViews(): Observable<ResponseV1<PageResultV1<VistaDTOV1[]>>> {
        return this.http.get<ResponseV1<PageResultV1<VistaDTOV1[]>>>(environment.api.concat('/Vista/GetAll'));
    }

    // async getAllViews() {
    //     return await this.http.get<ResponseV1<PageResultV1<VistaDTOV1[]>>>(environment.api.concat('/Vista/GetAll')).toPromise()
    //         .then(respose => {
    //             // console.log('App Menu: ', respose);
    //             return respose;
    //         });
    // }
}
