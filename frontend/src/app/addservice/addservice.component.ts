import { Component, OnInit } from '@angular/core';
import {ServiceService} from "../service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-addservice',
  templateUrl: './addservice.component.html',
  styleUrls: ['./addservice.component.scss'],
})
export class AddserviceComponent implements OnInit {

  services: string [] = ['Food & Drink', 'Musik', 'Licht & Bühne', 'Werbung'];
  locations: string [] = ['Aarau', 'Basel', 'Bern', 'Biel/Bienne', 'Frauenfeld', 'Freiburg', 'Genf', 'Lausanne', 'Lugano', 'Luzern', 'Neuenburg', 'Schaffhausen',
    'Schwyz', 'Sitten', 'Solothurn', 'St. Gallen', 'Zug', 'Zürich'];


  /*filter : any = {
    l : '',
    s: '',
  };

  serviceForm = new FormGroup({
    services: new FormControl("",),
    locations: new FormControl(""),
    about: new FormControl(""),
  });*/

  private id : number;
  private l:string;
  private s: string;
  d = new Date();
  private price: string;
  private about:string; //evt. json file!


  constructor(private http: HttpClient,
              private authentification: AuthenticationService,
              private service: ServiceService,) {
    const url = "http://localhost:4200/Profile/addService";
    const serviceForm = {
      serviceTitle: this.s,
      city: this.l,
      dates: this.d,
      price: this.price,
      description: this.about,
    }
   this.http
        .post(url, serviceForm)
        .subscribe(() => {
        }, e => console.error(e));
  }

  ngOnInit() {
    //this.serviceForm.valueChanges.subscribe(value => console.log(value));
  }

  onSubmit() {
    const addService = {
        serviceTitle: this.s,
        city: this.l,
        dates: this.d,
        price: this.price,
        description: this.about,
        providerId :  this.authentification.getCurrentUser().id,
        provider : this.authentification.getCurrentUser().lastname,
    };
    console.log("Adding new Service", addService);
    //calls method to post the registerUser to the backend
    this.addservice(addService);
  }

  //sends service to backend
  addservice (addService: Object){
    console.log(addService);
    this.service
        .addService(addService)
        .subscribe(res => console.log(res), err => console.log(err));


  }


}
