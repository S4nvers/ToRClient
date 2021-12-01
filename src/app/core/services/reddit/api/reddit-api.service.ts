import { Injectable } from '@angular/core';
import * as Snoowrap from 'snoowrap';
import { RedditAPIComment, RedditAPIFlair, RedditAPIPost, RedditAPISubRule, RedditAPIUser, RedditAPIWikiPage } from '../../../../types/RedditAPITypes';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RedditAPIService {

  static snoowrap: Snoowrap;

  readonly SUBNAME: string = 'TranscribersOfReddit';

  constructor(private auth: AuthService) {}

  private getSnoowrap(): Snoowrap {
    if(!RedditAPIService.snoowrap) {
      RedditAPIService.snoowrap = new Snoowrap({
        userAgent: 'ToRClient by S4nvers',
        clientId: 'g5nizpPrI801MZo8Xia6DA',
        clientSecret: 'Not today', //IMPORTANT: NEVER COMMIT THIS
        refreshToken: this.auth.getToken()//'43854070-y2jk67l-SvrXFlRg8JYtrNWK48O8kg' //TODO need to obtain dynamically instead of hardcoded
      });
    }
    return RedditAPIService.snoowrap
  }

  /* #region GET */

  getAllPosts(): Promise<RedditAPIPost[]> {
    return this.getSnoowrap().getSubreddit(this.SUBNAME).getHot().then(response => {
      return response.map<RedditAPIPost>(post => {
        var flair: RedditAPIFlair | null = null;
        if(post.link_flair_template_id) {
          flair = {
            id: post.link_flair_template_id,
            text: post.link_flair_text
          }
        }
        return {
          id: post.id,
          title: post.title,
          thumbnail: post.thumbnail,
          flair: flair
        }
      })
    })
  }

  getComments(submissionId: string): Promise<RedditAPIComment[]> {
    return this.getSnoowrap().getSubmission(submissionId).expandReplies({limit: Infinity, depth: Infinity}).then(response => {
      return response.comments.map<RedditAPIComment>(comment => {
        return {
          id: comment.id,
          author: comment.author_fullname
        }
      })
    })
  }

  getRules(sub: string): Promise<RedditAPISubRule[]> {
    return this.getSnoowrap().getSubreddit(sub).getRules().then(response => {
      return response.rules.map<RedditAPISubRule>(rule => {
        return {
          short: rule.short_name,
          description: rule.description,
          priority: rule.priority,
          violationReason: rule.violation_reason
        }
      })
    })
  }

  getWikiPage(pageName: string): Promise<RedditAPIWikiPage> {
    return this.getSnoowrap().getSubreddit(this.SUBNAME).getWikiPage(pageName).fetch().then(response => {
      return {
        name: pageName,
        html: response.content_html,
      }
    })
  }

  getUserGamma(): Promise<RedditAPIFlair> {
    return this.getSnoowrap().getSubreddit(this.SUBNAME).getMyFlair().then(response => {
      return {
        id: response.flair_template_id,
        text: response.flair_text
      }
    })
  }

  getMe(): Promise<RedditAPIUser> {
    return this.getSnoowrap().getMe().fetch().then(response => {
      return this.getSnoowrap().oauthRequest({uri: `/user/${response.name}/about`, method: 'get'}).then(response => {
        return {
          id: response.id,
          name: response.name,
          iconUrl: response.icon_img,
          karma: response.total_karma
        }
      })
    })
  }

  /* #endregion */

  /* #region POST */

  postClaim(submissionId: string) {
    this.getSnoowrap().getSubmission(submissionId).expandReplies({limit: Infinity, depth: Infinity}).then(response => {
      const comments = response.comments;
      const cmt = comments.find(comment => comment.body.includes("If you would like to transcribe this post"));
      if (cmt !== undefined) {
        cmt.reply("claim");
      } else {
        throw new Error("Not a valid post")
      }
    })
  }

  postUnclaim(submissionId: string) {
    this.getSnoowrap().getSubmission(submissionId).expandReplies({limit: Infinity, depth: Infinity}).then(response => {
      const comments = response.comments;
      const cmt = comments.find(comment => comment.body.includes("The post is yours! Best of luck and thanks for helping!"));
      if (cmt !== undefined) {
        cmt.reply("unclaim");
      } else {
        throw new Error("Not a valid post")
      }
    })
  }

  postDone(submissionId: string) {
    this.getSnoowrap().getSubmission(submissionId).expandReplies({limit: Infinity, depth: Infinity}).then(response => {
      const comments = response.comments;
      const cmt = comments.find(comment => comment.body.includes("The post is yours! Best of luck and thanks for helping!"));
      if (cmt !== undefined) {
        cmt.reply("done");
      } else {
        throw new Error("Not a valid post")
      }
    })
  }

  postTranscription(submissionId: string, transcription: string) {
    this.getSnoowrap().getSubmission(submissionId).reply(transcription);
  }

  reportPost(submissionId: string, rule: RedditAPISubRule) {
    this.getSnoowrap().getSubmission(submissionId).report({reason: rule.violationReason})
  }

  /* #endregion */

  logAccessToken() {
    console.log(this.getSnoowrap().accessToken)
  }
}
