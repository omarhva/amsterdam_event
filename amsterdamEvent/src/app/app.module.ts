import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS } from '@angular/common/http';



import {AppComponent} from './app.component';
import {HeaderComponent} from './components/mainPage/header/header.component';
import {NavBarComponent} from './components/mainPage/nav-bar/nav-bar.component';
import {HomeComponent} from './components/mainPage/home/home.component';
import {Overvieuw1Component} from './components/mainPage/overvieuw1/overvieuw1.component';
import {Overview2Component} from './components/mainPage/overvieuw2/overview2.component';
import {Detail2Component} from './components/mainPage/detail2/detail2.component';
import {Overvieuw3Component} from './components/mainPage/overvieuw3/overvieuw3.component';
import {Detail3Component} from './components/mainPage/detail3/detail3.component';
import { RouterModule, Routes} from '@angular/router';
import {ErrorComponent} from './components/mainPage/error/error.component';
import {Overvieuw4Component} from './components/mainPage/overvieuw4/overvieuw4.component';
import {Detail4Component} from './components/mainPage/detail4/detail4.component';
import { Detail42Component } from './components/mainPage/detail42/detail42.component';
import { Detail6Component } from './components/mainPage/detail6/detail6.component';
import { Overvieuw6Component } from './components/mainPage/overvieuw6/overvieuw6.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AppFbComponent } from './app-fb/app-fb.component';
import { Header2Component } from './components/mainPage/header2/header2.component';
import { Navbar2Component } from './components/mainPage/navbar2/navbar2.component';
import { SignUpComponent } from './components/mainPage/sign-up/sign-up.component';
import { SignInComponent } from './components/mainPage/sign-in/sign-in.component';
import {AuthInterceptor} from './auth-interceptor';
import {AngularFirestore} from '@angular/fire/firestore';
import { Overview11Component } from './components/aevents2/overview11/overview11.component';
import { Detail11Component } from './components/aevents2/detail11/detail11.component';

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'events/overvieuw1', component: Overvieuw1Component},
  {path: 'events/overvieuw2', component: Overview2Component},
  {path: 'events/overvieuw3', component: Overvieuw3Component},
  {path: 'signUp', component: SignUpComponent},
  {path: 'signIn', component: SignInComponent},
  {path: 'events/overvieuw4', component: Overvieuw4Component, children: [
      {path: 'edit', component: Detail4Component}]
  },
  {path: 'events/overvieuw42', component: Overvieuw4Component, children: [
    {path: 'edit', component: Detail42Component}]
  },
  {path: 'events/overvieuw6', component: Overvieuw6Component, children: [
      {path: 'edit', component: Detail6Component}]
  },

  {path: 'events/overvieuw11', component: Overview11Component, children: [
      {path: 'edit', component: Detail11Component}]
  },

  {path: 'error', component: ErrorComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavBarComponent,
    HomeComponent,
    Overvieuw1Component,
    Overview2Component,
    Detail2Component,
    Overvieuw3Component,
    Detail3Component,
    ErrorComponent,
    Overvieuw4Component,
    Detail4Component,
    Detail42Component,
    Detail6Component,
    Overvieuw6Component,
    AppFbComponent,
    Header2Component,
    Navbar2Component,
    SignUpComponent,
    SignInComponent,
    Overview11Component,
    Detail11Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    HttpClient,
    AngularFirestore,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  //bootstrap: [AppComponent]
  bootstrap: [AppFbComponent]
})
export class AppModule {
}
