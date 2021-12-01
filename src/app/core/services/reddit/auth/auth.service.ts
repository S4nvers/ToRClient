import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly TOKEN_STORAGE = "ToRClientSecret"

  constructor(private router: Router) { }

  storeToken(token: string) {
    localStorage.setItem(this.TOKEN_STORAGE, token)
  }

  getToken(): string {
    const token = localStorage.getItem(this.TOKEN_STORAGE)
    if(token == null) {
      const authString = "https://www.reddit.com/api/v1/authorize?client_id=g5nizpPrI801MZo8Xia6DA&response_type=code&state=lorem&redirect_uri=http://localhost:4200/callback&duration=permanent&scope=edit identity mysubreddits read report submit wikiread"
      document.location.href = encodeURI(authString)
      return ""
    } else {
      return token
    }
  }
}
