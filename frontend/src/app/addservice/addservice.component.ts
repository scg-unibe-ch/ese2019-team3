import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addservice',
  templateUrl: './addservice.component.html',
  styleUrls: ['./addservice.component.scss'],
})
export class AddserviceComponent implements OnInit {
  services : string [] = ['Food & Drink', 'Musik', 'Licht & Bühne', 'Werbung' ];
  locations : string [] = ['Aarau', 'Basel', 'Bern', 'Biel/Bienne', 'Frauenfeld', 'Freiburg', 'Genf', 'Lausanne', 'Lugano','Luzern', 'Neuenburg', 'Schaffhausen',
    'Schwyz', 'Sitten', 'Solothurn', 'St. Gallen', 'Zug', 'Zürich'];

  constructor() { }

  ngOnInit() {}


}
