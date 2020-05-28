import { Component, OnInit } from '@angular/core';
import {AEventsService} from '../../../services/a-events.service';
import {AEvents2Service} from '../../../services/a-events2.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-overvieuw6',
  templateUrl: './overvieuw6.component.html',
  styleUrls: ['./overvieuw6.component.css']
})
export class Overvieuw6Component implements OnInit {


  public selectedIndex: number;


  constructor(private aEvents2Service: AEvents2Service, private activatedRoute: ActivatedRoute, private router: Router) {

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
    this.aEvents2Service.add(this.aEvents2Service.addRandomEvent());
    for (let i = 0; i < this.aEvents2Service.aEvents.length; i++) {
      this.onSelect(i);

    }
  }
}
