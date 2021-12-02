import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAllModule } from './mat-all/mat-all.module';
import { PostListEntryComponent } from './components/post-list-entry/post-list-entry.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    PostListEntryComponent,
    PostListComponent,
    PostPreviewComponent
  ],
  imports: [
    CommonModule,
    MatAllModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    CoreModule
  ],
  exports: [
    CommonModule,
    MatAllModule,
    PostListEntryComponent,
    PostListComponent,
    PostPreviewComponent
  ]
})
export class SharedModule { }
