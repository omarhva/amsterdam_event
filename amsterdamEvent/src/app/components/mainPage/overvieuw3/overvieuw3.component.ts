import {Component, OnInit} from '@angular/core';
import {AEvent, AEventStatus} from '../../../models/aevent';
import {AEventsService} from '../../../services/a-events.service';

@Component({
  selector: 'app-overvieuw3',
  templateUrl: './overvieuw3.component.html',
  styleUrls: ['./overvieuw3.component.css']
})
export class Overvieuw3Component implements OnInit {

  public selectedIndex: number;


  constructor(private aEventsService: AEventsService) {
  }

  ngOnInit() {

  }

  onSelect(editedEventId) {
    this.selectedIndex = editedEventId;
    // console.log(this.selectedIndex);
    // this.selectedEvent = this.aEventsService.aEvents[aIndex];
    // this.selectedEvent = AEvent.trueCopy(this.aEvents[aIndex]);
  }

  handelClick() {
    this.aEventsService.add(this.aEventsService.addRandomEvent());
    for (let i = 0; i < this.aEventsService.aEvents.length; i++) {
      this.onSelect(i);

    }
  }
}
