import { Component, OnInit } from '@angular/core';
import { getQueryPredicate } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  disable(){
    color: 'green';
  }

}
