import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileResponse, Response } from 'src/app/utils/interfaces';
import { ReporteDTO } from 'src/app/utils/models';
import { environment } from 'src/environments/environment';

@Injectable()
export class ReportsService {
  constructor(private http: HttpClient) {}

  downloadReport(body: ReporteDTO): Observable<FileResponse> {
    return this.http.post<FileResponse>(environment.api.concat('/api/Reportes'), body);
  }
}
