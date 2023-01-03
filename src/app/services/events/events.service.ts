import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private fooSubject = new Subject<any>();

  constructor() {}

  publishLogin(data: any) {
    this.fooSubject.next(data);
  }

  receiveLogin(): Subject<any> {
    return this.fooSubject;
  }
}
