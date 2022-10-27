import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/post';
import { PostStore } from '../../services/post.store';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent implements OnDestroy {
  posts$: Observable<Post[]>;

  constructor(private postStore: PostStore) {
    this.posts$ = this.postStore.filteredPosts$;
  }

  onClickPost(post: Post) {
    this.postStore.selectPost(post.id);
  }

  ngOnDestroy(): void {}

  onFilter(filterText: string) {
    this.postStore.updateFilter(filterText);
  }
}
