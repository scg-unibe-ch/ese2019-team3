import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  LoggedIn = false;
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
    // ToDO: call authentication method,
    this.LoggedIn = false;
    this.auth.logOutUser();
  }
}
