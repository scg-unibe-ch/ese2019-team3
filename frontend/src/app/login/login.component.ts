import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;

  /* @ToDO auf Login drücken, dann wird man eingeloggt, Passwort und Username mit Datenbank abgleichen; authentication!*/
  constructor() { }
  showLogIn = true;
  showPasswordForgotten = false;
  ngOnInit() {}

  msg() {
    alert("Benutzer existiert nicht");
  }

  goToPasswordForgotten(){
    this.showLogIn = false;
    this.showPasswordForgotten = true;
  }
}
