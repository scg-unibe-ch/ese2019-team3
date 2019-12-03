import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import { AuthenticationService } from './authentication.service';
import * as decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import {User} from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.isAdmin()) {
      alert('Access not permitted');
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
  isAdmin() {
    const token = this.auth.getToken();  // get token from authentication service & checks whether not null
    if (token == null) {
      return false;
    } else {
      const tokenPayload: User = decode(token); // gets currentUser, checks if user belongs to admin group
      return tokenPayload.userGroup === 'adminGroup';
    }
  }

}
