import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "app-delete-profile",
  templateUrl: "./delete-profile.component.html",
  styleUrls: ["./delete-profile.component.scss"]
})
export class DeleteProfileComponent implements OnInit {
  constructor(private authentification: AuthenticationService) {}

  ngOnInit() {}

  deleteProfile() {
    this.authentification
      .deleteProfile(this.authentification.getCurrentUser().id)
      .subscribe(
        res => (
          console.log("Delete Profile: " + res),
          alert("Ihr Profil wurde erfolgreich gelöscht"),
          //remove token
          this.authentification.logOutUser()
          
        ),
        err => console.log(err)
      );
  }
}
