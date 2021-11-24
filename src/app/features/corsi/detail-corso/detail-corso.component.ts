import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Corso } from '../../models/Corso';
import { Lesson } from '../../models/Lesson';
import { CorsiService } from '../corsi.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalCorsoComponent } from '../modal-corso/modal-corso.component';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-detail-corso',
  templateUrl: './detail-corso.component.html',
  styleUrls: ['./detail-corso.component.scss']
})
export class DetailCorsoComponent implements OnInit, OnDestroy {

  corso!: Corso;
  lessons: Lesson[] = [];
  urlId = 0;
  detailsSub?: any;
  lessonsSub?: any;

  constructor(
    private corsiService: CorsiService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.urlId = Number(params.get('id'));
      this.getDetails(this.urlId);
    });

  }

  getDetails(id: number): void {

    this.detailsSub = this.corsiService.getDetails(id)
      .pipe(
        tap(
          corso => {
            this.corso = corso;
          }
        ),
        switchMap(corso => {
          return this.corsiService.getCourseLessons(corso.id);
        })
      )
      .subscribe(res => {
        this.lessons = res;
      });

  }

  openDialog(): void {

    this.dialog.open(ModalCorsoComponent, { data: {id: this.corso.id} } );

  }

  ngOnDestroy(): void {

    // tslint:disable-next-line: no-unused-expression
    this.detailsSub && this.detailsSub.unsubscribe();

  }

}
