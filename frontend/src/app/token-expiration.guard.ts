import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {User} from './models/user';
import * as decode from 'jwt-decode';
import {LoginComponent} from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class TokenExpirationGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthenticationService ) {}
  canActivate(): boolean {
    const token = this.auth.getToken();
    if (token == null) {
      return true;
    }
    const tokenPayload: User = decode(token);
    if (this.isExpired(tokenPayload)) {
      this.auth.logOutUser();
      this.router.navigate(['LogIn']);
      return false;
    }  else {
      return true;
    }
  }
  isExpired(tokenPayload): boolean {
    const now = Date.now();
    if (typeof tokenPayload.exp !== 'undefined' && tokenPayload.exp < now) {
      alert('Your Session expired, you will be logged out');
      return true;
    }
    return false;
  }
}
