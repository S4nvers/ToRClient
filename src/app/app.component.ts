import { Component } from '@angular/core';
import { RedditAPIService } from './services/reddit/api/reddit-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ToRClient';

  constructor(private api: RedditAPIService) { }

  getAllPosts() {
    this.api.getAllPosts();
  }

  getRules() {
    this.api.getRules('therewasanattempt');
  }

  getComments() {
    this.api.getComments('r6asac');
  }

  getWikiPages() {
    this.api.getWikiPages();
  }

  getWikiPage() {
    this.api.getWikiPage('guidelines').then(res => console.log(res.html));
  }

  getMe() {
    this.api.getMe();
  }

  logAccessToken() {
    this.api.logAccessToken();
  }
}
