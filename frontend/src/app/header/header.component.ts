import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../authentication.service";
import {FormControl} from '@angular/forms';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  LoggedIn = false;

  events : string [] = ['Concert', 'Opera', 'Poetry Slam', 'Festival', 'Museum', 'Comedy'];

  locations : string [] = ['Aarau', 'Basel', 'Bern', 'Biel/Bienne', 'Frauenfeld', 'Freiburg', 'Genf', 'Lausanne', 'Lugano','Luzern', 'Neuenburg', 'Schaffhausen',
  'Schwyz', 'Sitten', 'Solothurn', 'St. Gallen', 'Zug', 'Zürich'];

  dates : string [] = ['Today', 'This Week', 'This Month', 'This Year'];

  constructor(public authentication : AuthenticationService ) {

  }

  ngOnInit() {}

  logOut(){
    //Test
    alert('Sie wurden erfolgreich abgemeldet');
    //ToDO: call authentication method,
    this.LoggedIn = false;
    //for example, if token was set before
    //localStorage.removeItem('token');
  }

  logIn(){
    this.LoggedIn = true;
  }

}
