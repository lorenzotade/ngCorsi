import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Corso } from '../../models/Corso';
import { Lesson } from '../../models/Lesson';
import { CorsiService } from '../corsi.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalCorsoComponent } from '../modal-corso/modal-corso.component';

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

  constructor(
    private corsiService: CorsiService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.urlId = Number(params.get('id'));
      this.getDetails(this.urlId);
      this.getCourseLessons(this.urlId);
    });

  }

  getDetails(id: number): void {

    this.detailsSub = this.corsiService.getDetails(id)
      .subscribe(res => {
        this.corso = res;
      });

  }

  getCourseLessons(id: number): void {

    this.corsiService.getCourseLessons(id)
      .subscribe(res => {
        this.lessons = res;
      });

  }

  openDialog(): void {

    this.dialog.open(ModalCorsoComponent, { data: {id: this.corso.id} } );

  }

  ngOnDestroy(): void {

    this.detailsSub && this.detailsSub.unsubscribe();

  }

}
