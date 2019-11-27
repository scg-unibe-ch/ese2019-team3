import { Component, OnInit } from '@angular/core';
import {Service} from "../../models/service";
import {ServiceService} from "../../service.service";


@Component({
  selector: 'app-food-and-drink',
  templateUrl: './food-and-drink.component.html',
  styleUrls: ['./food-and-drink.component.scss'],
})
export class FoodAndDrinkComponent implements OnInit {
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

  constructor(private service: ServiceService) {
  }

  ngOnInit() {
    this.clickFoodAnDrink();

  }
  clickFoodAnDrink() {
    let fObject = {
      provider: this.p,
      serviceTitle: this.serviceTitle,
      description: this.anything,
      providerId: this.id,
      serviceType: 'Food & Drink',
      price: this.price,
      city: this.city,
    };
    this.getFoodandDrink(fObject);
    JSON.stringify(fObject);
    delete fObject[0];
  }

  async getFoodandDrink(object) {
    console.log(object);
    await this.service.searchService(object).subscribe((data: Service[]) => {this.Services = data});
  }

  updateResults(){

    let Object = {
      provider: this.p,
      serviceTitle: this.serviceTitle,
      description: this.anything,
      providerId: this.id,
      serviceType: this.categorie,
      price: this.price,
      city: this.city,
    };
    this.search(Object);
    JSON.stringify(Object);
    delete Object[0];
  }

  async search(object) {
    console.log(object);
    await this.service.searchService(object).subscribe((data: Service[]) => {this.Services = data});
  }

}

