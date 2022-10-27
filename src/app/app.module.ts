import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainContentComponent } from './main-content/main-content.component';
import { NewPostFormComponent } from './main-content/new-post-form/new-post-form.component';
import { PostDetailsListComponent } from './main-content/post-details-list/post-details-list.component';
import { PostDetailsComponent } from './main-content/post-details-list/post-details/post-details.component';
import { PostEventListComponent } from './main-content/post-event-list/post-event-list.component';
import { PostListComponent } from './main-content/post-list/post-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PostListComponent,
    PostEventListComponent,
    NewPostFormComponent,
    MainContentComponent,
    PostDetailsListComponent,
    PostDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
