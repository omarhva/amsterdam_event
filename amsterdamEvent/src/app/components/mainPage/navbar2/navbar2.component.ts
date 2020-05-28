import { Component, OnInit } from '@angular/core';
import {AEvents3SessionService} from '../../../services/a-events3-session.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css']
})
export class Navbar2Component implements OnInit {

  constructor( public aEvents3SessionService : AEvents3SessionService, private router: Router) { }

  ngOnInit() {
  }
  onLogOut(){
    this.aEvents3SessionService.logout();
    this.router.navigate(['/signIn']);
  }
  isLoggedIn() {
    return this.aEvents3SessionService.isLoggedIn();
  }
}
