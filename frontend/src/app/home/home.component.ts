import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from '../authentication.service';
import { AdminGuard} from '../admin.guard';
import { Router} from '@angular/router';
import {UserGroupGuard} from '../user-group.guard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loggedIn = this.auth.loggedIn();
  isAdmin = this.adminGuard.isAdmin();
  isProvider = this.providerGuard.isProvider();
  innerWidth: any;
  public firstname :string;

  constructor(private auth: AuthenticationService, private adminGuard: AdminGuard, private router: Router, private providerGuard: UserGroupGuard) {
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.getUsername();
  }

  getUsername(){
      this.firstname = this.auth.getCurrentUser().firstname;
  }

  logIn() {
    this.loggedIn = this.auth.loggedIn();
    this.isAdmin = this.adminGuard.isAdmin();
    this.isProvider = this.providerGuard.isProvider();
  }

  logOut() {
    // Test
    alert('Sie wurden erfolgreich abgemeldet');
    this.auth.logOutUser();
    this.isAdmin = this.adminGuard.isAdmin();
    this.loggedIn = this.auth.loggedIn();
    this.isProvider = this.providerGuard.isProvider();
    this.router.navigate(['']);
  }
}
