import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from './authentication.service';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';

import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-list/todo-item/todo-item.component';
import { LoginComponent } from './login/login.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {RegistrationComponent} from './registration/registration.component';
import {PasswordforgottenComponent} from './passwordforgotten/passwordforgotten.component';
import {MyservicesComponent} from "./myservices/myservices.component";


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RouterModule, Routes } from '@angular/router';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {AdminComponent} from './admin/admin.component';

import {HeaderComponent} from "./header/header.component";
import {MatSelectModule} from "@angular/material/select";
import {AuthGuard} from './auth.guard';
import {RoleGuard} from './role.guard';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AddserviceComponent} from "./addservice/addservice.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {BodyComponent} from "./body/body.component";
import {FooterComponent} from "./footer/footer.component";
import {ServiceService} from "./service.service";
import {MatMenuModule} from "@angular/material/menu";
import {MatTableModule} from "@angular/material/table";



const appRoutes: Routes = [
    { path: 'LogIn', component: LoginComponent },
    { path: 'LogIn/PasswordForgotten', component: PasswordforgottenComponent },
    { path: 'Registration', component: RegistrationComponent},
    { path: 'Profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'Profile/ChangePassword', component: ChangePasswordComponent, canActivate: [AuthGuard] },
    {path: 'Profile/addService', component: AddserviceComponent, canActivate: [AuthGuard]},
    {path: 'essenundtrinken', component: BodyComponent, canActivate: [AuthGuard]},
    {path: 'searchresults', component:HeaderComponent, canActivate: [AuthGuard]},
    {path: 'Profile/myservices', component: MyservicesComponent, canActivate: [AuthGuard]},
    { path: 'Admin', component: AdminComponent, canActivate: [RoleGuard],
        data: {
            expectedRole: 'admin'
        } },
    { path: '', component: HeaderComponent},
    { path: '**', component: PageNotFoundComponent },
];
@NgModule({
    declarations: [
        AppComponent,
        TodoListComponent,
        TodoItemComponent,
        LoginComponent,
        HomeComponent,
        ProfileComponent,
        PasswordforgottenComponent,
        RegistrationComponent,
        ChangePasswordComponent,
        AdminComponent,
        HeaderComponent,
        PageNotFoundComponent,
        AddserviceComponent,
        BodyComponent,
        FooterComponent,
        MyservicesComponent,

    ],

  entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: true} // <-- debugging purposes only
        ),
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMenuModule,
        MatTableModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
      AuthenticationService,
      ServiceService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
