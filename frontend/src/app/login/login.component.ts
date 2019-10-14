import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  showPasswordForgotten = false;

  /* @ToDO auf Login drücken, dann wird man eingeloggt, Passwort und Username mit Datenbank abgleichen; authentication!*/
  constructor() { }
  ngOnInit() {}

  msg() {
    alert("Benutzer existiert nicht");
  }
  goToPasswordForgotten(){
    this.showPasswordForgotten= true;
    home.goToPasswordForgotten();
  }

}
