import { Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Course } from '../../models/Course';
import { CorsiService } from '../corsi.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-corso',
  templateUrl: './modal-corso.component.html',
  styleUrls: ['./modal-corso.component.scss']
})
export class ModalCorsoComponent implements OnDestroy {

  course?: Partial<Course>;

  detailsSub?: any;

  formCorso = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl('')
  });

  constructor(

    private corsiService: CorsiService,
    private dialogRef: MatDialogRef<ModalCorsoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number | null}

  ) {

    if (this.data.id) {
      this.getDetails(this.data.id);
    } else {
      this.composeCorso();
    }

  }

  onSubmit(): void {

    const updatedCorso: Course = {
      ...this.course,
      ...this.formCorso.value
    };

    this.corsiService.updateCorso(updatedCorso);

    this.dialogRef.close();

  }

  getDetails(id: number): void {

    this.detailsSub = this.corsiService.getDetails(id)
      .subscribe(res => {
        this.course = res;
        this.formCorso.setValue({
          title: this.course.title,
          description: this.course.description,
          image: this.course.image
        });
      });

  }

  composeCorso(): void {

    this.corsiService.getCorsi()
      .subscribe(res => {
        const newID = res.length + 1;
        this.course = {
          last_update: new Date(Date.now()).toLocaleString().split(',')[0],
          avg_votes: 0,
          id: newID
        };
      });

  }

  ngOnDestroy(): void {

    this.detailsSub && this.detailsSub.unsubscribe();

  }

}

