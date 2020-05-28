import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {AEvent} from '../../../models/aevent';
import {AEventsService} from '../../../services/a-events.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-detail4',
  templateUrl: './detail4.component.html',
  styleUrls: ['./detail4.component.css']
})
export class Detail4Component implements OnInit, OnDestroy {

  public theEditedEventId: number = -1;
  public editedEvent4: AEvent = null;
  private queryParamsSubsciption: Subscription = null;


  constructor(private aEventService: AEventsService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.queryParamsSubsciption = this.activatedRoute.queryParams
      .subscribe((aParams) => {
        this.setup(aParams, 'from router event');
      });
  }

  ngOnDestroy() {
    this.queryParamsSubsciption && this.queryParamsSubsciption.unsubscribe();
  }


  setup(params: Params, debug?: string) {
    console.log('detail setup= ' + debug + 'id= ' + params['id']);
    this.getEventToBeEdited(params['id'] || -1);
  }

  getEventToBeEdited(aId: number) {
    if (this.theEditedEventId === aId) {
      return;
    }

    // slaan we de aId op
    this.theEditedEventId = aId;
    this.selectEditedEvent(this.theEditedEventId);

    if (aId >= 0 && aId < this.aEventService.aEvents.length) {
      this.editedEvent4 = AEvent.trueCopy(this.aEventService.aEvents[aId]);
    } else {
      this.editedEvent4 = null;
    }
    // console.log(this.editedEvent4);
  }

  selectEditedEvent(aId: number) {
    this.router.navigate([], {relativeTo: this.activatedRoute, queryParams: {id: aId}}
    );
  }

  unselectEditedEvent() {
    this.router.navigate(['..'], {relativeTo: this.activatedRoute});

  }

  onSetTO(aEvent: AEvent) {
    this.aEventService.update(this.theEditedEventId, aEvent);
  }

  saveClick() {
    console.log('Id = ' + this.theEditedEventId + "has changed with scucces");
    this.aEventService.update(this.theEditedEventId, this.editedEvent4);
  }

  deleteClick() {
    if (this.popup()) {
      this.aEventService.remove(this.theEditedEventId);
      alert('the Next event with id ' + this.theEditedEventId + ' has been removed');
      this.editedEvent4.titel = null;
      this.editedEvent4.participationFee = null;
      this.editedEvent4.end = null;
      this.editedEvent4.status = null;
      this.editedEvent4.start = null;
      this.editedEvent4.maxParticipants = null;
      this.unselectEditedEvent();
    }
  }

  clearClick() {
    if (this.popup()) {
      this.editedEvent4.titel = null;
      this.editedEvent4.participationFee = null;
      this.editedEvent4.end = null;
      this.editedEvent4.status = null;
      this.editedEvent4.start = null;
      this.editedEvent4.maxParticipants = null;
    }
  }

  resetClick() {
    if (this.popup()) {
      this.editedEvent4 = this.aEventService.aEvents[this.theEditedEventId];
    }

  }

  cancelClick() {
    if (this.popup()) {
      this.editedEvent4 = null;
      this.theEditedEventId = -1;
      this.unselectEditedEvent();

    }
  }

  popup(): boolean {
    if (this.nothingHasChanged()) {
      return true;
    } else {
      return confirm('Wait! Are you sure to discard changes!');
    }
  }

  nothingHasChanged(): boolean {
    return this.editedEvent4.equals(
      this.aEventService.aEvents[this.theEditedEventId]);
  }


}
