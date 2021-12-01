import { Injectable } from '@angular/core';
import { RedditAPIWikiPage } from '../../../types/RedditAPITypes';
import { ToRFormat, ToRFormatCategory } from '../../../types/ToRClientTypes';
import { RedditAPIService } from '../api/reddit-api.service';

@Injectable({
  providedIn: 'root'
})
export class FormatManagerService {

  constructor(private api: RedditAPIService, private dom: DOMParser) { }

  readonly ARTS_AND_IMAGES_WITHOUT_TEXT = 'formats/images/no_text'
  readonly IMAGES_WITH_TEXT = 'formats/images/text'
  readonly FOUR_CHAN_GREENTEXT = 'formats/images/greentext'
  readonly REDDIT_POST_COMMENTS = 'formats/images/reddit'
  readonly SOCIAL_MEDIA = 'formats/images/socialmedia'
  readonly MESSAGES = 'formats/images/textmessages'
  readonly COMICS = 'formats/images/comics'
  readonly GIFS = 'formats/images/gifs'
  readonly CODE = 'formats/images/code'
  readonly MEME = 'formats/images/meme'
  readonly QUORA = 'formats/images/quora'
  readonly POLLS = 'formats/images/polls'
  readonly BLASEBALL = 'format/image/blaseball'
  readonly OTHER_SOURCES = 'formats/images/other'

  readonly VIDEO_POSTS = 'formats/video'
  readonly AUDIO_POSTS = 'formats/audio'

  getFormats(): Promise<ToRFormatCategory[]> {
    var formatsPromises: Promise<ToRFormatCategory>[] = [];

    //Arts and images without text
    formatsPromises.push(this.api.getWikiPage(this.ARTS_AND_IMAGES_WITHOUT_TEXT).then<ToRFormatCategory>(response => {
      return {
        name: "Arts and images without text",
        formats: this.getArtsAndImagesWithoutTextFormats(response.html)
      }
    }))

    //Images with text
    formatsPromises.push(this.api.getWikiPage(this.IMAGES_WITH_TEXT).then<ToRFormatCategory>(response => {
      return {
        name: "Images with text",
        formats: this.getImagesWithTextFormats(response.html)
      }
    }))

    //FourChan and Greentext
    formatsPromises.push(this.api.getWikiPage(this.FOUR_CHAN_GREENTEXT).then<ToRFormatCategory>(response => {
      return {
        name: "4Chan & pictures of Greentext",
        formats: this.getFourChanGreentextFormats(response.html)
      }
    }))

    //Reddit post and comments
    formatsPromises.push(this.api.getWikiPage(this.REDDIT_POST_COMMENTS).then<ToRFormatCategory>(response => {
      return {
        name: "Reddit post and comments",
        formats: this.getRedditPostCommentsFormats(response.html)
      }
    }))

    //Social media
    formatsPromises.push(this.api.getWikiPage(this.SOCIAL_MEDIA).then<ToRFormatCategory>(response => {
      return {
        name: "Social Media - Facebook, Instagram, Tumblr, Twitter",
        formats: this.getSocialMediaFormats(response.html)
      }
    }))

    //Messages
    formatsPromises.push(this.api.getWikiPage(this.MESSAGES).then<ToRFormatCategory>(response => {
      return {
        name: "Text messages and other messaging apps",
        formats: this.getMessagesFormats(response.html)
      }
    }))

    //Comics
    formatsPromises.push(this.api.getWikiPage(this.COMICS).then<ToRFormatCategory>(response => {
      return {
        name: "Comics",
        formats: this.getComicsFormats(response.html)
      }
    }))

    //Gifs
    formatsPromises.push(this.api.getWikiPage(this.GIFS).then<ToRFormatCategory>(response => {
      return {
        name: "Gifs",
        formats: this.getGifsFormats(response.html)
      }
    }))

    //Code
    formatsPromises.push(this.api.getWikiPage(this.CODE).then<ToRFormatCategory>(response => {
      return {
        name: "Code",
        formats: this.getCodeFormats(response.html)
      }
    }))

    //Meme
    formatsPromises.push(this.api.getWikiPage(this.MEME).then<ToRFormatCategory>(response => {
      return {
        name: "Meme",
        formats: this.getMemeFormats(response.html)
      }
    }))

    //Quora
    formatsPromises.push(this.api.getWikiPage(this.QUORA).then<ToRFormatCategory>(response => {
      return {
        name: "Quora",
        formats: this.getQuoraFormats(response.html)
      }
    }))

    //Polls
    formatsPromises.push(this.api.getWikiPage(this.POLLS).then<ToRFormatCategory>(response => {
      return {
        name: "Polls",
        formats: this.getPollsFormats(response.html)
      }
    }))

    //Blaseball
    formatsPromises.push(this.api.getWikiPage(this.BLASEBALL).then<ToRFormatCategory>(response => {
      return {
        name: "Blaseball",
        formats: this.getBlaseballFormats(response.html)
      }
    }))

    //Other sources
    formatsPromises.push(this.api.getWikiPage(this.OTHER_SOURCES).then<ToRFormatCategory>(response => {
      return {
        name: "Other sources",
        formats: this.getOtherSourcesFormats(response.html)
      }
    }))

    //Video posts
    formatsPromises.push(this.api.getWikiPage(this.VIDEO_POSTS).then<ToRFormatCategory>(response => {
      return {
        name: "",
        formats: this.getVideoPostsFormats(response.html)
      }
    }))

    //Audio posts
    formatsPromises.push(this.api.getWikiPage(this.AUDIO_POSTS).then<ToRFormatCategory>(response => {
      return {
        name: "",
        formats: this.getAudioPostsFormats(response.html)
      }
    }))
    return Promise.all(formatsPromises)
  }

  private getArtsAndImagesWithoutTextFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return []
  }

  private getImagesWithTextFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return []
  }

  private getFourChanGreentextFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return []
  }

  private getRedditPostCommentsFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return []
  }
    
  private getSocialMediaFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return []
  }
    
  private getMessagesFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return []
  }
    
  private getComicsFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return []
  }
    
  private getGifsFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return []
  }
    
  private getCodeFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return []
  }
    
  private getMemeFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return []
  }
    
  private getQuoraFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return []
  }
    
  private getPollsFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return []
  }

  private getBlaseballFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return []
  }

  private getOtherSourcesFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return []
  }

  private getVideoPostsFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return []
  }

  private getAudioPostsFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return []
  }

  private getNodeList(html: string) {
    const doc = this.dom.parseFromString(html, 'text/html')
    return doc.querySelectorAll(".wiki > pre > code")
  }

  /*

  //TODO: DO THIS BETTER THAN HARDCODING IT

  getFormats() {
    this.api.getWikiPage('guidelines').then(guidelinesResponse => {
      //Parse all
      const doc = this.dom.parseFromString(guidelinesResponse.html, 'text/html')
      const nodeList = doc.querySelectorAll(".wiki > p > a")
      var pageNames: string[] = [];
      nodeList.forEach(elem => {
        const link = elem.getAttribute("href")
        console.log(link)
        if(link?.includes("formats/images") || link?.includes("format/image")) {
          pageNames.push(link.replace('https://www.reddit.com/r/TranscribersOfReddit/wiki/', ''))
        }
      })

      //Get pages
      const pagePromise = Promise.all(pageNames.map(name => this.api.getWikiPage(name)))
      pagePromise.then(response => {
        response.map(page => this.getFormatsFromHTML(page))
      })
    })
  }

  private getFormatsFromHTML(page: RedditAPIWikiPage): ToRFormatCategory[] {
    const doc = this.dom.parseFromString(page.html, 'text/html')
    const nodeList = doc.querySelectorAll(".wiki > pre > code")
    nodeList.forEach(node => {
      if (node.innerHTML.includes("Image Transcription:")) {
        //Is template
      } else {
        //Is hint
      }
      console.log(node.innerHTML)
      console.log("***********************************")
    })
    console.log("======================================")
    return []
  }*/
}
