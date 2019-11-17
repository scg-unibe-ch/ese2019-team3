import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  LoggedIn = this.auth.isAuthenticated();
  innerWidth: any;

  constructor(private auth: AuthenticationService) {
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  logIn() {
    this.LoggedIn = this.auth.isAuthenticated();
  }

  logOut() {
    // Test
    alert('Sie wurden erfolgreich abgemeldet');
    this.LoggedIn = false;
    this.auth.logOutUser();
  }
}
