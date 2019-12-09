import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {}

  canActivate(): boolean {
    if (this.auth.getToken() != null) {
      return true; } else {
      alert('SIe müssen angemeldet sein um diese Seite zu besuchen');
      this.router.navigate(['LogIn']);
      return false;
    }

    return true;
  }
}
