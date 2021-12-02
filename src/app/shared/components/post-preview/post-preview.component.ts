import { Component, Input, OnInit } from '@angular/core';
import { RedditAPIService } from '../../../core/services/reddit/api/reddit-api.service';
import { getEmptyRedditAPIPost, RedditAPIPost } from '../../../types/RedditAPITypes';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent implements OnInit {

  @Input()
  set post(value: RedditAPIPost) {
    this.api.getPostWithUrl(value.url).then(res => {
      this.postToDisplay = res;
    })
  }

  postToDisplay: RedditAPIPost = getEmptyRedditAPIPost()

  constructor(private api: RedditAPIService) { }

  ngOnInit(): void {
  }

}
