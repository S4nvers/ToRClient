import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs';
import { RedditAPITokenResponse } from '../../../../types/RedditAPITypes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly TOKEN_REQUEST_URI = "https://www.reddit.com/api/v1/access_token"
  readonly TOKEN_STORAGE = "ToRClientToken"
  readonly REFRESH_TOKEN_STORAGE = "ToRClientRefreshToken"
  readonly REDIRECT_URI = "http://localhost:4200/callback"
  readonly CLIENT_ID = "g5nizpPrI801MZo8Xia6DA"
  readonly SECRET = "Still not today"

  constructor(private http: HttpClient) { }

  storeToken(token: string) {
    localStorage.setItem(this.TOKEN_STORAGE, token)
  }

  storeRefreshToken(token: string) {
    localStorage.setItem(this.REFRESH_TOKEN_STORAGE, token)
  }

  getToken(): string {
    const token = localStorage.getItem(this.TOKEN_STORAGE)
    if(token == null) {
      const authString = `https://www.reddit.com/api/v1/authorize?client_id=${this.CLIENT_ID}&response_type=code&state=lorem&redirect_uri=${this.REDIRECT_URI}&duration=permanent&scope=edit identity mysubreddits read report submit wikiread`
      document.location.href = encodeURI(authString)
      return ""
    } else {
      return token
    }
  }

  getRefreshToken(): string {
    const token = localStorage.getItem(this.REFRESH_TOKEN_STORAGE)
    if(token == null) {
      console.log("is null")
      const authString = `https://www.reddit.com/api/v1/authorize?client_id=${this.CLIENT_ID}&response_type=code&state=lorem&redirect_uri=${this.REDIRECT_URI}&duration=permanent&scope=edit identity mysubreddits read report submit wikiread`
      document.location.href = encodeURI(authString)
      return ""
    } else {
      return token
    }
  }

  requestToken(code: string) {
    const data = `grant_type=authorization_code&code=${code}&redirect_uri=${this.REDIRECT_URI}`
    this.http.post(this.TOKEN_REQUEST_URI, data, {observe: 'response', responseType: 'json'}).subscribe(res => {
      if(res.body) {
        const body = (res.body as RedditAPITokenResponse)
        this.storeToken(body.access_token)
        this.storeRefreshToken(body.refresh_token)
        console.log("stored")
      }
    })
  }

}
