import { Injectable } from '@angular/core';
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
        formats: this.getArtsAndImagesWithoutTextFormats(response.html),
        uri: this.ARTS_AND_IMAGES_WITHOUT_TEXT
      }
    }))

    //Images with text
    formatsPromises.push(this.api.getWikiPage(this.IMAGES_WITH_TEXT).then<ToRFormatCategory>(response => {
      return {
        name: "Images with text",
        formats: this.getImagesWithTextFormats(response.html),
        uri: this.IMAGES_WITH_TEXT
      }
    }))

    //FourChan and Greentext
    formatsPromises.push(this.api.getWikiPage(this.FOUR_CHAN_GREENTEXT).then<ToRFormatCategory>(response => {
      return {
        name: "4Chan & pictures of Greentext",
        formats: this.getFourChanGreentextFormats(response.html),
        uri: this.FOUR_CHAN_GREENTEXT
      }
    }))

    //Reddit post and comments
    formatsPromises.push(this.api.getWikiPage(this.REDDIT_POST_COMMENTS).then<ToRFormatCategory>(response => {
      return {
        name: "Reddit post and comments",
        formats: this.getRedditPostCommentsFormats(response.html),
        uri: this.REDDIT_POST_COMMENTS
      }
    }))

    //Social media
    formatsPromises.push(this.api.getWikiPage(this.SOCIAL_MEDIA).then<ToRFormatCategory>(response => {
      return {
        name: "Social Media - Facebook, Instagram, Tumblr, Twitter",
        formats: this.getSocialMediaFormats(response.html),
        uri: this.SOCIAL_MEDIA
      }
    }))

    //Messages
    formatsPromises.push(this.api.getWikiPage(this.MESSAGES).then<ToRFormatCategory>(response => {
      return {
        name: "Text messages and other messaging apps",
        formats: this.getMessagesFormats(response.html),
        uri: this.MESSAGES
      }
    }))

    //Comics
    formatsPromises.push(this.api.getWikiPage(this.COMICS).then<ToRFormatCategory>(response => {
      return {
        name: "Comics",
        formats: this.getComicsFormats(response.html),
        uri: this.COMICS
      }
    }))

    //Gifs
    formatsPromises.push(this.api.getWikiPage(this.GIFS).then<ToRFormatCategory>(response => {
      return {
        name: "Gifs",
        formats: this.getGifsFormats(response.html),
        uri: this.GIFS
      }
    }))

    //Code
    formatsPromises.push(this.api.getWikiPage(this.CODE).then<ToRFormatCategory>(response => {
      return {
        name: "Code",
        formats: this.getCodeFormats(response.html),
        uri: this.CODE
      }
    }))

    //Meme
    formatsPromises.push(this.api.getWikiPage(this.MEME).then<ToRFormatCategory>(response => {
      return {
        name: "Meme",
        formats: this.getMemeFormats(response.html),
        uri: this.MEME
      }
    }))

    //Quora
    formatsPromises.push(this.api.getWikiPage(this.QUORA).then<ToRFormatCategory>(response => {
      return {
        name: "Quora",
        formats: this.getQuoraFormats(response.html),
        uri: this.QUORA
      }
    }))

    //Polls
    formatsPromises.push(this.api.getWikiPage(this.POLLS).then<ToRFormatCategory>(response => {
      return {
        name: "Polls",
        formats: this.getPollsFormats(response.html),
        uri: this.POLLS
      }
    }))

    //Blaseball
    formatsPromises.push(this.api.getWikiPage(this.BLASEBALL).then<ToRFormatCategory>(response => {
      return {
        name: "Blaseball",
        formats: this.getBlaseballFormats(response.html),
        uri: this.BLASEBALL
      }
    }))

    //Other sources
    formatsPromises.push(this.api.getWikiPage(this.OTHER_SOURCES).then<ToRFormatCategory>(response => {
      return {
        name: "Other sources",
        formats: this.getOtherSourcesFormats(response.html),
        uri: this.OTHER_SOURCES
      }
    }))

    //Video posts
    formatsPromises.push(this.api.getWikiPage(this.VIDEO_POSTS).then<ToRFormatCategory>(response => {
      return {
        name: "",
        formats: this.getVideoPostsFormats(response.html),
        uri: this.VIDEO_POSTS
      }
    }))

    //Audio posts
    formatsPromises.push(this.api.getWikiPage(this.AUDIO_POSTS).then<ToRFormatCategory>(response => {
      return {
        name: "",
        formats: this.getAudioPostsFormats(response.html),
        uri: this.AUDIO_POSTS
      }
    }))
    return Promise.all(formatsPromises)
  }

  private getArtsAndImagesWithoutTextFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return [
      {
        name: "Arts and images without text",
        text: nodeList.item(0).innerHTML
      }
    ]
  }

  private getImagesWithTextFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return [
      {
        name: "Images with text",
        text: nodeList.item(0).innerHTML
      }
    ]
  }

  private getFourChanGreentextFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return [
      {
        name: "FourChan and Greentext",
        text: nodeList.item(0).innerHTML
      }
    ]
  }

  private getRedditPostCommentsFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return [
      {
        name: "Reddit Post",
        text: nodeList.item(0).innerHTML
      },
      {
        name: "Reddit Comments",
        text: nodeList.item(1).innerHTML
      },
      {
        name: "Reddit Comments with reports",
        text: nodeList.item(2).innerHTML
      }
    ]
  }
    
  private getSocialMediaFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return [
      {
        name: "Facebook - Format",
        text: nodeList.item(1).innerHTML
      },
      {
        name: "Facebook - Comments and Replies",
        text: nodeList.item(2).innerHTML
      },
      {
        name: "Facebook Marketplace 1",
        text: nodeList.item(3).innerHTML
      },
      {
        name: "Facebook Marketplace 2",
        text: nodeList.item(4).innerHTML
      },
      {
        name: "Facebook Marketplace 3",
        text: nodeList.item(5).innerHTML
      },
      {
        name: "Tumblr",
        text: nodeList.item(6).innerHTML
      },
      {
        name: "Tumblr reblogging an image",
        text: nodeList.item(7).innerHTML
      },
      {
        name: "Tumblr with comments/asks",
        text: nodeList.item(8).innerHTML
      },
      {
        name: "Instagram",
        text: nodeList.item(9).innerHTML
      },
      {
        name: "Twitter post",
        text: nodeList.item(10).innerHTML
      },
      {
        name: "Twitter replies",
        text: nodeList.item(11).innerHTML
      }
    ]
  }
    
  private getMessagesFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return [
      {
        name: "Message",
        text: nodeList.item(0).innerHTML
      },
      {
        name: "Discord",
        text: nodeList.item(1).innerHTML
      },
    ]
  }
    
  private getComicsFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    nodeList.forEach((node, index) => {
      console.log(index)
      console.log(node.innerHTML)
    })
    return [
      {
        name: "Comic",
        text: nodeList.item(0).innerHTML
      },
    ]
  }
    
  private getGifsFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return [
      {
        name: "Gifs",
        text: nodeList.item(0).innerHTML
      },
    ]
  }
    
  private getCodeFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return [
      {
        name: "Code",
        text: nodeList.item(0).innerHTML
      },
    ]
  }
    
  private getMemeFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return [
      {
        name: "Generic meme",
        text: nodeList.item(0).innerHTML
      },
      {
        name: "Advice animals meme",
        text: nodeList.item(1).innerHTML
      },
    ]
  }
    
  private getQuoraFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return [
      {
        name: "Quora",
        text: nodeList.item(0).innerHTML
      },
    ]
  }
    
  private getPollsFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return [
      {
        name: "Poll - Single selection",
        text: nodeList.item(0).innerHTML
      },
      {
        name: "Poll - Multi-selection",
        text: nodeList.item(1).innerHTML
      },
      {
        name: "Poll - Number of votes",
        text: nodeList.item(2).innerHTML
      },
      {
        name: "Poll - Shaded boxes",
        text: nodeList.item(3).innerHTML
      },
      {
        name: "Poll - Percentages",
        text: nodeList.item(4).innerHTML
      },
    ]
  }

  private getBlaseballFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return [
      {
        name: "Blaseball",
        text: nodeList.item(0).innerHTML
      },
    ]
  }

  private getOtherSourcesFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return [
      {
        name: "Other sources",
        text: nodeList.item(0).innerHTML
      },
    ]
  }

  private getVideoPostsFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return [
      {
        name: "Video posts",
        text: nodeList.item(0).innerHTML
      },
    ]
  }

  private getAudioPostsFormats(html: string): ToRFormat[] {
    const nodeList = this.getNodeList(html)
    return [
      {
        name: "Audio posts",
        text: nodeList.item(0).innerHTML
      },
    ]
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
