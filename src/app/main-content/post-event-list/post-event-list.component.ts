import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PostEvent } from '../../models/postEvent';
import { PostEventStore } from '../../services/post-event-store.service';

@Component({
  selector: 'app-post-event-list',
  templateUrl: './post-event-list.component.html',
  styleUrls: ['./post-event-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostEventListComponent {
  readonly postEvents$: Observable<PostEvent[]>;

  constructor(private eventStore: PostEventStore) {
    this.postEvents$ = this.eventStore.postEvents$;
  }
}
