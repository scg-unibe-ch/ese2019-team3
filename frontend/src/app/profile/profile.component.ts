import { Component, OnInit } from "@angular/core";
import { getQueryPredicate } from "@angular/compiler/src/render3/view/util";
import { tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../authentication.service";
import { User } from "../user";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  //Controll over multiple values
  profileForm = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    birthday: new FormControl("", Validators.required),
    adress: new FormControl(""),
    number: new FormControl(""),
    company: new FormControl("")
  });
  constructor(
    private http: HttpClient,
    private authentification: AuthenticationService
  ) {
    const url = "http://localhost:4200/profile";
    this.http
      .post(url, this.profileForm.value)
      .subscribe(() => {}, e => console.error(e));
  }

  public currentUser: User;

  public email: string 

  getEmail(){
    this.email = this.authentification.getEmail()

  }
  ngOnInit() {
    console.log("CurrentUser empty: " + this.currentUser);

    this.displayUser(this.email);

    console.log("CurrentUser filled: " + this.currentUser);
  }

  //TODO
  disabled() {
    //doesn't work yet, so took it out
    // this.profileForm.disable();
    this.profileForm.enable();
  }

  
  // testing
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
    this.disabled();
    //update User data
    this.updateUser();
  }

  enabled() {
    this.profileForm.enable();
  }

  isProvider() {
    return this.currentUser.userGroup == "provider" ? true : false;
  }

  displayUser(email: string) {
    this.authentification
      .getUser(email)
      .pipe(
        tap(user => {
          //side effect to save user into formgroup as same values
          this.profileForm.patchValue(user);
        })
      )
      //testing
      .subscribe(res => (this.currentUser = res), res => console.log(res));
  }

  updateUser() {
    this.authentification
      .updateUser(this.currentUser)
      .subscribe(res => console.log(res), err => console.log(err));
  }
}
