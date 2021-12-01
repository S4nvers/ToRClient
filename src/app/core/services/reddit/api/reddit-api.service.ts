import { Injectable } from '@angular/core';
import * as sw from 'snoowrap';
import { RedditAPIComment, RedditAPIFlair, RedditAPIPost, RedditAPISubRule, RedditAPIUser, RedditAPIWikiPage } from '../../../../types/RedditAPITypes';

@Injectable({
  providedIn: 'root'
})
export class RedditAPIService {

  snoowrap: sw;

  readonly SUBNAME: string = 'TranscribersOfReddit';

  constructor() {
    this.snoowrap = new sw({
        userAgent: 'ToRClient by S4nvers',
        clientId: 'QXujvwQwWVDuJAyt6TJOGQ',
        clientSecret: 'MLk28yhvxFIRhKfc_1Gjdsn2-85_SQ', //IMPORTANT: NEVER COMMIT THIS
        refreshToken: '43854070-kyJ6LVPOjPFyTokNbFSuisqE-Xo8ag' //TODO need to obtain dynamically instead of hardcoded
      });
  }

  /* #region GET */

  getAllPosts(): Promise<RedditAPIPost[]> {
    return this.snoowrap.getSubreddit(this.SUBNAME).getHot().then(response => {
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
    return this.snoowrap.getSubmission(submissionId).expandReplies({limit: Infinity, depth: Infinity}).then(response => {
      return response.comments.map<RedditAPIComment>(comment => {
        return {
          id: comment.id,
          author: comment.author_fullname
        }
      })
    })
  }

  getRules(sub: string): Promise<RedditAPISubRule[]> {
    return this.snoowrap.getSubreddit(sub).getRules().then(response => {
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
    return this.snoowrap.getSubreddit(this.SUBNAME).getWikiPage(pageName).fetch().then(response => {
      return {
        name: pageName,
        html: response.content_html,
      }
    })
  }

  getUserGamma(): Promise<RedditAPIFlair> {
    return this.snoowrap.getSubreddit(this.SUBNAME).getMyFlair().then(response => {
      return {
        id: response.flair_template_id,
        text: response.flair_text
      }
    })
  }

  getMe(): Promise<RedditAPIUser> {
    return this.snoowrap.getMe().fetch().then(response => {
      return this.snoowrap.oauthRequest({uri: `/user/${response.name}/about`, method: 'get'}).then(response => {
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
    this.snoowrap.getSubmission(submissionId).expandReplies({limit: Infinity, depth: Infinity}).then(response => {
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
    this.snoowrap.getSubmission(submissionId).expandReplies({limit: Infinity, depth: Infinity}).then(response => {
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
    this.snoowrap.getSubmission(submissionId).expandReplies({limit: Infinity, depth: Infinity}).then(response => {
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
    this.snoowrap.getSubmission(submissionId).reply(transcription);
  }

  reportPost(submissionId: string, rule: RedditAPISubRule) {
    this.snoowrap.getSubmission(submissionId).report({reason: rule.violationReason})
  }

  /* #endregion */

  logAccessToken() {
    console.log(this.snoowrap.accessToken)
  }
}
