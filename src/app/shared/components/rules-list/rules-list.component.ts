import { Component, Input, OnInit } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';
import { RedditAPIService } from '../../../core/services/reddit/api/reddit-api.service';
import { RedditAPIPost, RedditAPISubRule } from '../../../types/RedditAPITypes';

@Component({
  selector: 'app-rules-list',
  templateUrl: './rules-list.component.html',
  styleUrls: ['./rules-list.component.scss']
})
export class RulesListComponent implements OnInit {

  @Input()
  set post(value: RedditAPIPost) {
    this.api.getRulesWithUrl(value.url).then(res => {
      this.rules = res
      this.rules.sort((a, b) => a.priority - b.priority)
    })
  }

  rules: RedditAPISubRule[] = []

  constructor(
    private api: RedditAPIService,
    private markdownService: MarkdownService
  ) { }

  ngOnInit(): void {
    this.markdownService.renderer.heading = (text: string, level: number) => {
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
      return '<h' + level + '>' +
               '<a name="' + escapedText + '" class="anchor" href="#' + escapedText + '">' +
                 '<span class="header-link"></span>' +
               '</a>' + text +
             '</h' + level + '>';
    };
  }

}
