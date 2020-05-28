import {EventEmitter, Injectable} from '@angular/core';
import {AEvent, AEventStatus} from '../models/aevent';

@Injectable({
  providedIn: 'root'
})
export class AEventsService {

  public aEvents: AEvent[];
  aEventUpdated = new EventEmitter<AEvent>();

  constructor() {
    this.aEvents = [];
    for (let i = 0; i < 11; i++) {
      this.addRandomEvent();
    }
  }

  add(aEvent: AEvent): number {

    for (let i; i < this.aEvents.length; i++) {
      this.aEvents.push(aEvent);
    }
    return this.aEvents.length;
  }

  update(eIdx: number, aEvent: AEvent) {
    this.aEvents[eIdx] = aEvent;

  }

  remove(eIdx: number) {
    this.aEvents.splice(eIdx, 1);
  }

  addRandomEvent(): AEvent {
    const ai = new AEvent();
    ai.titel = 'The Fantastic Event-' + (this.aEvents.length + 1);
    ai.start = this.randomDate(new Date(2019, 9, 20), new Date(2019, 10, 29));
    ai.end = this.randomDate(ai.start, new Date(2019, 10, 30));
    ai.status = this.getRandomStatue();
    ai.participationFee = this.generateRandomNumber();
    ai.maxParticipants = Math.round(Math.random() * 5000);
    ai.description = 'Screening Brazil-' + (this.aEvents.length + 1);

    this.aEvents.push(ai);
    return ai;
  }

  randomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  generateRandomNumber() {
    const num = 0;
    const min = 0;
    const max = 20;
    let highlightedNumber;
    highlightedNumber = Math.round((Math.random() * (max - min) + min) * 100) / 100;
    return highlightedNumber;
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





