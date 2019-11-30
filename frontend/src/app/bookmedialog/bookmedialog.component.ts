import { Component, OnInit } from "@angular/core";
import { BookingService } from "../booking.service";

@Component({
  selector: "app-bookmedialog",
  templateUrl: "./bookmedialog.component.html",
  styleUrls: ["./bookmedialog.component.scss"]
})
export class BookmedialogComponent implements OnInit {
  constructor(private bookingService: BookingService) {}

  ngOnInit() {}

  bookingBody: Object;
  book() {
    //toDo define bookingBody
    // this.bookingService.addService(this.bookingBody).subscribe(
    //   res => console.log(res),
    //   err => console.log(err)
    // );

    alert(
      "Vielen Dank für ihre Buchung, ihre 'Anfrage' wurde erfolgreich an den Eventanbieter ermittelt. Name wird sich in kürze bei Ihnen melden"
    );
  }
}
