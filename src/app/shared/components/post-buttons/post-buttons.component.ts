import { Component, Input, OnInit } from '@angular/core';
import { getEmptyRedditAPIPost, RedditAPIPost } from '../../../types/RedditAPITypes';

@Component({
  selector: 'app-post-buttons',
  templateUrl: './post-buttons.component.html',
  styleUrls: ['./post-buttons.component.scss']
})
export class PostButtonsComponent implements OnInit {

  @Input() post: RedditAPIPost = getEmptyRedditAPIPost()

  constructor() { }

  ngOnInit(): void {
  }

  openInReddit() {
    window.open(this.post.url)
  }

  claim() {
    console.log(this.post.id)
  }

  unclaim() {

  }

  isDisabled(): boolean {
    return this.post.id === ""
  }

  isClaimed(): boolean {
    return false;
  }

}
