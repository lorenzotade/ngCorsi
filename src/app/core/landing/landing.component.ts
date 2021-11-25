import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { CorsiService } from 'src/app/features/corsi/corsi.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  numCorsi?: Observable<number>;
  avgLessons?: Observable<number>;

  constructor(
    private corsiService: CorsiService
  ) { }

  ngOnInit(): void {

    this.numCorsi = this.corsiService.getNumCorsi();

    this.avgLessons = this.corsiService.getAvgLessons();

  }

}
