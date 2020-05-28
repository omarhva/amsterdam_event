import { Component, OnInit } from '@angular/core';
import {AEvents3SessionService} from '../../../services/a-events3-session.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  constructor( public aEvents3SessionService : AEvents3SessionService) { }

  ngOnInit() {
  }
  onSigup(form:NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.aEvents3SessionService.signUP(email, password);
    console.log(email +' and' + password );

  }


}
