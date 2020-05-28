import {Component, Input, OnInit} from '@angular/core';
import {AEvent} from '../../../models/aevent';

@Component({
  selector: 'app-detail2',
  templateUrl: './detail2.component.html',
  styleUrls: ['./detail2.component.css']
})
export class Detail2Component implements OnInit {

  @Input()
  public editedEvent: AEvent;

  constructor() {
  }

  ngOnInit() {
  }

}
