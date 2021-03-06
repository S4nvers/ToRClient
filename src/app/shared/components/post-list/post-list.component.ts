import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RedditAPIService } from '../../../core/services/reddit/api/reddit-api.service';
import { PostsManagerService } from '../../../core/services/reddit/managers/posts-manager.service';
import { getEmptyRedditAPIPost as getEmptyRedditAPIPost, RedditAPIPost } from '../../../types/RedditAPITypes';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts: RedditAPIPost[] = [];

  selected: RedditAPIPost = getEmptyRedditAPIPost()

  @Output() postSelected = new EventEmitter<RedditAPIPost>()

  constructor(private postManager: PostsManagerService) { }

  ngOnInit(): void {
    this.postManager.current.subscribe(res => this.posts = res)
    this.postManager.loadNext();
  }

  setSelected(post: RedditAPIPost) {
    this.selected = post
    this.postSelected.emit(post)
  }

  isSelected(postId: string): boolean {
    return this.selected.id == postId;
  }

  loadMore() {
    this.postManager.loadNext()
  }

}
