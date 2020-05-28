import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  today: Date = new Date();
  date = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate();
  time = this.today.getHours() + ':' + this.today.getMinutes();
  dateTime: string = this.date + ' ' + this.time;

  constructor() {

  }

  ngOnInit() {
  }

}
