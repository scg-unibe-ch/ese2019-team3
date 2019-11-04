import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogData {
  action: string;
  username: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})


export class AdminComponent implements OnInit {
  private adminUrl = "http://localhost:3000/admin";
  //private Users : Observable<User[]>;
  private Users: any;

  constructor(private http: HttpClient, public dialog: MatDialog) {
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
    this.openDialog("validated", user.username);
    return this.http.get("http://localhost:3000/user/validate/"+user.id);

  }

  deleteUser(user: User){
    this.openDialog("deleted", user.username);
    return this.http.delete("http://localhost:3000/user/"+user.id);
  }



  ngOnInit() {}

  openDialog(action: string, username: string): void {
    this.dialog.open(DialogWindowDialog, {
      width: '250px',
      data: {username: username, action: action}
    });

  }

}

@Component({
  selector: 'dialog-window-dialog',
  templateUrl: 'dialog-window-dialog.html',
})
export class DialogWindowDialog {
username: string;
  action: string;
  constructor(
      public dialogRef: MatDialogRef<DialogWindowDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.action= data.action;
    this.username=data.action;

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
