import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {User} from './models/user';
import * as decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements  CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.auth.loggedIn()) {
      alert('Access not permitted');
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
