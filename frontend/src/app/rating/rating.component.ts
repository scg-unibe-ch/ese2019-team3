import {Component} from '@angular/core';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AllBookingsComponent} from '../all-bookings/all-bookings.component';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  constructor(private allbookings: AllBookingsComponent){
  }
  selected = 0;
  hovered = 0;
  readonly = false;

}
