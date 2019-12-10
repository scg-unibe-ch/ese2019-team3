import {Component, OnInit, Provider} from '@angular/core';
import {Service} from "../../models/service";
import {ServiceService} from "../../service.service";
import {AuthenticationService} from "../../authentication.service";
import {MatDialog, MatSnackBar} from "@angular/material"
import { BookmedialogComponent } from 'src/app/bookmedialog/bookmedialog.component';
import {CustomerOrProviderGuard} from 'src/app/customerOrProvider.guard';
import {ProviderGuard} from "../../provider.guard";

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
  message: string;
  action: string;
  public r: number;

  constructor(private service: ServiceService, private auth: AuthenticationService,
              private providerGuard: ProviderGuard, private _snackBar: MatSnackBar, public bookMeDialog: MatDialog, private customerGuard: CustomerOrProviderGuard) {
  }
  loggedIn =  this.auth.loggedIn();
  customer  = this.customerGuard.isCustomerOrProvider();
  provider = this.providerGuard.isProvider();
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
      rating: this.r
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

  openDialog(service: Service){
    if (this.auth.getCurrentUser().userGroup != "customer") {
      
      // if
      this.message =
        "Bitte registrieren Sie sich als Kunde um unsere Service zu buchen.";
      this.action = "";
      this._snackBar.open(this.message, this.action, {
        duration: 5000
      });
    } else {
    //calling the dialog and sending him the specific input service data, on which the button has been clicked
    const bookingDialogRef = this.bookMeDialog.open(BookmedialogComponent, {data: service})
    //this.bookService(service);

    bookingDialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        alert("Vielen Dank für ihre Buchung, ihre 'Anfrage' wurde erfolgreich an den Eventanbieter ermittelt. Name wird sich in kürze bei Ihnen melden");
      }
    });
  }}
}
