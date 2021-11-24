import { Component, OnInit } from '@angular/core';
import { CorsiService } from '../corsi.service';
import { Corso } from '../../models/Corso';

@Component({
  selector: 'app-home-corsi',
  templateUrl: './home-corsi.component.html',
  styleUrls: ['./home-corsi.component.scss']
})
export class HomeCorsiComponent implements OnInit {

  corsi: Corso[] = [];

  constructor(
    private corsiService: CorsiService
  ) { }

  ngOnInit(): void {
    this.getCorsi();
  }

  getCorsi(): void {

    this.corsiService.getCorsi()
      .subscribe(res => {
        this.corsi = res;
      });

  }

}
