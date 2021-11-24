import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './core/landing/landing.component';

const routes: Routes = [
  { path: 'corsi', loadChildren: () => import('./features/corsi/corsi.module').then(m => m.CorsiModule)},
  { path: '', component: LandingComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
