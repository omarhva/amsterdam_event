import { Component, OnInit } from '@angular/core';
import {AEvents2Service} from '../../../services/a-events2.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AEvents11Service} from '../../../services2/a-events11.service';
import {AEvent} from '../../../models/aevent';

@Component({
  selector: 'app-overview11',
  templateUrl: './overview11.component.html',
  styleUrls: ['./overview11.component.css']
})
export class Overview11Component implements OnInit {

  public selectedIndex: number;
 // aEvents: AEvent[];

  constructor(private aEvents11Service: AEvents11Service, private activatedRoute: ActivatedRoute, private router: Router) {


  }

  ngOnInit() {
  }

  onSelect(editedEventId) {
    this.selectedIndex = editedEventId;
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute, queryParams: {id: this.selectedIndex}
      }
    );
  }

  handelClick() {
    let aevent = this.aEvents11Service.creatRandomEvent();
    this.aEvents11Service.add(aevent);

    this.aEvents11Service.addRandomEvent(this.aEvents11Service.creatRandomEvent());
     this.onSelect(this.aEvents11Service.aEvents.length-1);



}
}
