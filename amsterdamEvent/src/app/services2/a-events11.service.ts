import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AEvent, AEventStatus} from '../models/aevent';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AEvents11Service {
  private aEventUrl: string;
  public aEvents: AEvent[];


  constructor(private http: HttpClient) {
    this.aEventUrl = 'http://localhost:8081/aevents';
    this.findAll().subscribe(
      (aevents) => {
        if (!(aevents == null)) {
          this.aEvents = aevents;
        }
      }, error => {
        console.log(error);
      }
    );
  }

  public findAll(): Observable<AEvent[]> {
    return this.http.get<AEvent[]>(this.aEventUrl,);
    this.saveAllAEvents();

  }

  add(aEvent: AEvent) {

    let aeObservable = this.http.post<AEvent>(this.aEventUrl, aEvent);

    aeObservable.subscribe(
      aevent => {
        console.log('dat is aeObservable from add --> '+ aevent.titel+ ''+ aevent.id );
      },
      error => console.log(error)
    );
    return aeObservable;
  }


  update(eIdx: number, aEvent: AEvent) {

    this.aEvents[eIdx] = aEvent;
    this.saveAllAEvents();
  }

  saveAllAEvents(): Observable<AEvent []> {

    let aeObservable = this.http.put<AEvent[]>(this.aEventUrl, this.aEvents);
    aeObservable.subscribe(
      aevents => {
        this.aEvents = aevents;
      },
      error => console.log(error)
    );
    return aeObservable;
  }

  remove(eIdx: number) {
    let aeObservable = this.http.delete<AEvent>(this.aEventUrl + '/' + eIdx);
    this.aEvents.splice(eIdx, 1);

    this.saveAllAEvents();
  }

  creatRandomEvent(): AEvent {
    const ai = new AEvent();
    ai.titel = 'frontend aEvent-' + (this.aEvents.length);
    ai.start = this.randomDate(new Date(2019, 9, 20), new Date(2019, 10, 29));
    ai.end = this.randomDate(ai.start, new Date(2019, 10, 30));
    ai.status = this.getRandomStatue();
    ai.participationFee = this.generateRandomNumber();
    ai.maxParticipants = Math.round(Math.random() * 5000);
    ai.description = 'Screening Brazil-' + (this.aEvents.length + 1);
    return ai;

  }

  addRandomEvent(aevent: AEvent) {

    this.aEvents.push(aevent);

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
      return AEventStatus.CANCELLED;
    }
  }


}
