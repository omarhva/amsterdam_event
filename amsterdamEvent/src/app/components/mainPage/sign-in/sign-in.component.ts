import { Component, OnInit } from '@angular/core';
import {AEvents3SessionService} from '../../../services/a-events3-session.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  errorMessage: string;


  constructor( public aEvents3SessionService : AEvents3SessionService, public router:Router) { }

  ngOnInit() {
  }
  onSigIn(form:NgForm){
    const email = form.value.email;
    const password = form.value.password;


    this.aEvents3SessionService.signIn(email, password).subscribe((data) => {
      this.router.navigate(['/home']);
    }, (error) => {
      this.errorMessage = error.error.message;
    });
  }

}
