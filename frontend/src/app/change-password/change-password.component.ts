import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../authentication.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"]
})
export class ChangePasswordComponent implements OnInit {
  passwordChanged = false;

  changePasswordForm = new FormGroup({
    //?
    id: new FormControl(""),
    password: new FormControl(""),
    newpassword: new FormControl("", Validators.required),
    //not need to send
    checkpassword: new FormControl("", Validators.required)
  });

  constructor(private authentification: AuthenticationService) {}

  setId() {
    this.changePasswordForm.patchValue({
      id: this.authentification.getCurrentUser().id
    });
  }
  ngOnInit() {
    this.setId();
  }
  passwordChange() {
    this.passwordChanged = true;
  }
  msg() {
    alert("Passwords do not match!");
  }

  updatePassword() {
    this.authentification
      .updatePassword(this.changePasswordForm.value)
      .subscribe(
        res =>
          console.log(
            "Updated User: " + JSON.stringify(res),
            console.log(this.changePasswordForm.value)
          ),

        err => console.log(err)
      );
  }
}
