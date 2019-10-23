import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../authentication.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  
  //Controll over multiple values
  registrationForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    //TODO Validate 
    userGroup: new FormControl('') ,
    passwordconfirm: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),
    adress: new FormControl(''),
    number: new FormControl(''),
    

  });

  isEditable = true;


  //in progress
  constructor(private http: HttpClient, private authentification: AuthenticationService) {

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
  get userGroup() {
    return this.registrationForm.get('userGroup');
    
  }

  registerUserData = {
    return : this.registrationForm.value
    
    // right format
    //  email : this.registrationForm.get('email'),
    // password : this.registrationForm.get('password'),
    // userGroup : this.registrationForm.get('userGroup')
  }

  //sends registered User to backend
  registerUser(){
    this.authentification.registerUser(this.registerUserData)
        .subscribe(
            res => console.log(res),
            err => console.log(err)
        )

  }
}
