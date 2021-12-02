import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallbackPageComponent } from './misc/callback-page/callback-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    CallbackPageComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CallbackPageComponent,
    DashboardComponent
  ]
})
export class PagesModule { }
