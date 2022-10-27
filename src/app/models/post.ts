export type CreatePost = Omit<Post, 'id' | 'selected'>;

export interface Post {
  id: number;
  name: string;
  content: string;
  selected: boolean;
}
