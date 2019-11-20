import { Component, OnInit } from '@angular/core';
import {Service} from "../models/service";
import {ServiceService} from "../service.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {

  constructor(private service: ServiceService, public httpClient: HttpClient, private router: Router) {

  }

  ngOnInit() {
  }

  onSubmit(){
  }

}
