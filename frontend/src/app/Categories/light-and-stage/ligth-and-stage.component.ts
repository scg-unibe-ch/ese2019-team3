import { Component, OnInit } from '@angular/core';
import {ServiceService} from "../../service.service";
import {Service} from "../../models/service";
import {MatDialog} from "@angular/material"
import { BookmedialogComponent } from 'src/app/bookmedialog/bookmedialog.component';

@Component({
  selector: 'app-ligth-and-stage',
  templateUrl: './ligth-and-stage.component.html',
  styleUrls: ['./ligth-and-stage.component.scss'],
})
export class LightAndStageComponent implements OnInit {
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

  constructor(private service: ServiceService, public bookMeDialog: MatDialog) {
  }

  openDialog(service: Service){

    //calling the dialog and sending him the specific input service data, on which the button has been clicked
    this.bookMeDialog.open(BookmedialogComponent, {data: service});
    //this.bookService(service);
  }
  

  ngOnInit() {
    this.clickLight();

  }
  clickLight() {
    let fObject = {
      provider: this.p,
      serviceTitle: this.serviceTitle,
      description: this.anything,
      providerId: this.id,
      serviceType: 'Licht & Bühne',
      price: this.price,
      city: this.city,
    };
    this.getLight(fObject);
    JSON.stringify(fObject);
    delete fObject[0];
  }

  async getLight(object) {
    console.log(object);
    await this.service.searchService(object).subscribe((data: Service[]) => {this.Services = data});
  }

  updateResults() {
    this.clickLight();
  }

}
