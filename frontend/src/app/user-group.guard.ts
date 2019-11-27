import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import * as decode from 'jwt-decode';
import {User} from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserGroupGuard implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router, private providerGuard: UserGroupGuard) {
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
      const tokenPayload: User = decode(token); // decode the token to get its payload, checks if user belongs to admin group
      this.assertAlive(tokenPayload)
      return tokenPayload.userGroup === 'serviceProvider';
    }
  }

 assertAlive(tokenPayload) {
    const now = Date.now()
    if (typeof tokenPayload.exp !== 'undefined' && tokenPayload.exp < now) {
      alert('Your Session expired, you will be logged out');
      this.logOut();
      throw new Error(`token expired: ${JSON.stringify(tokenPayload)}`)
    }
  }

  logOut() {
    // Test
    alert('Sie wurden erfolgreich abgemeldet');
    this.auth.logOutUser();
    this.router.navigate(['']);
  }
}
