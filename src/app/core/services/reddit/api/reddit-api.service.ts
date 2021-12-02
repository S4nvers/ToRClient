import { Injectable } from '@angular/core';
import * as Snoowrap from 'snoowrap';
import { getEmptyRedditAPIPost, RedditAPIComment, RedditAPIFlair, RedditAPIPost, RedditAPIPostResponse, RedditAPISubRule, RedditAPIUser, RedditAPIWikiPage } from '../../../../types/RedditAPITypes';
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
        clientId: this.auth.CLIENT_ID,
        clientSecret: this.auth.SECRET,
        refreshToken: this.auth.getRefreshToken()
      });
    }
    return RedditAPIService.snoowrap
  }

  /* #region GET */

  /**
   * Get all posts from ToR-subreddit
   * @returns A promise containing all posts from ToR
   */
  getAllPosts(): Promise<RedditAPIPostResponse> {
    return this.getSnoowrap().getSubreddit(this.SUBNAME).getHot().then(response => {
      const posts: RedditAPIPost[] = response.map<RedditAPIPost>(post => {
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
          flair: flair,
          url: post.url
        }
      })
      return {
        listing: response,
        posts: posts
      }
    })
  }

  async getMorePosts(listing: Snoowrap.Listing<Snoowrap.Submission>): Promise<RedditAPIPostResponse> {
    const newListing = await listing.fetchMore({amount: 30, append:true})
    const postArr = newListing.map<RedditAPIPost>(post => {
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
          flair: flair,
          url: post.url
        }
    })
    return {
      listing: newListing,
      posts: postArr
    }
  }

  getPostWithUrl(url: string): Promise<RedditAPIPost> {
    let regex: RegExp = /\/comments\/([^\/]+)\//
    const arr = url.match(regex)
    if(arr !== null) {
      return this.getPost(arr[1])
    }
    return Promise.resolve(getEmptyRedditAPIPost())
  }

  getPost(id: string): Promise<RedditAPIPost> {
    return this.getSnoowrap().getSubmission(id).fetch().then(post => {
      var flair: RedditAPIFlair | null = null;
        if(post.link_flair_template_id) {
          flair = {
            id: post.link_flair_template_id,
            text: post.link_flair_text
          }
        }
      return {
        flair: flair,
        id: post.id,
        thumbnail: post.thumbnail,
        title: post.title,
        url: post.url
      }
    })
  }

  /**
   * Gets all comments of a specified submission
   * @param submissionId The submission id
   * @returns A promise containing all Comments of the requested submission
   */
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

  getRulesWithUrl(url: string): Promise<RedditAPISubRule[]> {
    const regex: RegExp = /\/r\/([^\/]+)\//
    const arr = url.match(regex)
    if(arr !== null) {
      return this.getRules(arr[1])
    }
    return Promise.resolve([])
  }

  /**
   * Gets the rules of a specified subreddit
   * @param subredditName The name of the subreddit
   * @returns A promise containing the list of all of the requested subreddits rules
   */
  getRules(subredditName: string): Promise<RedditAPISubRule[]> {
    return this.getSnoowrap().getSubreddit(subredditName).getRules().then(response => {
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

  /**
   * Gets a requested wikipage
   * @param pageName The name of the wikipage (eg. formats/images/reddit)
   * @returns A promise containing the requested wikipage
   */
  getWikiPage(pageName: string): Promise<RedditAPIWikiPage> {
    return this.getSnoowrap().getSubreddit(this.SUBNAME).getWikiPage(pageName).fetch().then(response => {
      return {
        name: pageName,
        html: response.content_html,
      }
    })
  }

  /**
   * Gets the flair for the ToR-subreddit
   * @returns A promise containing a reddit user-flair
   */
  getUserGamma(): Promise<RedditAPIFlair> {
    return this.getSnoowrap().getSubreddit(this.SUBNAME).getMyFlair().then(response => {
      return {
        id: response.flair_template_id,
        text: response.flair_text
      }
    })
  }

  /**
   * Gets the currently logged in user
   * @returns A promise containing the current user
   */
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

  getOwnComments() {
    this.getSnoowrap().getMe().getComments().then(response => {
      console.log(response)
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
}
