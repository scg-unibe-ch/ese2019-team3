import { Component, OnInit } from '@angular/core';
import { getQueryPredicate } from '@angular/compiler/src/render3/view/util';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import {User} from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // Controll over multiple values
  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    userGroup: new FormControl(''),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    adress: new FormControl(''),
    number: new FormControl(''),
    birthday: new FormControl('', Validators.required),
    // add in response
    company: new FormControl('')
  });


  constructor(
    private http: HttpClient,
    private authentification: AuthenticationService
  ) {
    const url = 'http://localhost:4200/profile';
    /*this.http
      .post(url, this.profileForm.value)
      .subscribe(() => {}, e => console.error(e));*/
  }

  public currentUser: User;

  public email: string;
  public id: any;
  editable: boolean;

  getEmail() {
    this.email = this.authentification.getCurrentUser().email;
  }

  getId() {
    this.id = this.authentification.getCurrentUser().id;
  }

  ngOnInit() {
    this.getEmail();
    this.getId();

    console.log('auth CurrentUser empty: ' + this.email);
    console.log('auth CurrentUser ID: ' + this.id);

    console.log(this.email);

    this.displayUser(this.email);

    // first disabled
    this.disableForm();

    // console.log("CurrentUser filled: " + this.currentUser);
  }


  // testing
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
    // update User data
    this.updateUser();
  }

  enableForm() {
    this.profileForm.enable();
    this.profileForm.get('email').disable();

  }

  disableForm() {
    this.profileForm.disable();
  }

  isProvider() {
    // testing, change to provider
    return this.profileForm.get('userGroup').value == 'serviceProvider'
      ? true
      : false;
  }

  displayUser(email: string) {
    this.authentification
      .getUser(email)
      .pipe(
        tap(() => {
          // side effect to save user into formgroup as same values
          console.log('Input email ' + email);
        })
      )
      // testing
      .subscribe(
        res => (
          console.log('Service: ' + JSON.stringify(res)),
          console.log(
            'FormControl empty: ' + JSON.stringify(this.profileForm.value)
          ),
          this.profileForm.patchValue(res[0]),
          console.log(
            'FormControl filled: ' + JSON.stringify(this.profileForm.value)
          )
          // (this.currentUser = res)
        ),
        err => console.log(err)
      );
  }

  updateUser() {
    this.authentification
      .updateUser(this.id, this.profileForm.value)
      .subscribe(
        res => console.log('Updated User: ' + JSON.stringify(res)),
        err => console.log(err)
      );
  }
}
