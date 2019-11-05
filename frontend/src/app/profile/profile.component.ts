import { Component, OnInit } from "@angular/core";
import { getQueryPredicate } from "@angular/compiler/src/render3/view/util";
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
    adress: new FormControl(""),
    number: new FormControl("")
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

  ngOnInit() {
    console.log("CurrentUser empty: " + this.currentUser);
   
      //TODO getMail
    this.displayUser(this.profileForm.get("email").value);

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

  displayUser(email){
    this.authentification
      .getUser(email)
      .subscribe(res => this.currentUser = res);
  }

  updateUser(){
    this.authentification
    .updateUser(this.currentUser)
    .subscribe(res => console.log(res), err=> console.log(err))
  }
}
