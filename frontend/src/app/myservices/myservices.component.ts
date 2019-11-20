import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../authentication.service";
import {Service} from "../models/service";
import {ServiceService} from "../service.service";

@Component({
  selector: 'app-myservices',
  templateUrl: './myservices.component.html',
  styleUrls: ['./myservices.component.scss'],
})
export class MyservicesComponent implements OnInit {

  constructor(private http: HttpClient,
              private authentification: AuthenticationService,private service: ServiceService) {
    const url = "http://localhost:4200/Profile/myservices";
  }
  private Services: Service[];
  public id: any;
  public categorie:string;
  public p: string;
  public serviceTitle : string;
  public price : number;
  public anything: string;
  public city: string;
/*
  public myservice = {
    provider : this.p,
    serviceTitle : this.serviceTitle,
    description: this.anything,
    providerId : this.id,
    serviceType : this.categorie,
    price : this.price,
    city : this.city,
  };*/

  ngOnInit() {
    this.id = this.authentification.getCurrentUser().id;
    //this.getMyServices(this.myservice.providerId);
    this.getMyServices(this.id);
    console.log(this.authentification.getCurrentUser().id);
    console.log("returns ID of current user " + this.id);
    console.log("returns current user " + this.authentification.getCurrentUser().firstname);
  }

    getMyServices(id){
    console.log(id);
    this.http.get('http://localhost3000/service/user/'+ id).subscribe((data:Service[]) => {this.Services =  data});
    }
    /*
//doesn't get myServices yet -- just all registered services as I cannot filter for a service with one userID.
  async getMyServices(id){
    console.log(id);
    await this.service.getMyServices(this.id).subscribe((data:Service[]) => {this.Services = data});
  }*/
}
