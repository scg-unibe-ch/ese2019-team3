import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "../authentication.service";
//import {router} from 'express';

@Component({
  selector: "app-passwordforgotten",
  templateUrl: "./passwordforgotten.component.html",
  styleUrls: ["./passwordforgotten.component.scss"]
})
export class PasswordforgottenComponent implements OnInit {


  email = new FormControl("", [Validators.required]);

  passwordforgottenForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email])
  });

  getErrorMessage() {
    return this.email.hasError("required")
      ? "Es muss eine gültige E-Mail eingegeben werden"
      : this.email.hasError("email")
      ? "Ungültige E-Mail"
      : "";
  }

  sendpasswordforgotten = false;

  constructor(private http: HttpClient, private authentication: AuthenticationService) {

    const url = 'http://localhost:4200/forgotpassword';
    this.http.post(url, this.passwordforgottenForm.value).subscribe(
        () => {},
        (e) => console.error(e)
    )
  }

  //testing
  ngOnInit() {
    this.passwordforgottenForm.valueChanges.subscribe(value =>
      console.log(value)
    );

  }

  onSubmit() {

    const userMail = {
      email: this.passwordforgottenForm.value
    };
    console.warn(this.passwordforgottenForm.value);
    //router.put('/forgotPassword');
    
    this.forgotPassword(userMail);

    this.sendpasswordforgotten = true;
    
    this.getEmail();

  }

  forgotPassword(userMail: Object) {
    console.log(userMail);

    this.authentication
        .passwordForgotten(userMail)

        .subscribe(res => console.log(res), err => console.log(err));
  }

  validEmail(): boolean{
    return this.passwordforgottenForm.get("email").valid

  }

  getEmail(){
    return this.passwordforgottenForm.get("email")

  }
}
