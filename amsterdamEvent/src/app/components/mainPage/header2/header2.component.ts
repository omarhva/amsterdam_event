import { Component, OnInit } from '@angular/core';
import {AEvents3SessionService} from '../../../services/a-events3-session.service';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component implements OnInit {


  today: Date = new Date();
  date = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate();
  time = this.today.getHours() + ':' + this.today.getMinutes();
  dateTime: string = this.date + ' ' + this.time;

  constructor(public aEvents3SessionService:AEvents3SessionService ) {

  }

  ngOnInit() {
  }

}
