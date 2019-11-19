import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from '../authentication.service';
import { RoleGuard} from '../role.guard';
import { Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loggedIn = this.auth.loggedIn();
  isAdmin = this.guard.isAdmin()
  innerWidth: any;

  constructor(private auth: AuthenticationService, private guard: RoleGuard, private router: Router) {
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  logIn() {
    this.loggedIn = this.auth.loggedIn();
    this.isAdmin = this.guard.isAdmin();
  }

  logOut() {
    // Test
    alert('Sie wurden erfolgreich abgemeldet');
    this.auth.logOutUser();
    this.isAdmin = this.guard.isAdmin();
    this.loggedIn = this.auth.loggedIn();
    this.router.navigate(['']);
  }
}
