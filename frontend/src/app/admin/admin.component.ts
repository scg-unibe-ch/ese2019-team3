import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})


export class AdminComponent implements OnInit {
  private Users;
  // private Users: any;

  constructor(private http: HttpClient) {
    this.getRegistrationRequests();
    // -->testing without connection to backend
    /*this.Users = [{
      username : 'name1',
      address: 'Beispielweg 1',
      phone : '123798'
    },
      {
        username : 'blubb',
        address: 'Gasse 4',
        phone : '132423'
      },
      {
        username : 'SomeName',
        address: 'SomeStreet 5',
        phone : '230840984'
      },
      ];*/
  }
// fetches users that need to be validated from backend
  getRegistrationRequests() {
    this.http.get('http://localhost:3000/user/verified').subscribe(res => {console.log(res); this.Users = res; alert(res); },
                err => console.log(err));
  }

// sends user to backend for validation and tells admin it was validated
  validateUser(user: User) {
    alert('User ' + user.username + ' was validated');
    return this.http.get('http://localhost:3000/user/validate/' + user.id);
    this.getRegistrationRequests();
  }

  // sends user to backend for deletion and tells admin it was deleted
  deleteUser(user: User) {
    alert('User ' + user.username + ' was deleted');
    return this.http.delete('http://localhost:3000/user/' + user.id);
    this.getRegistrationRequests();
  }


  ngOnInit() {}


}


