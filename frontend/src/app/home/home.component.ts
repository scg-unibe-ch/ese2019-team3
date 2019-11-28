import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from '../authentication.service';
import { AdminGuard} from '../admin.guard';
import { Router} from '@angular/router';
import {ProviderGuard} from '../provider.guard';
import {MyServicesGuard} from '../myServices.guard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loggedIn = this.auth.loggedIn();
  isAdmin = this.adminGuard.isAdmin();
  isProvider = this.providerGuard.isProvider();
  isCustomer = this.customerGuard.isCustomerOrProvider();
  innerWidth: any;
  public firstname :string;

  constructor(private auth: AuthenticationService, private adminGuard: AdminGuard, private router: Router,
              private providerGuard: ProviderGuard, private customerGuard: MyServicesGuard) {
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.getUsername();
  }

  getUsername(){
      this.firstname = this.auth.getCurrentUser().firstname;
  }

  logIn() {
    this.updateUserStatus();
  }

  logOut() {
    // Test
    alert('Sie wurden erfolgreich abgemeldet');
    this.auth.logOutUser();
    this.updateUserStatus();
    this.router.navigate(['']);
  }

  updateUserStatus(){
    this.loggedIn = this.auth.loggedIn();
    this.isAdmin = this.adminGuard.isAdmin();
    this.isProvider = this.providerGuard.isProvider();
    this.isCustomer = this.customerGuard.isCustomerOrProvider();
  }
}
