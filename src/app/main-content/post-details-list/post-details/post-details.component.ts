import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Post } from '../../../models/post';
import { PostStore } from '../../../services/post.store';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  @Input() post!: Post;

  @HostBinding('class.selected') get selected() {
    return this.post.selected;
  }

  constructor(private postStore: PostStore) {}

  ngOnInit(): void {}

  onDeletePost() {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postStore.deletePost(this.post).subscribe();
    }
  }
}
