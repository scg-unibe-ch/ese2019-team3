import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../authentication.service";
import { HomeComponent } from '../home/home.component';

@Component({
  selector: "app-delete-profile",
  templateUrl: "./delete-profile.component.html",
  styleUrls: ["./delete-profile.component.scss"]
})
export class DeleteProfileComponent implements OnInit {
  constructor(private authentification: AuthenticationService, private home: HomeComponent) {}

  ngOnInit() {}

  deleteProfile() {
    this.authentification
      .deleteProfile(this.authentification.getCurrentUser().id)
      .subscribe(
        res => (
          console.log("Delete Profile: " + res),
          //remove token and logout
          this.home.logOut()
          
        ),
        err => console.log(err)
      );
  }
}
