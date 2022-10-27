import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';
import { CreatePost, Post } from '../models/post';
import { PostEvent, PostEventType } from '../models/postEvent';
import { PostEventStore } from './post-event-store.service';
import { PostHttpService } from './post-http.service';

@Injectable({
  providedIn: 'root',
})
export class PostStore {
  private allPostsSubject = new BehaviorSubject<Post[]>([]);
  private filterTextSubject = new BehaviorSubject<string>('');

  readonly allPosts$;
  readonly filteredPosts$;

  constructor(
    private postHttpService: PostHttpService,
    private eventStore: PostEventStore
  ) {
    this.allPosts$ = this.allPostsSubject.asObservable();
    this.filteredPosts$ = combineLatest([
      this.allPosts$,
      this.filterTextSubject,
    ]).pipe(
      map(([posts, filterText]) => {
        return posts.filter((post: Post) =>
          post.name.toLowerCase().includes(filterText.toLowerCase())
        );
      })
    );

    this.getAllPosts();
  }

  getAllPosts() {
    this.postHttpService
      .getPosts()
      .pipe(map(this.unselectAllByDefault))
      .subscribe((posts: Post[]) => {
        this.allPostsSubject.next(posts);
      });
  }

  createPost(newPost: CreatePost): Observable<Post> {
    return this.postHttpService.createPost(newPost).pipe(
      tap((post: Post) => {
        this.eventStore.addEvent(
          new PostEvent(post.name, PostEventType.CREATE, new Date())
        );
        this.allPostsSubject.next([...this.allPostsSubject.value, post]);
        this.selectPost(post.id);
      })
    );
  }

  deletePost(postToDelete: Post): Observable<void> {
    const posts = this.allPostsSubject.value.filter(
      (post: Post) => postToDelete.id !== post.id
    );
    console.log('posts- ', posts);
    this.allPostsSubject.next(posts);
    return this.postHttpService.deletePost(postToDelete.id).pipe(
      tap(() => {
        this.eventStore.addEvent(
          new PostEvent(postToDelete.name, PostEventType.DELETE, new Date())
        );
      })
    );
  }

  selectPost(postId: number) {
    const posts = this.allPostsSubject.value;
    posts.forEach((post: Post) =>
      post.id === postId ? (post.selected = true) : (post.selected = false)
    );
    this.allPostsSubject.next(posts);
  }

  updateFilter(filterString: string) {
    this.filterTextSubject.next(filterString);
  }

  private unselectAllByDefault(posts: Post[]): Post[] {
    return posts.map(
      (post: Post): Post => ({
        ...post,
        selected: false,
      })
    );
  }
}
