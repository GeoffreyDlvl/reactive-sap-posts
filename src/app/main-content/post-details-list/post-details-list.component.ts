import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/post';
import { PostStore } from '../../services/post.store';

@Component({
  selector: 'app-post-details-list',
  templateUrl: './post-details-list.component.html',
  styleUrls: ['./post-details-list.component.scss'],
})
export class PostDetailsListComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(private postStore: PostStore) {
    this.posts$ = this.postStore.filteredPosts$;
  }

  ngOnInit(): void {}
}
