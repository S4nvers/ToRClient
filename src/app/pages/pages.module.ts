import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallbackPageComponent } from './misc/callback-page/callback-page.component';



@NgModule({
  declarations: [
    CallbackPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CallbackPageComponent
  ]
})
export class PagesModule { }
