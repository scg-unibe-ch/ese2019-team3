import { Injectable, Injector } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    // check if there is token
    if (token != null) {
      const tokenizedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(tokenizedReq);
    } else {
      return next.handle(req);
    }
  }

  /*constructor(private injector: Injector) { }
  intercept(req, next) {
    const authService = this.injector.get(AuthenticationService);
    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer' + authService.getToken()
      }
    });
    return next.handle(tokenizedReq);
  }*/
}
