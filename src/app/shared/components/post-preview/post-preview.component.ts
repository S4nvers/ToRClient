import { Component, Input, OnInit } from '@angular/core';
import { getEmptyRedditAPIPost, RedditAPIPost } from '../../../types/RedditAPITypes';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent implements OnInit {

  @Input() post: RedditAPIPost = getEmptyRedditAPIPost()

  constructor() { }

  ngOnInit(): void {
  }

}
