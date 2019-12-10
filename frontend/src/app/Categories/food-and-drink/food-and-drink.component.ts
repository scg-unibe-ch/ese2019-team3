import { Component, OnInit } from '@angular/core';
import {Service} from "../../models/service";
import {ServiceService} from "../../service.service";
import {MatDialog} from "@angular/material"
import { BookmedialogComponent } from 'src/app/bookmedialog/bookmedialog.component';
import {CustomerOrProviderGuard} from 'src/app/customerOrProvider.guard';
import {AuthenticationService} from "../../authentication.service";
import {ProviderGuard} from "../../provider.guard";

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

  constructor(private service: ServiceService, public bookMeDialog: MatDialog, private customerGuard: CustomerOrProviderGuard, private auth: AuthenticationService,
              private providerGuard: ProviderGuard) {
  }
  loggedIn =  this.auth.loggedIn();
  customer  = this.customerGuard.isCustomerOrProvider();
  provider = this.providerGuard.isProvider();

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

  updateResults() {
      this.clickFoodAnDrink();
  }

  openDialog(service: Service){

    //calling the dialog and sending him the specific input service data, on which the button has been clicked
    const bookingDialogRef = this.bookMeDialog.open(BookmedialogComponent, {data: service})
    //this.bookService(service);

    bookingDialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        alert("Vielen Dank für ihre Buchung, ihre 'Anfrage' wurde erfolgreich an den Eventanbieter ermittelt. Name wird sich in kürze bei Ihnen melden");
      }
    });
  }
}

