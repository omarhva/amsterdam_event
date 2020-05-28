import {Component, OnInit} from '@angular/core';
import {AEvent, AEventStatus} from '../../../models/aevent';

@Component({
  selector: 'app-overview2',
  templateUrl: './overview2.component.html',
  styleUrls: ['./overview2.component.css']
})
export class Overview2Component implements OnInit {
  public aEvents: AEvent [];
  public selectedIndex: number;
  public selectedEvent: AEvent;


  constructor() {
  }

  ngOnInit() {
    this.aEvents = [];
    for (let i = 0; i < 10; i++) {
      this.addRandomEvent();
    }
  }

  onSelect(aIndex) {
    this.selectedIndex = aIndex;
    console.log(this.aEvents[aIndex]);
    // this.selectedEvent = this.aEvents[aIndex];
    this.selectedEvent = AEvent.trueCopy(this.aEvents[aIndex]);
  }

  handelClick() {
    this.addRandomEvent();
    // this.onSelect(this.aEvents.length);
    for (let i = 0; i < this.aEvents.length; i++) {
      this.onSelect(i);
    }
  }


  addRandomEvent() {
    const ai = new AEvent();
    ai.titel = 'The Fantastic Event-' + (this.aEvents.length);
    ai.start = this.randomDate(new Date(2019, 9, 20), new Date(2019, 10, 29));
    ai.end = this.randomDate(ai.start, new Date(2019, 10, 30));
    ai.status = this.getRandomStatue();
    ai.participationFee = this.generateRandomNumber();
    if (ai.participationFee == null) {
      ai.maxParticipants = null;
    } else {
      ai.maxParticipants = Math.round(Math.random() * 5000);
    }
    // ai.maxParticipants = Math.floor(Math.random() * Math.floor(5000));

    this.aEvents.push(ai);
  }


  randomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  generateRandomMaxCap() {
    let num = 0;
    let highlightedNumber;
    highlightedNumber = Math.round(Math.random() * 5000);
    if (this.generateRandomNumber() == null) {
      num = null;
      return num;
    } else {
      return highlightedNumber;
    }


  }

  generateRandomNumber() {
    let num = 0;
    const min = 0;
    const max = 20;
    let highlightedNumber;
    highlightedNumber = Math.round((Math.random() * (max - min) + min) * 100) / 100;
    if (highlightedNumber < 3.50) {
      num = null;
      return num;

    } else {
      num = highlightedNumber;
      return num;
    }
  }

  getRandomStatue(): AEventStatus {

    const key = Math.floor(Math.random() * Math.floor(3) + 1);
    if (key === 1) {
      return AEventStatus.PUBLISHED;
    }
    if (key === 2) {
      return AEventStatus.CANCELLED;
    }
    if (key === 3) {
      return AEventStatus.DRAFT;
    } else {
      return null;
    }
  }
}


