import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AEvent} from '../../../models/aevent';
import {AEventsService} from '../../../services/a-events.service';


@Component({
  selector: 'app-detail3',
  templateUrl: './detail3.component.html',
  styleUrls: ['./detail3.component.css']
})
export class Detail3Component implements OnInit {
  private theEditedEventId: number;
  public editedEvent3: AEvent;
  buttonDisabled = false;

  @Input()
  set editedAEventId(id: number) {
    this.theEditedEventId = id;
    this.editedEvent3 = AEvent.trueCopy(this.aEventService.aEvents[id]);
    // this.editedEvent3 = this.aEventService.aEvents[id];
  }

  get editedAEventId() {
    return this.theEditedEventId;
  }

  @Output()
  public editedAEventIdChange = new EventEmitter<number>();


  constructor(private aEventService: AEventsService) {
    this.aEventService.aEventUpdated.subscribe((aEvent: AEvent) => alert('new Event is ' + aEvent)
    );
  }

  onSetTO(aEvent: AEvent) {
    this.aEventService.update(this.theEditedEventId, aEvent);
  }

  saveClick() {
      this.aEventService.update(this.theEditedEventId, this.editedEvent3);
  }

  deleteClick() {
    if (this.popup()) {
      this.aEventService.remove(this.theEditedEventId);
      alert('the Next event with id ' + this.theEditedEventId + ' has been removed');
      this.editedEvent3.titel = null;
      this.editedEvent3.participationFee = null;
      this.editedEvent3.end = null;
      this.editedEvent3.status = null;
      this.editedEvent3.start = null;
      this.editedEvent3.maxParticipants = null;
      this.theEditedEventId = -1;
    }
  }

  clearClick() {
    if (this.popup()) {
      this.editedEvent3.titel = null;
      this.editedEvent3.participationFee = null;
      this.editedEvent3.end = null;
      this.editedEvent3.status = null;
      this.editedEvent3.start = null;
      this.editedEvent3.maxParticipants = null;
    }
  }

  resetClick() {
    if (this.popup()) {
      this.editedEvent3.titel = this.aEventService.aEvents[this.theEditedEventId].titel;
      this.editedEvent3.start = this.aEventService.aEvents[this.theEditedEventId].start;
      this.editedEvent3.end = this.aEventService.aEvents[this.theEditedEventId].end;
      this.editedEvent3.status = this.aEventService.aEvents[this.theEditedEventId].status;
      this.editedEvent3.maxParticipants = this.aEventService.aEvents[this.theEditedEventId].maxParticipants;
      this.editedEvent3.participationFee = this.aEventService.aEvents[this.theEditedEventId].participationFee;
    }
  }

  cancelClick() {
    if (this.popup()) {
      this.editedEvent3 = null;
      this.theEditedEventId = -1;
      this.editedAEventIdChange.emit(-1);
    }
  }

  ngOnInit() {
  }

  popup(): boolean {
    if (this.nothingHasChanged()) {
      return true;
    } else {
      return confirm('are you sure to discard changes!');
    }
  }

  nothingHasChanged(): boolean {
    return this.editedEvent3.equals(
      this.aEventService.aEvents[this.theEditedEventId]);
  }

}
