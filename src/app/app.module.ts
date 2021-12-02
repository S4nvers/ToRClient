import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { PagesModule } from './pages/pages.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenGuard } from './core/services/reddit/guards/token.guard';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    PagesModule,
    MarkdownModule.forRoot()
  ],
  providers: [
    DOMParser,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: TokenGuard,
      multi   : true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
