import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { CreatePost } from '../../models/post';
import { PostStore } from '../../services/post.store';
import { minTrimmedLengthValidator } from '../../validators/min-trimmed-length.validator';

@Component({
  selector: 'app-new-post-form',
  templateUrl: './new-post-form.component.html',
  styleUrls: ['./new-post-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPostFormComponent {
  form = this.fb.group({
    name: ['', [Validators.required, minTrimmedLengthValidator(6)]],
    content: [''],
  });

  constructor(
    private postStore: PostStore,
    private fb: NonNullableFormBuilder
  ) {}

  get nameControl(): FormControl {
    return this.form.controls['name'];
  }

  onSubmit() {
    console.log('submit');
    const newPost: CreatePost = {
      name: this.form.controls['name'].value.trim(),
      content: this.form.controls['content'].value.trim(),
    };
    this.postStore.createPost(newPost).subscribe();
    this.onReset();
  }

  onReset() {
    this.form.reset();
  }
}
