import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import { AuthenticationService } from './authentication.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {    // this will be passed from the route config
    // on the data property
    const expectedGroup = route.data.expectedGroup;
    const token = localStorage.getItem('token');    // decode the token to get its payload
    const tokenPayload = decode(token);
    if (
        !this.auth.isAuthenticated() ||
        tokenPayload.userGroup !== 'adminGroup'
    ) {
      this.router.navigate(['LogIn']);
      return false;
    }
    return true;
  }

}
