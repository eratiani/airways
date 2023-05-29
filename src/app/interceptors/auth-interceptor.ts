import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const path = new URL(req.url, 'http://localhost:4200').pathname;
    if (req.url.includes('/users')) {
      const token = window.sessionStorage.getItem('airways-token');
      const copyReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(copyReq);
    }
    return next.handle(req);
  }
}
