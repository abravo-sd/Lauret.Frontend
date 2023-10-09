import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseV1 } from 'src/app/utils/interfaces';
import { ListaArchivosModuloBienvenida, SettingsWelcomeDTO } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export default class SettingsWelcomeService {
  constructor(private http: HttpClient) {}

  getConfigPantallaBienvenida(): Observable<ResponseV1<SettingsWelcomeDTO>> {
    return this.http.get<ResponseV1<SettingsWelcomeDTO>>(environment.api.concat(`/ConfiguracionBienvenida/GetAll`));
  }

  updatePantallaBienvenida(body: SettingsWelcomeDTO): Observable<ResponseV1<never>> {
    return this.http.put<ResponseV1<never>>(environment.api.concat('/ConfiguracionBienvenida/Update'), body);
  }

  getListFilesWelcomeModule(): Observable<ResponseV1<ListaArchivosModuloBienvenida>> {
    return this.http.get<ResponseV1<ListaArchivosModuloBienvenida>>(
      environment.api.concat('/AzureStorage/ListFilesWelcomeModule'),
      {}
    );
  }

  downloadAzureStorageFile(id: string | number): Observable<any> {
    // const options = { observe: 'response', responseType: 'blob' as 'json' };
    const options = { headers: new HttpHeaders({ accept: '*/*' }) };
    // return this.http.get<Blob>(environment.api.concat(`/AzureStorage/Download/${id}`), { observe: 'response', responseType: 'blob' as 'json' });
    return this.http.get(environment.api.concat(`/AzureStorage/DownloadFromWelcomeModule/${id}`), {
      responseType: 'blob',
    });
  }

  async uploadAzureStorageFile(body: FormData) {
    // const response = await this.http
    //   .post(environment.api.concat('/AzureStorage/UploadFromWelcomeModule'), body)
    //   .toPromise();
    const response = await this.http
      .post<ResponseV1<never>>(environment.api.concat('/AzureStorage/UploadFromWelcomeModule'), body)
      .toPromise();
    return response;
  }

  async deleteAzureStorageFile(body: FormData): Promise<ResponseV1<never>> {
    const blobFilename = body.get('blobFilename'); // Obtiene el valor de la propiedad 'blobFilename'
    const response = await this.http
      .post<ResponseV1<never>>(
        environment.api.concat('/AzureStorage/DeleteFromWelcomeModule?blobFilename=' + blobFilename),
        body
      )
      .toPromise();
    return response;
  }
}
