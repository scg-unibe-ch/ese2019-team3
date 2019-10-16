import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  
  //Controll over multiple values
  registrationForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),
    adress: new FormControl(''),
    number: new FormControl(''),
    //TODO Validate 
    serviceType: new FormControl('') 

  });


  //in progress
  constructor(private http: HttpClient) { 

    const url = 'http://localhost:4200/registration';
    this.http.post(url, this.registrationForm.value).subscribe(
      () => {},
      (e) => console.error(e)

    )
  }

  // testing 
  ngOnInit() {
    this.registrationForm.valueChanges.subscribe(
      (value) => console.log(value),
    )
  }

  // testing 
  onSubmit(){
    // TODO: Use EventEmitter with form value
    console.warn(this.registrationForm.value);

  }

  //not used yet
  get serviceType() {
    return this.registrationForm.get('serviceType');
    
  }
}
