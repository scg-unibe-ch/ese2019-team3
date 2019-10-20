import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  passwordChanged = false;
  constructor() { }

  ngOnInit() {}
  passwordChange() {
    this.passwordChanged = true;
  }
  msg(){
    alert('Passwords do not match!');
  }
}
