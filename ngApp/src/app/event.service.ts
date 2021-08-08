import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _eventsURL = 'http://localhost:3000/api/events'
  private _specialEventsURL = 'http://localhost:3000/api/special'

  constructor(private http : HttpClient) { }

  getEvents(){
    return this.http.get<any>(this._eventsURL);
  }

  getSpecialEvents(){
    return this.http.get(this._specialEventsURL);
  }
}
