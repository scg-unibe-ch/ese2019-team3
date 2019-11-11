import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})


export class AdminComponent implements OnInit {
   Users: User[];
   private user: User;
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
    this.http.get('http://localhost:3000/user/verify').subscribe(res => {alert(res[0].isVerified); this.user = res[0]; this.Users.push(this.user); },
                err => console.log(err));
  }

// sends user to backend for validation and tells admin it was validated
  validateUser(user: User) {
    this.sendUserToValidate(user);
    alert('User ' + user.firstname + ' was validated');
    this.getRegistrationRequests();
  }

  // sends user to backend for deletion and tells admin it was deleted
  deleteUser(user: User) {
    this.sendUserToDelete(user);
    alert('User ' + user.firstname + ' was deleted');
    this.getRegistrationRequests();
  }

sendUserToDelete(user: User){
  return this.http.delete('http://localhost:3000/user/' + user.id);
}

sendUserToValidate(user: User) {
  return this.http.get('http://localhost:3000/user/validate/' + user.id);
}
  ngOnInit() {}


}


