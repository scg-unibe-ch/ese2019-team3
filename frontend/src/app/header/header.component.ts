import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../authentication.service";
import {FormControl, FormGroup} from '@angular/forms';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ServiceService} from "../service.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  LoggedIn = false;

  services : string [] = ['Food & Drink', 'Musik', 'Licht & Bühne', 'Werbung' ];
  locations : string [] = ['Aarau', 'Basel', 'Bern', 'Biel/Bienne', 'Frauenfeld', 'Freiburg', 'Genf', 'Lausanne', 'Lugano','Luzern', 'Neuenburg', 'Schaffhausen',
  'Schwyz', 'Sitten', 'Solothurn', 'St. Gallen', 'Zug', 'Zürich'];
  dates : string [] = ['Today', 'This Week', 'This Month', 'This Year'];

  //filter for l = location, s = services and d= dates
  filter : any = {
    l : '',
    s: '',
    d  : '',
  };
  searchForm = new FormGroup({
    services: new FormControl("",),
    locations: new FormControl(""),
    dates: new FormControl(""),
  });


  constructor(public authentication : AuthenticationService,
              private service: ServiceService) {

  }

  ngOnInit() {}

  onSubmit(){
    const searchObject = {
      services: this.searchForm.get(this.services).value,
      locations: this.searchForm.get("locations").value,
      about: this.searchForm.get("about").value
    };
    console.log("searching for service");
    //calls method to post the registerUser to the backend
    this.searchService(searchObject);
  }

  searchService (searchObject: Object){
    console.log(searchObject);
    this.service
        .searchService(searchObject)
        .subscribe(res => console.log(res), err => console.log(err));

  }

  logOut(){
    //Test
    alert('Sie wurden erfolgreich abgemeldet');
    //ToDO: call authentication method,
    this.LoggedIn = false;
    //for example, if token was set before
    //localStorage.removeItem('token');
  }

  logIn(){
    this.LoggedIn = true;
  }

}
