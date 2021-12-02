import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as Snoowrap from 'snoowrap';
import { RedditAPIPost } from '../../../../types/RedditAPITypes';
import { RedditAPIService } from '../api/reddit-api.service';

@Injectable({
  providedIn: 'root'
})
export class PostsManagerService {

  public current = new BehaviorSubject<RedditAPIPost[]>([]);

  static listing: Snoowrap.Listing<Snoowrap.Submission> | null = null

  constructor(private api: RedditAPIService) { }

  loadNext() {
    if(PostsManagerService.listing === null) {
      this.api.getAllPosts().then(res => {
        PostsManagerService.listing = res.listing
        this.current.next(res.posts)
      })
    } else {
      this.api.getMorePosts(PostsManagerService.listing).then(res => {
        PostsManagerService.listing = res.listing
        this.current.next(res.posts)
      })
    }
  }
}
