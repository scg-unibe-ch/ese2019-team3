import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../authentication.service';
import {Service} from '../models/service';
import {ServiceService} from '../service.service';
import {retry} from 'rxjs/operators';
import {stringify} from 'querystring';

@Component({
  selector: 'app-myservices',
  templateUrl: './myservices.component.html',
  styleUrls: ['./myservices.component.scss'],
})
export class MyservicesComponent implements OnInit {

  constructor(private http: HttpClient,
              private authentification: AuthenticationService, private service: ServiceService) {
    const url = 'http://localhost:4200/Profile/myservices';
  }
  private Services: Service[] = [];
  public id: any;
  public categorie: string;
  public p: string;
  public serviceTitle: string;
  public price: number;
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
  };

  */
  public current = this.authentification.getCurrentUser().id;


  ngOnInit() {
    this.id = this.authentification.getCurrentUser().id;

    this.getMyServices(this.id)  ;
    // this.returnEmptyService(this.Services);

    console.log(JSON.stringify(this.Services)) ;
    console.log(this.authentification.getCurrentUser().id);
    console.log('returns ID of current user ' + this.id);
    console.log('returns current user ' + this.authentification.getCurrentUser().firstname);
  }
  /*returnEmptyService(service: Service[]){
    if (Object.keys(service).length ===  0) {
           return console.log("my services");
    }
  }   */
    getMyServices(id) {
      console.log(id);
      this.http.get('http://localhost:3000/service/user/' + id).subscribe( result => {
        this.Services = result as Service[];
      });

    }

    deleteService(provider) {
        this.service.deleteMyService(provider);
        setTimeout(() => {this.getMyServices(this.authentification.getCurrentUser().id)}, 50 );
    }
}
