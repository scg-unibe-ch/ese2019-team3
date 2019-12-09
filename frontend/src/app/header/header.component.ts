import {Component, Input, OnInit} from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatOptionModule} from "@angular/material/core";
// import {MatSelectModule} from "@angular/material/select";
import {ServiceService} from '../service.service';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Service} from '../models/service';
import {DataServiceService} from "../data-service.service";
// import {Service} from "../models/service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  LoggedIn = false;

  services: string [] = ['Food & Drink', 'Musik', 'Licht & Bühne', 'Werbung' ];
  locations: string [] = ['Aarau', 'Basel', 'Bern', 'Biel/Bienne', 'Frauenfeld', 'Freiburg', 'Genf', 'Lausanne', 'Lugano', 'Luzern', 'Neuenburg', 'Schaffhausen',
  'Schwyz', 'Sitten', 'Solothurn', 'St. Gallen', 'Zug', 'Zürich'];

  public categorie: string;
  public p: string;
  public serviceTitle: string;
  public id: number;
  public price: number;
  d = new Date();
  public anything: string;
  public city: string;
  public i: number;
  private Services: Service[];
  private dataTest: string;
  s: Service;

  search: any = {
      provider: '',
      serviceTitle: '',
      description: '',
      providerId: '',
      serviceType: '',
      price: '',
      dates: '',
      city: '',

  };

  constructor(public authentication: AuthenticationService,
              private service: ServiceService, private router: Router, public httpClient: HttpClient, private data: DataServiceService) {

  }


  ngOnInit() {}

//on Submit we want to set the Input and use the input then in our searchresultscomponent.
  onSubmit() {
    const searchObject = {
      id : this.i,
      provider : this.p,
      serviceTitle : this.serviceTitle,
      description: this.anything,
      providerId : this.id,
      serviceType : this.categorie,
      price : this.price,
      dates: this.d,
      city : this.city,

    };
    this.data.setInputSearch(searchObject);
    console.log(searchObject);
    this.router.navigate(['/searchresults']);

    /*
    this.searchService(searchObject);

    console.log('searching for service');
    // calls method to post the registerUser to the backend
   // this.router.navigate(['/searchresults']);
    JSON.stringify(searchObject);
    delete searchObject[0];*/
  }
// goes to backend
  async searchService(searchObject) {
    console.log(searchObject);
    await this.service.searchService(searchObject).subscribe((data: Service[]) => {this.Services = data; });
  }

  fetchAll() {
    this.service.getAll().subscribe(res => console.log(res), err => console.log(err));
  }



}
