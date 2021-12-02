import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAllModule } from './mat-all/mat-all.module';



@NgModule({
  declarations: [
  ],
  imports: [
    MatAllModule
  ],
  exports: [
    MatAllModule
  ]
})
export class SharedModule { }
