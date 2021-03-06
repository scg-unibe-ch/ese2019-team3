import { Component, OnInit } from "@angular/core";
import { ServiceService } from "../../service.service";
import { Service } from "../../models/service";

import { BookmedialogComponent } from "../../bookmedialog/bookmedialog.component";
import { MatDialog, MatSnackBar } from "@angular/material";
import { AuthenticationService } from "../../authentication.service";
import { CustomerOrProviderGuard } from "../../customerOrProvider.guard";
import { ProviderGuard } from "../../provider.guard";

@Component({
  selector: "app-music",
  templateUrl: "./music.component.html",
  styleUrls: ["./music.component.scss"]
})
export class MusicComponent implements OnInit {
  location: string[] = [
    "Aarau",
    "Basel",
    "Bern",
    "Biel/Bienne",
    "Frauenfeld",
    "Freiburg",
    "Genf",
    "Lausanne",
    "Lugano",
    "Luzern",
    "Neuenburg",
    "Schaffhausen",
    "Schwyz",
    "Sitten",
    "Solothurn",
    "St. Gallen",
    "Zug",
    "Zürich"
  ];

  private Services: Service[];
  public id: any;
  public categorie: string;
  public p: string;
  public serviceTitle: string;
  public price: number;
  public anything: string;
  public city: string;
  message: string;
  action: string;

  constructor(
    private service: ServiceService,
    public bookMeDialog: MatDialog,
    private providerGuard: ProviderGuard,
    private auth: AuthenticationService,
    private _snackBar: MatSnackBar,
    private customerGuard: CustomerOrProviderGuard
  ) {}
  loggedIn = this.auth.loggedIn();
  customer = this.customerGuard.isCustomerOrProvider();
  provider = this.providerGuard.isProvider();

  ngOnInit() {
    this.clickMusic();
  }

  openDialog(service: Service) {
    if (this.auth.getCurrentUser().userGroup != "customer") {
      // if
      this.message =
        "Bitte registrieren Sie sich als Kunde um unsere Service zu buchen.";
      this.action = "";
      this._snackBar.open(this.message, this.action, {
        duration: 5000
      });
    } else {
      // calling the dialog and sending him the specific input service data, on which the button has been clicked
      const bookingDialogRef = this.bookMeDialog.open(BookmedialogComponent, {
        data: service
      });
      // this.bookService(service);

      bookingDialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          alert(
            "Vielen Dank für ihre Buchung, ihre 'Anfrage' wurde erfolgreich an den Eventanbieter ermittelt. Name wird sich in kürze bei Ihnen melden"
          );
        }
      });
    }
  }

  clickMusic() {
    const fObject = {
      provider: this.p,
      serviceTitle: this.serviceTitle,
      description: this.anything,
      providerId: this.id,
      serviceType: "Musik",
      price: this.price,
      city: this.city
    };
    this.getMusic(fObject);
    JSON.stringify(fObject);
    delete fObject[0];
  }

  async getMusic(object) {
    console.log(object);
    await this.service.searchService(object).subscribe((data: Service[]) => {
      this.Services = data;
    });
  }

  updateResults() {
    this.clickMusic();
  }
}
