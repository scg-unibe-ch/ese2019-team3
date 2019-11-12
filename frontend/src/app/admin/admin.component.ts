import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../models/user';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})


export class AdminComponent implements OnInit {
   Users: User[];
  // tslint:disable-next-line:ban-types
   private user: any;
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
    this.http.get('http://localhost:3000/user/verify').subscribe((data: User[]) =>{this.Users = data});
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
  this.http.delete('http://localhost:3000/user/' + user.id).subscribe();
}

sendUserToValidate(user: User) {
    alert(user.id);
    this.http.put('http://localhost:3000/user/'+ user.id, user).subscribe();

}
  ngOnInit() {
    this.getRegistrationRequests();

  }


}


