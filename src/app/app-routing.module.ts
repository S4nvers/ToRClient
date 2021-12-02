import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackPageComponent } from './pages/misc/callback-page/callback-page.component';

const routes: Routes = [
  {path: 'callback', component: CallbackPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
