import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallbackPageComponent } from './misc/callback-page/callback-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CallbackPageComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CallbackPageComponent,
    DashboardComponent
  ]
})
export class PagesModule { }
