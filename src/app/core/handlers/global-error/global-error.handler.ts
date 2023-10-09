import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    handleError(error: Error): void {
        console.error('Error from global error handler', error);
    }
}
