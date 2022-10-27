import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PostEvent } from '../models/postEvent';

@Injectable({
  providedIn: 'root',
})
export class PostEventStore {
  private postEventsSubject = new BehaviorSubject<PostEvent[]>([]);

  readonly postEvents$ = this.postEventsSubject.asObservable();

  addEvent(event: PostEvent) {
    const events = [...this.postEventsSubject.value, event];
    this.postEventsSubject.next(events);
  }
}
