import { Injectable, Injector } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private auth: AuthenticationService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    // check if there is token
    if (token != null) {
      const tokenizedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      this.assertAlive(token);
      return next.handle(tokenizedReq);
    } else {
      return next.handle(req);
    }
  }

  assertAlive(tokenPayload) {
    const now = Date.now();
    alert('in function')
    if (typeof tokenPayload.exp !== 'undefined' && tokenPayload.exp < now) {
      alert('Your Session expired, you will be logged out');
      this.auth.logOutUser();
      throw new Error(`token expired: ${JSON.stringify(tokenPayload)}`);
    }
  }
}
