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


  filter : any = {
    l : '',
    s: '',
  };

  serviceForm = new FormGroup({
    services: new FormControl("",),
    locations: new FormControl(""),
    about: new FormControl(""),
  });

  constructor(private http: HttpClient,
              private authentification: AuthenticationService,
              private service: ServiceService,
  ) {
    const url = "http://localhost:4200/addService";
   this.http
        .post(url, this.serviceForm.value)
        .subscribe(() => {
        }, e => console.error(e));
  }

  ngOnInit() {
    this.serviceForm.valueChanges.subscribe(value => console.log(value));
  }

  onSubmit() {
    const addService = {
      services: this.serviceForm.get("services").value,
      locations: this.serviceForm.get("locations").value,
      about: this.serviceForm.get("about").value
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
