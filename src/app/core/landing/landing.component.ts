import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { CorsiService } from 'src/app/features/corsi/corsi.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  numCorsi?: number;
  avgLessons?: number;

  constructor(
    private corsiService: CorsiService
  ) { }

  ngOnInit(): void {

    this.corsiService.getNumCorsi()
      .subscribe(num => {
        this.numCorsi = num;
      });

    this.corsiService.getAvgLessons()
      .subscribe(avg => {
        this.avgLessons = avg;
      });

  }

}
