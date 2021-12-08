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

  isDarkTheme = true;

  pfpUrl = "assets/images/pfp.svg"

  gamma = "- Γ"

  constructor(
    private userManager: UserManagerService,
    private auth: AuthService,
    private api: RedditAPIService
  ) { }

  ngOnInit() {
    this.userManager.current.subscribe(user => this.pfpUrl = user.iconUrl)

    if(this.auth.isLoggedIn()) {
      this.userManager.refresh()
      this.getFlair()
    }
  }

  login() {
    if(this.auth.isLoggedIn()) {
      this.auth.logout()
    } else {
      this.auth.login()
    }
  }

  getFlair() {
    this.api.getUserGamma().then(res => {
      if(res.text) {
        this.gamma = res.text
      }
    })
  }
}
