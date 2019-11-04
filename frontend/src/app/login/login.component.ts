import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../authentication.service';
import { Router} from '@angular/router';
import {HomeComponent} from '../home/home.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    // tslint:disable-next-line:max-line-length
    constructor(private http: HttpClient, private authentification: AuthenticationService, private router: Router, private home: HomeComponent) {

        const url = 'http://localhost:3000/user/login';
        this.http.post(url, this.loginForm.value).subscribe(
            () => {},
            (e) => console.error(e)

        );
    }

// user is required to fill out both username and password fields
   loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });


    ngOnInit() {
       /* this.loginForm.valueChanges.subscribe(
            (value) => console.log(value),
        )*/
    }


// takes information from login form and passes it on
    loginUser() {

        const loginData = {
            username: this.loginForm.get('username').value,
            password: this.loginForm.get('password').value,
        };

        this.sendUserData(loginData);
        this.home.logIn();

    }

    // sends Data from login form to backend
    sendUserData(loginData: object) {
        console.log(loginData);
        this.authentification.loginUser(loginData)
            .subscribe(
                res => {
                    console.log(res);
                    localStorage.setItem('token', res.token);
                    this.home.logIn();
                    this.router.navigate(['']);
                },
                err => console.log(err));

    }
}
