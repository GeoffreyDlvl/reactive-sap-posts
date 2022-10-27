import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { CreatePost, Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostHttpService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('/api/posts').pipe(shareReplay());
  }

  createPost(post: CreatePost): Observable<Post> {
    return this.http.post<Post>('/api/posts', post).pipe(shareReplay());
  }

  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`/api/posts/${postId}`).pipe(shareReplay());
  }
}
