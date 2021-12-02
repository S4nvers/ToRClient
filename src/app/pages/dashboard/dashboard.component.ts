import { Component, OnInit } from '@angular/core';
import { getEmptyRedditAPIPost, RedditAPIPost } from '../../types/RedditAPITypes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  selected: RedditAPIPost = getEmptyRedditAPIPost()

  constructor() { }

  ngOnInit(): void {
  }

  setSelected(post: any) {

    this.selected = post;
  }

}
