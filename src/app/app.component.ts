import { Component, OnInit } from '@angular/core';
import { RedditAPIService } from './core/services/reddit/api/reddit-api.service';
import { FormatManagerService } from './core/services/reddit/managers/format-manager.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from './core/services/reddit/auth/auth.service';
import { from, map, Observable, of } from 'rxjs';
import { UserManagerService } from './core/services/reddit/managers/user-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ToRClient';

  isMenuOpen = false;

  pfpUrl = "assets/images/pfp.svg"

  constructor(
    private userManager: UserManagerService,
    private fm: FormatManagerService,
    private auth: AuthService,
    private sanitizer: DomSanitizer
  ) { }

  getUserImgUrl(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.pfpUrl);
  }

  ngOnInit() {
    this.userManager.current.subscribe(user => this.pfpUrl = user.iconUrl)

    if(this.auth.isLoggedIn()) {
      console.log("logged in")
      this.userManager.refresh()
    }
  }

  login() {
    this.auth.login()
  }

  /*getAllPosts() {
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
  }*/
}
