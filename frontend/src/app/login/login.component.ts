import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

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
