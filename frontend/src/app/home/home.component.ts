import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showLogIn = false;
  showProfile = false;
  constructor() {
  }

  ngOnInit() {}
  goToLogin(){
    this.showLogIn = true;
  }
  goHome(){
    this.showLogIn = false;
    this.showProfile = false;

  }

  goToProfile(){
    this.showProfile = true;
  }
}
