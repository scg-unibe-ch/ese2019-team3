import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { BookingService } from '../booking.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-bookmedialog',
  templateUrl: './bookmedialog.component.html',
  styleUrls: ['./bookmedialog.component.scss']
})
export class BookmedialogComponent implements OnInit {

  // able to inject any data into the dialog, data is defined as which the element who were send
  constructor(
    private bookingService: BookingService,
    private auth: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  bookingForm = new FormGroup({
    date: new FormControl('', Validators.required),
    comment: new FormControl('')
  });

  booking: any;

  ngOnInit() {}

  book() {
    this.booking = {
      clientId: this.auth.getCurrentUser().id,
      providerId: this.data.providerId,
      serviceId: this.data.id,
      date: this.bookingForm.get('date').value,
      // add to the backend
      comment: this.bookingForm.get('comment').value
    };

    console.log('Current Service Object ' + JSON.stringify(this.data));
    console.log('Booking Object ' + JSON.stringify(this.booking));

    // toDo define bookingBody
    // sending bookingBody
    this.bookingService.addService(this.booking).subscribe(
      res => console.log(res),
      err => console.log(err)
    );

    alert(
      'Vielen Dank für ihre Buchung, ihre \'Anfrage\' wurde erfolgreich an den Eventanbieter ermittelt. Name wird sich in kürze bei Ihnen melden'
    );
  }
}
