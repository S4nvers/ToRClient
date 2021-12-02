import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SafeImageURLPipe } from './services/pipes/safe-image-url.pipe';



@NgModule({
  declarations: [
    SafeImageURLPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    SafeImageURLPipe
  ],
  providers: [
  ]
})
export class CoreModule { }
