import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, from } from 'rxjs';
import { RedditAPIUser } from '../../../../types/RedditAPITypes';
import { RedditAPIService } from '../api/reddit-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  private current$ = new BehaviorSubject<RedditAPIUser | null>(null);

  public current = this.current$.pipe(
    filter( (it:RedditAPIUser | null):it is RedditAPIUser =>  it != null)
  )

  constructor(private api: RedditAPIService) { }

  refresh() {
    this.api.getMe().then(res => this.current$.next(res))
  }
}
