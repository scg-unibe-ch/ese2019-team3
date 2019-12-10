import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnInit {
  // Controll over multiple values

  registrationForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()-_=+{};:,<.>])(.{8,})$"
      )
    ]),

    // TODO Validate
    userGroup: new FormControl(""),
    passwordconfirm: new FormControl("", Validators.required),
    firstname: new FormControl("", Validators.required),
    lastname: new FormControl("", Validators.required),
    birthday: new FormControl("", Validators.required),
    adress: new FormControl(""),
    number: new FormControl(""),
    company: new FormControl("")
  });

  isEditable = true;

  // in progress

  constructor(
    private http: HttpClient,
    private authentification: AuthenticationService
  ) {
    const url = "http://localhost:4200/registration";
    // this.http
    //   .post(url, this.registrationForm.value)
    //   .subscribe(() => {}, e => console.error(e));
  }

  // testing
  ngOnInit() {
    this.registrationForm.valueChanges.subscribe(value =>
      console.log(value)
    );
    console.log(this.validEmail());
    console.log("Password" + this.validPassword());
    console.warn("Valid Radio Button" + this.validRadiobutton());
  }

  // sends registerUser by submit to the backend
  onSubmit() {
    const registerUserData = {
      email: this.registrationForm.get("email").value,
      password: this.registrationForm.get("password").value,
      userGroup: this.registrationForm.get("userGroup").value,
      firstname: this.registrationForm.get("firstname").value,
      lastname: this.registrationForm.get("lastname").value,
      birthday: this.registrationForm.get("birthday").value.toLocaleDateString(),
      adress: this.registrationForm.get("adress").value,
      number: this.registrationForm.get("number").value,
      company: this.registrationForm.get("company").value
    };

    console.warn("Completed Registration"+registerUserData);

    // calls method to post the registerUser to the backend
    this.registerUser(registerUserData);
  }

  isProvider(): boolean {
    return this.registrationForm.get("userGroup").value === "serviceProvider";
  }

  // getErrorMessage() {
  //   console.warn(this.registrationForm.get("password").hasError("pattern"));

  //   return this.registrationForm.get("password").hasError("pattern")
  //     ? "Mindestens 8 Buchstaben, Gross- und Kleinschreibung, Zahlen und Sonderzeichen"
  //     : !this.validPassword()
  //     ? "Passwörter stimmen nicht überein!"
  //     : "";
  // }

  // validPassword(): boolean {
  //   return this.registrationForm.get("password").value == ""
  //     ? true
  //     : this.registrationForm.get("password").value ==
  //         this.registrationForm.get("passwordconfirm").value;
  // }
  // send registered User to backend
  registerUser(registerUserData: object) {
    console.log(JSON.stringify(registerUserData));

    this.authentification
      .registerUser(registerUserData)

      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );
  }

  validPassword(): boolean {
    return this.registrationForm.get("password").invalid
      ? false
      : this.registrationForm.get("password").value ===
          this.registrationForm.get("passwordconfirm").value;
  }
  

  validRadiobutton(): boolean {
    return (
      this.registrationForm.get("userGroup").value == "serviceProvider" ||
      this.registrationForm.get("userGroup").value == "customer"
    );
  }
  validEmail(): boolean {
    return this.registrationForm.get("email").valid;
  }
}
