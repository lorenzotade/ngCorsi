import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailCorsoComponent } from './detail-corso/detail-corso.component';
import { HomeCorsiComponent } from './home-corsi/home-corsi.component';

const routes: Routes = [

  { path: '', component: HomeCorsiComponent, pathMatch: 'full' },
  { path: ':id', component: DetailCorsoComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorsiRoutingModule { }
