import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../authentication.service";
import {
  FormGroup,
  FormControl,
  Validators,
  CheckboxControlValueAccessor
} from "@angular/forms";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"]
})
export class ChangePasswordComponent implements OnInit {
  passwordChanged = false;

  checkUser: any;

  changePasswordForm = new FormGroup({
    id: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    newPassword: new FormControl("", [
      Validators.required,
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()\-_=+{};:,<.>]).{8,}$")
    ]),
    //not need to send
    checkpassword: new FormControl("", [
      Validators.required,
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()\-_=+{};:,<.>]).{8,}$")
    ])
  });

  constructor(private authentification: AuthenticationService) {}

  // patch the user ID to the FormGroup
  setId() {
    this.changePasswordForm.patchValue({
      id: this.authentification.getCurrentUser().id
    });
  }

  ngOnInit() {
    this.setId();
    this.changePasswordForm.valueChanges.subscribe((res: string) =>
      console.log("Value changes" + JSON.stringify(res))
    );
  }

  getErrorMessage() {
    return this.changePasswordForm.get("newPassword").hasError("pattern")
      ? "At least 8 letters, capital and small letters and special Characters"
      : !this.validPassword()
      ? "Passwords do not match!"
      : "";
  }

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
    return this.changePasswordForm.get("newPassword").value == ""
      ? true
      : this.changePasswordForm.get("checkpassword").value ==
          this.changePasswordForm.get("newPassword").value;
  }

  // called by clicking the change password button
  checkspassword(): any {
    this.authentification
      .checkPassword(
        // send username and passowrd to backend to check if they match
        (this.checkUser = {
          email: this.authentification.getCurrentUser().email,
          password: this.changePasswordForm.get("password").value
        })
      )
      .subscribe(res => {
        // if the res is true, he the user entered the right password, only then the password will be updated
        // and call passwordchange so the user will be linked to the next page
        if (res == true) {
          this.updatePassword();
          this.passwordChange();
        } else if (res == false) {
          alert("Your old Password does not match your account");
          // make password field empty, as it is wrong
          this.changePasswordForm.patchValue({
            password: ""
          });
        }
        (err: any) => console.log(err);
      });
  }
}
