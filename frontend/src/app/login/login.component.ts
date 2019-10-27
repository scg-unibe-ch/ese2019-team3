import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../authentication.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    private loginData= {password: "",
        username: "",
    };

  /* @ToDO auf Login drücken, dann wird man eingeloggt, Passwort und Username mit Datenbank abgleichen; authentication!*/
    constructor(private http: HttpClient, private authentification: AuthenticationService) {

        const url = 'http://localhost:4200/LogIn';
        this.http.post(url, this.loginForm.value).subscribe(
            () => {},
            (e) => console.error(e)

        )
    }


    ngOnInit() {
        this.loginForm.valueChanges.subscribe(
            (value) => console.log(value),
        )
    }

//user is required to fill out both username and password fields
   loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    })


//takes information from login form and passes it on
    loginUser(){
    this.loginData.password=this.loginForm.get("password").value;
    this.loginData.username = this.loginForm.get("username").value;
    this.sendUserData(this.loginData);

    }

    //sends Data from login form to backend
    sendUserData(loginData: Object){
        console.log(loginData)
        this.authentification.loginUser(loginData)
            .subscribe(
                res => console.log(res),
                err => console.log(err)
            )

    }
}
