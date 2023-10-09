import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Alert, LocalStorage } from 'src/app/utils/helpers';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private readonly dialogRef: MatDialog, private readonly router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((ev: HttpEvent<any>) => {
                if (ev instanceof HttpResponse) {
                    const contentType: String = ev.headers.get('Content-Type');
                    const body: any = ev.body;
                    if (contentType.includes('application/json') || contentType.includes('text/plain')) {
                        if (!body.exito) {
                            throw new HttpErrorResponse({
                                error: { message: body.mensaje || 'Error inesperado' },
                                headers: ev.headers,
                                status: body.statusCode ? body.statusCode : ev.status ? ev.status : null,
                                statusText: (body.mensaje ? body.mensaje : ev.statusText ? ev.statusText : null) || 'Error inesperado',
                                url: ev.url,
                            });
                        }
                    }
                }
                return ev;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    LocalStorage.clear();
                    this.dialogRef.closeAll();
                    Alert.info('No autorizado', 'Aviso');
                    setTimeout(() => {
                        this.router.navigate(['unauthorized']);
                    }, 2000);
                } else if (error.status === 400 || error.status === 409 || error.status === 404) {
                    Alert.info(error.error ? error.error.message : 'Error inesperado');
                } else {
                    console.error('Error from error interceptor', error);
                    // Alert.error(error.error ? error.error.message : 'Error inesperado');
                    let msessage: string = error ?
                                            error.error ?
                                                error.error.message ? error.error.message : 'Error inesperado' :
                                            error.message ? error.message : 'Error inesperado' :
                                        'Error inesperado';
                    Alert.error(msessage);
                }
                return throwError(() => { });
            })
        );
    }
}
