import { Component } from '@angular/core';
import { RedditAPIService } from './services/reddit/api/reddit-api.service';
import { FormatManagerService } from './services/reddit/managers/format-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ToRClient';

  constructor(private api: RedditAPIService, private fm: FormatManagerService) { }

  getAllPosts() {
    this.api.getAllPosts();
  }

  getRules() {
    this.api.getRules('therewasanattempt');
  }

  getComments() {
    this.api.getComments('r6asac');
  }

  getWikiPage() {
    this.api.getWikiPage('guidelines').then(res => console.log(res.html));
  }

  getMe() {
    this.api.getMe();
  }

  getFormats() {
    this.fm.getFormats();
  }

  logAccessToken() {
    this.api.logAccessToken();
  }
}
