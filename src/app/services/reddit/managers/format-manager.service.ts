import { Injectable } from '@angular/core';
import { RedditAPIService } from '../api/reddit-api.service';

@Injectable({
  providedIn: 'root'
})
export class FormatManagerService {

  constructor(private api: RedditAPIService) { }

  getFormats() {
    this.api.getWikiPages()
  }
}
