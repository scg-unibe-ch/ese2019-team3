import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';

import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-list/todo-item/todo-item.component';
import { LoginComponent } from './login/login.component'
import {HomeComponent} from './home/home.component';
import{ProfileComponent} from './profile/profile.component';
import{PasswordforgottenComponent} from './passwordforgotten/passwordforgotten.component';

@NgModule({
    declarations: [
        AppComponent,
        TodoListComponent,
        TodoItemComponent,
        LoginComponent,
        HomeComponent,
        ProfileComponent,
        PasswordforgottenComponent

    ],

  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
