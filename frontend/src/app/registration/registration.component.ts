import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  //Controll over multiple values
  registrationForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    birthday: new FormControl(''),
    adress: new FormControl(''),
    number: new FormControl(''),
    serviceType: new FormControl('')
  });

  constructor() { }

  ngOnInit() {}

  onSubmit(){
    // TODO: Use EventEmitter with form value
  console.warn(this.registrationForm.value);
  }

  //not used yet
  get serviceType() {
    return this.registrationForm.get('serviceType');
  }
}
