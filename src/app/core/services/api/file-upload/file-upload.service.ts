import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Modules } from 'src/app/utils/enums/module';
import { Response } from 'src/app/utils/interfaces';
import { CargaArchivoDTO, CargaArchivoResult } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable()
export class FileUploadService {
  constructor(private http: HttpClient) {}

  fileUpload(body: CargaArchivoDTO): Observable<Response<CargaArchivoResult>> {
    return this.http.post<Response<CargaArchivoResult>>(environment.api.concat('/api/CargaArchivo'), body);
  }

  getRelativeURLTemplate(module: Modules): Observable<Response<string>> {
    return this.http.get<Response<string>>(environment.api.concat(`/api/CargaArchivo/Plantilla/${module}`));
  }
}
