import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { CorsiRoutingModule } from './corsi-routing.module';
import { HomeCorsiComponent } from './home-corsi/home-corsi.component';
import { MatCardModule } from '@angular/material/card';
import { DetailCorsoComponent } from './detail-corso/detail-corso.component';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { ModalCorsoComponent } from './modal-corso/modal-corso.component';



@NgModule({
  declarations: [
    HomeCorsiComponent,
    DetailCorsoComponent,
    ModalCorsoComponent
  ],
  imports: [
    CommonModule,
    CorsiRoutingModule,
    MatCardModule,
    MatListModule,
    PipesModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  entryComponents: [
    ModalCorsoComponent
   ]
})
export class CorsiModule { }
