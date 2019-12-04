import { Component, OnInit } from '@angular/core';
import {ServiceService} from "../../service.service";
import {Service} from "../../models/service";
import {BookmedialogComponent} from '../../bookmedialog/bookmedialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
})
export class MusicComponent implements OnInit {
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

  ngOnInit() {
    this.clickMusic();

  }
  clickMusic() {
    let fObject = {
      provider: this.p,
      serviceTitle: this.serviceTitle,
      description: this.anything,
      providerId: this.id,
      serviceType: 'Musik',
      price: this.price,
      city: this.city,
    };
    this.getMusic(fObject);
    JSON.stringify(fObject);
    delete fObject[0];
  }

  async getMusic(object) {
    console.log(object);
    await this.service.searchService(object).subscribe((data: Service[]) => {this.Services = data});
  }

  updateResults() {
    this.clickMusic();
  }
  openDialog(service: Service){

    // calling the dialog and sending him the specific input service data, on which the button has been clicked
    this.bookMeDialog.open(BookmedialogComponent, {data: service});
    // this.bookService(service);
  }

}
