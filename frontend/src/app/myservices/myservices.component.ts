import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../authentication.service";
import {Service} from "../models/service";

@Component({
  selector: 'app-myservices',
  templateUrl: './myservices.component.html',
  styleUrls: ['./myservices.component.scss'],
})
export class MyservicesComponent implements OnInit {

  constructor(private http: HttpClient,
              private authentification: AuthenticationService,) {
    const url = "http://localhost:4200/Profile/myservices";
  }
  private Services: Service[];
  ngOnInit() {}

}
