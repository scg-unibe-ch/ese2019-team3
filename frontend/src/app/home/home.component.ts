import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  LoggedIn = true;
  innerWidth: any;

  constructor() {
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  logOut() {
    // Test
    alert('Sie wurden erfolgreich abgemeldet');
    // ToDO: call authentication method,
    this.LoggedIn = false;
    localStorage.removeItem('token');
  }

  logIn() {
    this.LoggedIn = true;
  }
}
