import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {decode} from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class UserGroupGuard implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.isProvider()) {
      alert('Access not permitted');
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
  isProvider() {
    const token = this.auth.getToken();  // get token from authentication service & checks whether not null
    if (token == null) {
      return false;
    } else {
      const tokenPayload = decode(token); // decode the token to get its payload, checks if user belongs to admin group
      return tokenPayload.userGroup === 'provider';
    }
  }

}