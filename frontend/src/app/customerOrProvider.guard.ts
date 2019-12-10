import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import * as decode from 'jwt-decode';
import {User} from './models/user';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrProviderGuard implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.isCustomerOrProvider()) {
      alert('Zugriff nicht erlaubt');
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

  isCustomerOrProvider() {
    const token = this.auth.getToken();  // get token from authentication service & checks whether not null
    if (token == null) {
      return false;
    } else {
      const tokenPayload: User = decode(token); // gets currentUser, checks if user belongs to customer group
      return (tokenPayload.userGroup === 'customer') || (tokenPayload.userGroup === 'serviceProvider');
    }
  }
}
