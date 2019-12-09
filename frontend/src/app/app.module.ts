import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { TokenInterceptorService } from './token-interceptor.service';

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
import {MyservicesComponent} from './myservices/myservices.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RouterModule, Routes } from '@angular/router';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {AdminComponent} from './admin/admin.component';

import {HeaderComponent} from './header/header.component';
import {MatSelectModule} from '@angular/material/select';
import {AuthGuard} from './auth.guard';
import {AdminGuard} from './admin.guard';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AddserviceComponent} from './addservice/addservice.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {BodyComponent} from './body/body.component';
import {FooterComponent} from './footer/footer.component';
import {ServiceService} from './service.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {ProviderGuard} from './provider.guard';
import {FoodAndDrinkComponent} from './Categories/food-and-drink/food-and-drink.component';

import {MatExpansionModule} from '@angular/material/expansion';
import {LightAndStageComponent} from './Categories/light-and-stage/ligth-and-stage.component';
import {AdvertisementComponent} from './Categories/advertisement/advertisement.component';
import {MusicComponent} from './Categories/music/music.component';
import {SearchresultsComponent} from './Categories/searchresults/searchresults.component';
import {CustomerOrProviderGuard} from './customerOrProvider.guard';
import { JwtHelperService } from '@auth0/angular-jwt';
import {BookingRequestsComponent} from './booking-requests/booking-requests.component';

import {TokenExpirationGuard} from './token-expiration.guard';
import {LoggedInGuard} from './loggedIn.guard';
import {AllBookingsComponent} from './all-bookings/all-bookings.component';
import {NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AdminService} from './admin.service';
import {ALL} from 'tslint/lib/rules/completedDocsRule';
import {AllBookingsService} from './all-bookings.service';
import {BookingRequestService} from './booking-request.service';
import {AboutusComponent} from './footer/aboutus/aboutus.component';
import {FaqComponent} from './footer/faq/faq.component';
import {BookmedialogComponent} from './bookmedialog/bookmedialog.component';
import {DeleteProfileComponent} from './delete-profile/delete-profile.component';
import {MatDialogModule, MatSnackBarModule} from '@angular/material';
import {AgbComponent} from './footer/agb/agb.component';



// @ts-ignore
const appRoutes: Routes = [
    { path: 'LogIn', component: LoginComponent, canActivate: [LoggedInGuard, TokenExpirationGuard]},
    { path: 'LogIn/PasswordForgotten', component: PasswordforgottenComponent, canActivate: [LoggedInGuard, TokenExpirationGuard] },
    { path: 'Registration', component: RegistrationComponent, canActivate: [LoggedInGuard, TokenExpirationGuard]},
    { path: 'Profile', component: ProfileComponent, canActivate: [AuthGuard, TokenExpirationGuard] },
    { path: 'Profile/ChangePassword', component: ChangePasswordComponent, canActivate: [AuthGuard, TokenExpirationGuard] },
    {path: 'Profile/addService', component: AddserviceComponent, canActivate: [ProviderGuard, TokenExpirationGuard]},
    {path: 'foodanddrink', component: FoodAndDrinkComponent, canActivate: [TokenExpirationGuard]},
    {path: 'lightandstage', component: LightAndStageComponent, canActivate: [TokenExpirationGuard]},
    {path: 'advertisement', component: AdvertisementComponent, canActivate: [TokenExpirationGuard]},
    {path: 'music', component: MusicComponent, canActivate: [AuthGuard, TokenExpirationGuard]},
    {path: 'searchresults', component: SearchresultsComponent, canActivate: [TokenExpirationGuard]},
    {path: 'aboutus', component: AboutusComponent, canActivate: [TokenExpirationGuard]},
    {path: 'faq', component: FaqComponent, canActivate: [TokenExpirationGuard]},
    {path: 'agb', component: AgbComponent, canActivate: [TokenExpirationGuard]},
    {path: 'Profile/DeleteProfile', component: DeleteProfileComponent, canActivate: [CustomerOrProviderGuard, TokenExpirationGuard]},
    {path: 'Profile/myservices', component: MyservicesComponent, canActivate: [ProviderGuard,  TokenExpirationGuard]},
    {path: 'allBookings', component: AllBookingsComponent, canActivate: [CustomerOrProviderGuard, TokenExpirationGuard]},
    {path: 'Admin', component: AdminComponent, canActivate: [AdminGuard, TokenExpirationGuard] },
    {path: 'bookingRequests', component: BookingRequestsComponent, canActivate: [ProviderGuard, TokenExpirationGuard]},
    {path: '', component: HeaderComponent, canActivate: [TokenExpirationGuard]},
    { path: '**', component: PageNotFoundComponent, canActivate: [TokenExpirationGuard] },
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
        FoodAndDrinkComponent,
        LightAndStageComponent,
        AdvertisementComponent,
        MusicComponent,
        SearchresultsComponent,
        AboutusComponent,
        FaqComponent,
        AgbComponent,
        BookmedialogComponent,
        DeleteProfileComponent,
        AllBookingsComponent,
        BookingRequestsComponent,
    ],
  entryComponents: [BookmedialogComponent],
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
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMenuModule,
        MatTableModule,
        MatExpansionModule,
        MatDialogModule,
        NgbRatingModule,
        NgbModule,
    ],

  providers: [
    StatusBar,
    SplashScreen,
      AuthenticationService,
      ServiceService,
      AdminService,
      AllBookingsService,
      BookingRequestService,


    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
