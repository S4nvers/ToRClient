import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { RedditAPITokenResponse } from '../../../../types/RedditAPITypes';
import { environment } from '../../../../../environments/environment';
import { ConfigService } from '../../config/config.service';
import { config } from 'process';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly TOKEN_REQUEST_URI = "https://www.reddit.com/api/v1/access_token"
  readonly TOKEN_STORAGE = "ToRClientToken"
  readonly REFRESH_TOKEN_STORAGE = "ToRClientRefreshToken"
  readonly REDIRECT_URI = this.config.getConfiguration().webhost + "callback"
  readonly CLIENT_ID = this.config.getConfiguration().client_id
  readonly SECRET = this.config.getConfiguration().client_secret

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  isLoggedIn(): boolean {
    return true;
  }

  storeToken(token: string) {
    localStorage.setItem(this.TOKEN_STORAGE, token)
  }

  storeRefreshToken(token: string) {
    localStorage.setItem(this.REFRESH_TOKEN_STORAGE, token)
  }

  getToken(): string {
    const token = localStorage.getItem(this.TOKEN_STORAGE)
    if(token == null) {
      this.login()
      return ""
    } else {
      return token
    }
  }

  login() {
    const authString = `https://www.reddit.com/api/v1/authorize?client_id=${this.CLIENT_ID}&response_type=code&state=lorem&redirect_uri=${this.REDIRECT_URI}&duration=permanent&scope=edit identity mysubreddits read report submit wikiread flair`
    document.location.href = encodeURI(authString)
  }

  logout() {
    localStorage.removeItem(this.TOKEN_STORAGE)
    localStorage.removeItem(this.REFRESH_TOKEN_STORAGE)
    console.log("logged out")
  }

  getRefreshToken(): string {
    const token = localStorage.getItem(this.REFRESH_TOKEN_STORAGE)
    if(token == null) {
      this.login();
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
      }
    })
  }

}
