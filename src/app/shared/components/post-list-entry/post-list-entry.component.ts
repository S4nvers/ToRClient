import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getEmptyRedditAPIPost, RedditAPIPost } from '../../../types/RedditAPITypes';

@Component({
  selector: 'app-post-list-entry',
  templateUrl: './post-list-entry.component.html',
  styleUrls: ['./post-list-entry.component.scss']
})
export class PostListEntryComponent implements OnInit {

  @Input() isSelected: boolean = false;

  @Input() post: RedditAPIPost = getEmptyRedditAPIPost()

  @Output() selected = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  clicked() {
    this.selected.emit()
  }

}
