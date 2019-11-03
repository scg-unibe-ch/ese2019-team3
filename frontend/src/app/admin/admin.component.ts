import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../user';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  private adminUrl = "http://localhost:3000/admin";
  //private Users : Observable<User[]>;
  private Users: any;

  constructor(private http: HttpClient) {
    //this.Users = this.getRegistrationRequests();
    //-->testing without connection to backend

    this.Users = [{
      username : "name1",
      address: "Beispielweg 1",
      phone : "123798"
    },
      {
        username : "blubb",
        address: "Gasse 4",
        phone : "132423"
      },
      {
        username : "SomeName",
        address: "SomeStreet 5",
        phone : "230840984"
      },
      ]
  }

  getRegistrationRequests(){
    return this.http.get<User[]>("http://localhost:3000/user/verified");
  }

  validateUser(user: User){
    return "http://localhost:3000/user/validate/"+user.id;
  }

  ngOnInit() {}

}
