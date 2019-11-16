import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthFacade } from '../auth.facade';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {


  constructor(public authFacade: AuthFacade) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const JWT_TOKEN = this.authFacade.getJwtToken();

    if (JWT_TOKEN) {
      request = this.addToken(request, JWT_TOKEN);
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
      return this.authFacade.refreshToken(this.authFacade.getJwtRefreshToken()).pipe(
        switchMap(
            (JWT: any) => {
                return next.handle(this.addToken(request, JWT.token));
            }
        ));

    }
}
