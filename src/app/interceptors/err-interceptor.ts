import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SnackBarService } from '../services/snack-bar.srvice';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snack: SnackBarService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        next: (ev) => console.log('success: ', ev),
        error: (ev) => {
          if (ev instanceof HttpErrorResponse) {
            this.snack.open(`${ev.statusText}, ${ev.error}`);
          }
        },
      })
    );
  }
}
