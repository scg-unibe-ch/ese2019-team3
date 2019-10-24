import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "../authentication.service";
import { User } from "../user";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnInit {
  //Controll over multiple values
  registrationForm = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    //TODO Validate
    userGroup: new FormControl(""),
    passwordconfirm: new FormControl("", Validators.required),
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    birthday: new FormControl("", Validators.required),
    adress: new FormControl(""),
    number: new FormControl("")
  });

  isEditable = true;

  //in progress
  constructor(
    private http: HttpClient,
    private authentification: AuthenticationService
  ) {
    const url = "http://localhost:4200/registration";
    this.http
      .post(url, this.registrationForm.value)
      .subscribe(() => {}, e => console.error(e));
  }

  // testing
  ngOnInit() {
    this.registrationForm.valueChanges.subscribe(value => console.log(value));
  }

  // sends registerUser by submit to the backend
  onSubmit() {

    
    //alternative
    //   const registerUserData = new User(this.registrationForm.get('email').value,
    //                             this.registrationForm.get('password').value,
    //                             this.registrationForm.get('userGroup').value);

    const registerUserData = {
      email: this.registrationForm.get("email").value,
      password: this.registrationForm.get("password").value,
      userGroup: this.registrationForm.get("userGroup").value
    };

    console.warn(registerUserData);

    //calls method to post the registerUser to the backend
    this.registerUser(registerUserData);
  }

  //not used yet
  get userGroup() {
    return this.registrationForm.get("userGroup");
  }

  //send registered User to backend
  registerUser(registerUserData: Object) {
    console.log(registerUserData);

    this.authentification
      .registerUser(registerUserData)

      .subscribe(res => console.log(res), err => console.log(err));
  }

  checkPasswordEqual(): boolean {
    if (
      this.registrationForm.get("password").value == "" ||
      this.registrationForm.get("passwordconfirm").value == ""
    ) {
      return true;
    }

    return (
      this.registrationForm.get("password").value ==
      this.registrationForm.get("passwordconfirm").value
    );
  }
}
