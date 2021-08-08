import { HttpResponseBase } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents = [];

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {
    this.eventService.getEvents()
    .subscribe(
      res => this.specialEvents = res,
      err => {
        if(err instanceof HttpResponseBase){
          if(err.status == 401 ){
            this.router.navigate(['/login'])
          }
        }
      }
    )
  }

}
