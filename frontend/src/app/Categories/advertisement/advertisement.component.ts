import { Component, OnInit } from '@angular/core';
import {Service} from "../../models/service";
import {ServiceService} from "../../service.service";
import {AuthenticationService} from "../../authentication.service";

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss'],
})
export class AdvertisementComponent implements OnInit {
  location: string [] = ['Aarau', 'Basel', 'Bern', 'Biel/Bienne', 'Frauenfeld', 'Freiburg', 'Genf', 'Lausanne', 'Lugano', 'Luzern', 'Neuenburg', 'Schaffhausen',
    'Schwyz', 'Sitten', 'Solothurn', 'St. Gallen', 'Zug', 'Zürich'];

  private Services: Service[];
  public id: any;
  public categorie:string;
  public p: string;
  public serviceTitle : string;
  public price : number;
  public anything: string;
  public city: string;

  constructor(private service: ServiceService, private auth: AuthenticationService) {
  }
  loggedIn =  this.auth.loggedIn();
  ngOnInit() {
    this.clickAdvert();

  }
  clickAdvert() {
    let fObject = {
      provider: this.p,
      serviceTitle: this.serviceTitle,
      description: this.anything,
      providerId: this.id,
      serviceType: 'Werbung',
      price: this.price,
      city: this.city,
    };
    this.getAdvert(fObject);
    JSON.stringify(fObject);
    delete fObject[0];
  }

  async getAdvert(object) {
    console.log(object);
    await this.service.searchService(object).subscribe((data: Service[]) => {this.Services = data});
  }

  updateResults() {
    this.clickAdvert();
  }

}
