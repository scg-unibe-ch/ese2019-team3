import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import { AuthenticationService } from './authentication.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.isAdmin()) {
      alert('Access not permitted');
      this.router.navigate(['LogIn']);
      return false;
    }
    return true;
  }
  isAdmin() {
    const token = this.auth.getToken();  // get token from authentication service & checks whether not null
    if (token == null) {
      return false;
    } else {
      const tokenPayload = decode(token); // decode the token to get its payload, checks if user belongs to admin group
      return tokenPayload.userGroup === 'adminGroup';
    }
  }

}
