import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  private adminUrl = "http://localhost:3000/admin"
  private Users : User[];

  constructor(private http: HttpClient) {
  }
//TODO: secure path to admin page and let only admins see it
  // TODO: gets Requests from backend WIP
  /*getRegistrationRequests(){
    this.HttpClient.get(this.adminUrl).subscribe((instances: any) => {
      this.Users = instances.map((instance) => new User(instance.username, instance.password, instance.firstName, instance.lastName, instance.phone, instance.userGroups, instance.token));
    });
  }*/

  ngOnInit() {}

}
