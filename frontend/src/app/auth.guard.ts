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
      alert('You must be logged in to see this page');
      this.router.navigate(['LogIn']);
      return false;
    }

    return true;
  }
}
