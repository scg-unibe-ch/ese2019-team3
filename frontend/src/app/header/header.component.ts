import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../authentication.service";
import {FormControl, FormGroup} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ServiceService} from "../service.service";
import { Router } from '@angular/router';

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


  //filter for l = location, s = services and d= dates
  /*filter : any = {
    l : '',
    s: '',
    d  : '',
  };*/

  /*searchForm = new FormGroup({
    services: new FormControl("",),
    locations: new FormControl(""),
    dates: new FormControl(""),
  });*/


  public s:string;
  public l:string;
  d = new Date();
  public anything: string;
  searchresults: [] = [];
  constructor(public authentication : AuthenticationService,
              private service: ServiceService, private router: Router) {

  }

  ngOnInit() {}

  //click on Search Button!
  onSubmit(){
    const searchObject = {
      services: this.s,
      locations: this.l,
      dates: this.d,
      anything: this.anything,
    };
    console.log("searching for service");
    //calls method to post the registerUser to the backend
    this.router.navigate(['/searchresults']);
    this.searchService(searchObject);

  }
//goes to backend
  searchService (searchObject: Object){
    console.log(searchObject);
    this.service.searchService(searchObject).subscribe (res => console.log(res),
                    err => console.log(err));

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
