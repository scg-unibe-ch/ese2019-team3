import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-passwordforgotten',
  templateUrl: './passwordforgotten.component.html',
  styleUrls: ['./passwordforgotten.component.scss'],
})
export class PasswordforgottenComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);

  passwordforgottenForm = new FormGroup ({email : new FormControl('', Validators.required)});

  getErrorMessage(){
    return this.email.hasError('required') ? 'You must enter a value' : this.email.hasError('email') ? ' Not a valid email' : '';
  }
  constructor() { }

  ngOnInit() {}

  onSubmit(){
    console.warn(this.passwordforgottenForm.value);
  }
}
