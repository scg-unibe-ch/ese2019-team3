import { Component, OnInit } from '@angular/core';
import {Service} from "../../models/service";
import {ServiceService} from "../../service.service";
import {HeaderComponent} from "../../header/header.component";

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.scss'],
})
export class SearchresultsComponent implements OnInit {
  location: string [] = ['Aarau', 'Basel', 'Bern', 'Biel/Bienne', 'Frauenfeld', 'Freiburg', 'Genf', 'Lausanne', 'Lugano', 'Luzern', 'Neuenburg', 'Schaffhausen',
    'Schwyz', 'Sitten', 'Solothurn', 'St. Gallen', 'Zug', 'Zürich'];

  private Services: Service[];
  public id: any;
  public categorie: string;
  public p: string;
  public serviceTitle: string;
  public price: number;
  public anything: string;
  public city: string;
  d = new Date();


  constructor(private service: ServiceService) {
  }
 /* s = {city: '', serviceType: '', description: ''}

  searchObject = {
    provider: '',
    serviceTitle: '',
    description: '',
    providerId: '',
    serviceType: '',
    price: '',
    dates: '',
    city: '',

  };*/

  ngOnInit() {
   /* this.service.currentS.subscribe(s => this.s = s);
    this.searchObject.city = this.s.city;
    this.searchObject.serviceType = this.s.serviceType;
    this.searchObject.description = this.s.description;

    this.searchService(this.searchObject);*/
    this.clickSearch();
  }
  clickSearch() {
    const searchObject = {
      provider: this.p,
      serviceTitle: this.serviceTitle,
      description: this.anything,
      providerId: this.id,
      serviceType: this.categorie,
      price: this.price,
      dates: this.d,
      city: this.city,

    };
    this.searchService(searchObject);

    console.log('searching for service');

    JSON.stringify(searchObject);
    delete searchObject[0];
  }

// goes to backend
  async searchService(searchObject) {
    console.log(searchObject);
    await this.service.searchService(searchObject).subscribe((data: Service[]) => {
      this.Services = data;
    });
  }

  fetchAll() {
    this.service.getAll().subscribe(res => console.log(res), err => console.log(err));
  }
  updateResults() {
    this.clickSearch();
  }
}
