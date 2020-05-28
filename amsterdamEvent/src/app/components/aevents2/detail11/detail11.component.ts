import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AEvent} from '../../../models/aevent';
import {Subscription} from 'rxjs';
import {AEvents2Service} from '../../../services/a-events2.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AEvents11Service} from '../../../services2/a-events11.service';

@Component({
  selector: 'app-detail11',
  templateUrl: './detail11.component.html',
  styleUrls: ['./detail11.component.css']
})
export class Detail11Component implements OnInit {

  @ViewChild('editForm', {static: false})
  private detailForm: NgForm;

  public theEditedEventId: number = -1;
  public editedEvent42: AEvent = null;
  private queryParamsSubsciption: Subscription = null;


  constructor(private aEventService: AEvents11Service, private router: Router, private activatedRoute: ActivatedRoute) {
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
      this.editedEvent42 = AEvent.trueCopy(this.aEventService.aEvents[aId]);
    } else {
      this.editedEvent42 = null;
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

  onSaveClick() {
    console.log('Id = ' + this.theEditedEventId+ "has saved");
    this.aEventService.update(this.theEditedEventId, this.editedEvent42);
    this.detailForm.form.markAsPristine();

  }

  deleteClick() {
    if (this.popup()) {
      this.aEventService.remove(this.theEditedEventId);
      alert('the Next event with id ' + this.theEditedEventId + ' has been removed');
      this.editedEvent42.titel = null;
      this.editedEvent42.participationFee = null;
      this.editedEvent42.end = null;
      this.editedEvent42.status = null;
      this.editedEvent42.start = null;
      this.editedEvent42.maxParticipants = null;
      this.unselectEditedEvent();
      this.detailForm.form.markAsPristine();
    }
  }

  clearClick() {
    if (this.popup()) {
      this.editedEvent42.titel = null;
      this.editedEvent42.participationFee = null;
      this.editedEvent42.end = null;
      this.editedEvent42.status = null;
      this.editedEvent42.start = null;
      this.editedEvent42.maxParticipants = null;
    }
  }

  resetClick() {
    if (this.popup()) {
      this.editedEvent42 = this.aEventService.aEvents[this.theEditedEventId];
    }

  }

  cancelClick() {
    if (this.popup()) {
      this.editedEvent42 = null;
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
    return this.editedEvent42.equals(
      this.aEventService.aEvents[this.theEditedEventId]);
  }






}
