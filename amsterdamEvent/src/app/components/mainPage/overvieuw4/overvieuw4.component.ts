import {Component, OnInit} from '@angular/core';
import {AEventsService} from '../../../services/a-events.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-overvieuw4',
  templateUrl: './overvieuw4.component.html',
  styleUrls: ['./overvieuw4.component.css']
})
export class Overvieuw4Component implements OnInit {

  public selectedIndex: number;


  constructor(private aEventsService: AEventsService, private activatedRoute: ActivatedRoute, private router: Router) {

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
    this.aEventsService.add(this.aEventsService.addRandomEvent());
    for (let i = 0; i < this.aEventsService.aEvents.length; i++) {
      this.onSelect(i);
      this.router.navigate(['edit'], {relativeTo: this.activatedRoute, queryParams: {id: this.selectedIndex}
        }
      );

    }
  }
}
