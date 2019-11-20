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
    id: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    newpassword: new FormControl("", [
      Validators.required,
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=(.*[dW]){1,})(?!.*s).{8,}$")
    ]),
    //not need to send
    checkpassword: new FormControl("", [
      Validators.required,
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=(.*[dW]){1,})(?!.*s).{8,}$")
    ])
  });

  constructor(private authentification: AuthenticationService) {}

  //patch the user ID to the FormGroup
  setId() {
    this.changePasswordForm.patchValue({
      id: this.authentification.getCurrentUser().id
    });
  }
  ngOnInit() {
    this.setId();
    console.log(
      "Password value" + this.authentification.getCurrentUser().password
    );

    this.changePasswordForm.valueChanges.subscribe((res: string) =>
      console.log(
        "Value changes" +
          JSON.stringify(res) +
          "Valid Password? " +
          this.validPassword() +
          "Valid Form? " +
          this.changePasswordForm.valid +
          "Error Message " +
          this.getErrorMessage()
      )
    );
  }

  getErrorMessage() {
    return this.changePasswordForm.get("newpassword").hasError("pattern")
      ? "At least 8 letters, capital and small letters and special Characters"
      : !this.validPassword()
      ? "Passwords do not match!"
      : "";
  }
  //go to next page, problem works every time, change to disable
  passwordChange() {
    this.passwordChanged = true;
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

  validPassword(): boolean {
    //this.changePasswordForm.get("newpassword").invalid? false  :
    return this.changePasswordForm.get("newpassword").value == ""
      ? true
      : this.changePasswordForm.get("checkpassword").value ==
          this.changePasswordForm.get("newpassword").value;
  }

  //boolean?
  wrongpassword(): any {
    return this.authentification.getPassword(
      this.authentification.getCurrentUser().email
    );
  }
}
