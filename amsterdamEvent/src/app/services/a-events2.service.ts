import {EventEmitter, Injectable} from '@angular/core';
import {AEvent, AEventStatus} from '../models/aevent';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AEvents3SessionService} from './a-events3-session.service';

@Injectable({
  providedIn: 'root'
})
export class AEvents2Service {
public readonly STORAG_BASE_URL = 'https://amsterdam-aevent.firebaseio.com/';


  public aEvents: AEvent[] = [];

  constructor( private http: HttpClient, private aEvents3SessionService:AEvents3SessionService) {
    this.getAllAEvents().subscribe(
      (aevents) => {
        if (aevents == null){
          this.aEvents = [];
          for (let i = 0; i < 6; i++) {
            this.addRandomEvent();
          }
        }
      }
    );
  }
  getAllAEvents(): Observable<AEvent []>{
    let aeObservable = this.http.get<AEvent []>( this.STORAG_AEVENTS_URL);
    aeObservable.subscribe(
      aevents =>{
        this.aEvents = aevents || [];
      },
      error => console.log(error)
    );
    return aeObservable;

  }

  saveAllAEvents() : Observable<AEvent []> {
    const token = this.aEvents3SessionService.getToken();
    let aeObservable = this.http.put<AEvent []>(this.STORAG_AEVENTS_URL +'?auth='+ token, this.aEvents);
    aeObservable.subscribe(
      aevents =>{
        this.aEvents = aevents;
      },
      error => console.log(error)
    );
    return aeObservable;

  }
  private readonly STORAG_AEVENTS_URL = this.STORAG_BASE_URL + 'aevents.json';

  add(aEvent: AEvent): number {

    for (let i; i < this.aEvents.length; i++) {
      this.aEvents.push(aEvent);
    }
    this.saveAllAEvents();
    return this.aEvents.length;
  }

  update(eIdx: number, aEvent: AEvent) {

    this.aEvents[eIdx] = aEvent;
    this.saveAllAEvents();

  }

  remove(eIdx: number) {
    this.aEvents.splice(eIdx, 1);
    this.saveAllAEvents();
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
