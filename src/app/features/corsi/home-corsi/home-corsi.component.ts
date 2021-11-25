import { Component, OnInit } from '@angular/core';
import { CorsiService } from '../corsi.service';
import { Corso } from '../../models/Corso';
import { Observable } from 'rxjs';
import { Banner } from '../../models/Banner';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home-corsi',
  templateUrl: './home-corsi.component.html',
  styleUrls: ['./home-corsi.component.scss']
})
export class HomeCorsiComponent implements OnInit {

  corsi?: Observable<Corso[]> | Observable<Banner[]>;

  searchForm: FormControl = new FormControl('');

  constructor(
    private corsiService: CorsiService
  ) { }

  ngOnInit(): void {

    this.getCorsi();

  }

  getCorsi(): void {

    this.corsi = this.corsiService.getCorsi();

  }

  onSubmit(): void {

    this.corsi = this.corsiService.searchCorsi(this.searchForm.value);

  }

}
